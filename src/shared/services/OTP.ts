import { OTP_CONFIG, OTP_LENGTH, PASSWORD_OTP_CONFIG } from '../../shared/constants/constants';
import otpGenerator from 'otp-generator';

export const generateOTP = () => {
  const OTP = otpGenerator.generate(OTP_LENGTH, OTP_CONFIG);
  return OTP;
};

export const generatePasswordToken = () => {
  const password_token = otpGenerator.generate(15, PASSWORD_OTP_CONFIG);
  return password_token;
};
