import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { ConfigService } from "@nestjs/config";
import * as brevo from "@getbrevo/brevo";
import { SendSmtpEmail, TransactionalEmailsApi } from "@getbrevo/brevo";
import { BaseService } from "@/common/base/base-service.base";
import { AccountEntity } from "@/entities/entity/implement/auth/account.entity";
@Injectable()
export class GmailService extends BaseService {
  private readonly apiInstance: TransactionalEmailsApi;
  constructor(private readonly configService: ConfigService) {
    super();
    this.apiInstance = new brevo.TransactionalEmailsApi();

    this.apiInstance.setApiKey(
      0,
      this.configService.get<string>("SENDINBLUE_API_KEY")!,
    );
  }

  async sendUserConfirmation(account: AccountEntity, otp: string) {
    const sendSmtpEmail: brevo.SendSmtpEmail = new brevo.SendSmtpEmail();

    sendSmtpEmail.subject = "OTP Xác thực";
    sendSmtpEmail.templateId = 2;
    sendSmtpEmail.to = [
      {
        email: account.email,
      },
    ];
    sendSmtpEmail.replyTo = {
      email: "support@yourdomain.com",
      name: "Support",
    };
    sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
    sendSmtpEmail.params = {
      otp,
      url: `${this.configService.get<string>("DOMAIN")}/verify?code=${otp}`,
    };

    try {
      const data = await this.apiInstance.sendTransacEmail(sendSmtpEmail);
    } catch (error) {
      this.BadGatewayException("Failed to send email");
    }
  }
}
