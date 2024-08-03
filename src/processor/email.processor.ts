import { Process, Processor } from '@nestjs/bull';
import { MailerService } from '@nestjs-modules/mailer';
import { Job } from 'bull';

import { Mail } from 'src/interface/mail.interface';

@Processor('emailSending')
export class EmailProcessor {
  constructor(private readonly mailService: MailerService) {}
  @Process('welcome')
  async sendWelcomeEmail(job: Job<Mail>) {
    const { data } = job;

    console.log(data);
    // send the welcome email here
    await this.mailService.sendMail({
      ...data,
      subject: 'Welcome',
      template: 'welcome',
      context: {
        user: data.user,
      },
    });
  }

  @Process('reset-password')
  async sendResetPasswordEmail(job: Job<Mail>) {
    const { data } = job;
    // send the reset password email here
    await this.mailService.sendMail({
      ...data,
      subject: 'Reset password',
      template: 'reset-password',
      context: {
        user: data.user,
      },
    });
  }
}
