import { Module } from '@nestjs/common';
import { config } from 'src/common';
import { EmailTemplateService } from './email-template.service';
import { EmailService } from './email.service';
import { FakeEmailService } from './fake-email.service';
import { HelloEmailService } from './hello-email.service';
import { RealEmailService } from './real-email.service';

@Module({
  providers: [
    {
      provide: EmailService,
      useClass: config.email.disabled ? FakeEmailService : RealEmailService,
    },
    HelloEmailService,
    EmailTemplateService,
  ],
  exports: [HelloEmailService],
})
export class EmailModule {}
