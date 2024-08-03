import { Body, Controller, Get, Post } from '@nestjs/common';
import { Mail } from 'src/interface/mail.interface';
import { MailService } from 'src/service/mail.service';

@Controller()
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('/email')
  async sendEmail(@Body() data: Mail) {
    const content = await this.mailService.sendWelcomeEmail(data);
    return content;
  }

  @Get('/abc')
  sendABC() {
    return 'abc';
  }
}
