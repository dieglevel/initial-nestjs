import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as brevo from "@getbrevo/brevo";
import { SendSmtpEmail, TransactionalEmailsApi } from "@getbrevo/brevo";
import { BaseService } from "@/common/base";
import { AccountEntity } from "@/entities/entity/implement/auth";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
@Injectable()
export class GmailService extends BaseService {
  private readonly apiInstance: TransactionalEmailsApi;
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(AccountEntity)
    private accountRepository: Repository<AccountEntity>,
  ) {
    super();
    this.apiInstance = new brevo.TransactionalEmailsApi();

    this.apiInstance.setApiKey(
      0,
      this.configService.get<string>("SENDINBLUE_API_KEY")!,
    );
  }

  async sendUserConfirmation(account: string, otp: string) {
    const sendSmtpEmail: brevo.SendSmtpEmail = new brevo.SendSmtpEmail();

    const foundAccount = await this.accountRepository.findOne({
      where: { id: account },
    });

    if (!foundAccount) {
      this.NotFoundException("Account not found");
    }

    sendSmtpEmail.subject = "OTP Xác thực";
    sendSmtpEmail.templateId = 2;
    sendSmtpEmail.to = [
      {
        email: foundAccount.email,
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
