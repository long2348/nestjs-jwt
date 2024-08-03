import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';

import { MailController } from 'src/controllers/mail.controller';
import { EmailProcessor } from 'src/processor/email.processor';
import { MailService } from 'src/service/mail.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'emailSending',
    }),
  ],
  controllers: [MailController],
  providers: [MailService, EmailProcessor],
})
export class MailModule {}
