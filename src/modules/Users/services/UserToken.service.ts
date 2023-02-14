import { MailService } from "@modules/Notifications/services/mail.service";
import SERVICE_IDENTIFIERS from "@shared/constants/identifiers";
import AppError from "@shared/utils/AppError";
import { inject, injectable } from "inversify";
import UsersRepository from "../repositories/users.repositories";
import UserTokenRepository from "../repositories/userToken.repositories";
import BcyptUtil from "../../../shared/services/Bcrypt";
import UsersService from "./Users.service";

@injectable()
export default class UserTokenService {
  @inject(SERVICE_IDENTIFIERS.USERS_RESPOSITORY) private readonly userRepository: UsersRepository;
  @inject(SERVICE_IDENTIFIERS.USERS_SERVICE) private readonly usersService: UsersService;
  @inject(SERVICE_IDENTIFIERS.USERS_TOKEN_RESPOSITORY) private readonly userTokenRepository: UserTokenRepository;
  @inject(SERVICE_IDENTIFIERS.MAIL_SERVICE) private readonly mailService: MailService;
  @inject(SERVICE_IDENTIFIERS.BCRYPT_SERVICE) private readonly bcryptService: BcyptUtil;

  public async forgetPassword(url: string, email: string): Promise<string> {
    const user = await this.userRepository.getUserByEmail(email);
    const check_for_active_token = await this.userTokenRepository.checkIfUserHasActiveToken(user.id);

    if (check_for_active_token) {
      throw new AppError("User already has an active password reset token.", 400);
    }
    const user_token = await this.userTokenRepository.createPasswordResetToken(user.id);
    url = `${url}?token=${user_token}`;

    //place this on an event to increate api speed
    await this.mailService.sendPasswordResetMail({ to: email, url });
    return "password reset link successsfully sent.";
  }

  public async resetPassword(token: string, email: string, password: string): Promise<string> {
    const user = await this.userRepository.getUserByEmail(email);
    const { id } = user;
    const password_token = await this.userTokenRepository.getUserToken(id);
    if (!password_token || token !== password_token.password_reset_token) {
      throw new AppError("User token invalid", 400);
    }

    const hashedPassword = await this.bcryptService.hashPassword(password);
    await this.usersService.updateUserDetails({ user_id: id, password: hashedPassword });
 
    await this.userTokenRepository.resetUserTokenExpiredAt(id);
    return "password updated successsfully";
  }
}
