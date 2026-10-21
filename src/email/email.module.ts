import { Module } from '@nestjs/common';
import { EmailTemplateService } from './email-template.service';
import { EmailService } from './email.service';
import { HelloEmailService } from './hello-email.service';

@Module({
  providers: [EmailService, HelloEmailService, EmailTemplateService],
  exports: [HelloEmailService],
})
export class EmailModule {}
