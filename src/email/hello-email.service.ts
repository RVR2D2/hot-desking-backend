import { Injectable } from '@nestjs/common';
import { config } from 'src/common';
import { HelloEmailDTO, PasswordResetEmailDto } from './dto';
import { EmailTemplateService } from './email-template.service';
import { EmailService } from './email.service';

@Injectable()
export class HelloEmailService {
  constructor(
    private readonly emailService: EmailService,
    private readonly templates: EmailTemplateService,
  ) {}

  public async send(data: PasswordResetEmailDto): Promise<void> {
    const { subject } = config.email.hello;

    const input = new HelloEmailDTO(data);
    const html = await this.templates.render(input);

    await this.emailService.send({
      to: data.email,
      subject,
      html,
    });
  }
}
