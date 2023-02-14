import environment from "../../../config/environment";
import { injectable } from "inversify";
import nodemailer from "nodemailer";
import { IAdminMail, IMail, ISendMail } from "../interfaces/ISendmail";

const MAIL_SETTINGS = {
  service: "gmail",
  auth: {
    user: environment.email_user,
    pass: environment.email_password,
  },
};

const transporter = nodemailer.createTransport(MAIL_SETTINGS);

@injectable()
export class MailService {
  public async sendMail(params: ISendMail) {
    try {
      let info = await transporter.sendMail({
        from: MAIL_SETTINGS.auth.user,
        to: params.to,
        subject: "Hello!",
        html: `
            <div
              class="container"
              style="max-width: 90%; margin: auto; padding-top: 20px"
            >
              <h2>Welcome to the Crea8tive Revolution community.</h2>
              <h4>Find below your OTP to complete your onboarding.</h4>
              <h4>Your OTP would expire in 5 mins.</h4>
              <p style="margin-bottom: 30px;">Pleas enter the sign up OTP to get started</p>
              <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${params.otp}</h1>
         </div>
          `,
      });
      return info;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  public async sendPasswordResetMail(params: IMail) {
    try {
      let info = await transporter.sendMail({
        from: MAIL_SETTINGS.auth.user,
        to: params.to,
        subject: "Hello!",
        html: `<p>Hi <strong>Friend</strong></p>
        <p>You are getting this email because you have requested for password reset on the crea8tive revolution web. <br />
        To reset your password, click the link below. The link will expire in 5 minutes</p>
        <p><a href='${params.url}'>${params.url}</a> </p>
        <p>Your Friends</p>
        `,
      });

      return info;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  public async sendCreateAdminMail(params: IAdminMail) {
    try {
      let info = await transporter.sendMail({
        from: MAIL_SETTINGS.auth.user,
        to: params.to,
        subject: "Hello!",
        html: `<p>Hi <strong>Friend</strong></p>
        <p>You are getting this email because you have been assigned the role of an admin on the crea8tive revolution web. <br />
        Your password is: ${params.password}</p>
        To login your password, click the link below.</p>
        <p><a href='${params.url}'>${params.url}</a> </p>
        <p>Your Friends</p>
        `,
      });

      return info;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  public async sendAccountCreationMail(params: IAdminMail, role: string) {
    try {
      let info = await transporter.sendMail({
        from: MAIL_SETTINGS.auth.user,
        to: params.to,
        subject: "Hello!",
        html: `<p>Hi <strong>Friend</strong></p>
        <p>You are getting this email because you have been assigned the role of an ${role} on the crea8tive revolution web. <br />
        Your password is: ${params.password}</p>
        To login your password, click the link below.</p>
        <p><a href='${params.url}'>${params.url}</a> </p>
        <p>Your Friends</p>
        `,
      });

      return info;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
