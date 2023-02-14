import { generatePasswordToken } from "@shared/services/OTP";
import { injectable } from "inversify";
import { UserToken } from "../models/ObjectionModels/user_token";

@injectable()
export default class UserTokenRepository {
  public async createPasswordResetToken(user_id: string) {
    const password_reset_token = await generatePasswordToken();
    const expires_at = (Date.now() + 300000).toString(); //5min
    const get_token = await this.getUserToken(user_id);

    if (!get_token) {
      await UserToken.query().insert({ user_id, password_reset_token, expires_at });
    } else {
      const user = await UserToken.query().findOne({ user_id }).patch({ password_reset_token, expires_at });
    }

    return password_reset_token;
  }

  public async checkIfUserHasActiveToken(user_id: string): Promise<boolean> {
    const user_token = await UserToken.query().findOne({ user_id });

    if (user_token && Date.now() < Number(user_token.expires_at)) {
      return true;
    } else {
      return false;
    }
  }

  public async getUserToken(user_id: string) {
    const user_token = await UserToken.query().findOne({ user_id });
    return user_token;
  }

  public async resetUserTokenExpiredAt(user_id: string) {
    const user_token = await UserToken.query().findOne({ user_id }).patch({ expires_at: Date.now().toString() });
    return user_token;
  }
}
