import bcrypt from 'bcrypt';
import { injectable } from 'inversify';

@injectable()
export default class BcryptUtil {
  async generateSalt() {
    return await bcrypt.genSalt();
  }

  async hashPassword(password: string) {
    const salt = await this.generateSalt();
    return await bcrypt.hash(password, salt);
  }

  async validatePassword(password: string, hashedPassword: string) {
    const result = await bcrypt.compare(password, hashedPassword);
    return result;
  }
}
