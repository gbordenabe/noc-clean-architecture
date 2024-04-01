import { EmailService } from '../../../presentation/email/email-servive';
import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';

interface SendLogEmailUseCase {
  execute: (to: string | string[]) => Promise<boolean>
}

export class SendEmailLogs implements SendLogEmailUseCase{
  constructor(
    private readonly emailService: EmailService,
    private readonly LogRepository: LogRepository
  ) {}

  async execute(to: string | string[]): Promise<boolean> {
  try {
      const sent = await this.emailService.sendEmailWithFileSystemLogs(to);
      if (!sent) {
        throw new Error('Error sending email')
      }
      const log = new LogEntity({
        message: 'Email sent to ' + to,
        level: LogSeverityLevel.low,
        createdAt: new Date(),
        origin: 'send-email-logs.ts'
      });
      this.LogRepository.saveLog(log);
      return true
  } catch (error) {
    const log = new LogEntity({
      message: 'Error sending email to ' + to,
      level: LogSeverityLevel.high,
      createdAt: new Date(),
      origin: 'send-email-logs.ts'
    });
    this.LogRepository.saveLog(log);
    return false
  }
  }
}