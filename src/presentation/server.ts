import { CheckService } from '../domain/use-cases/checks/check-service';
import { SendEmailLogs } from '../domain/use-cases/checks/email/send-email-logs';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.reposiroty.impl';
import { CronService } from './cron/cron-service';
import { EmailService } from './email/email-servive';

const fileSystemLogRepositoty = new LogRepositoryImpl(
  new FileSystemDatasource()
);

const emailService = new EmailService();

export class Server {
  public static start() {
    console.log('Server started...');
    
    /* new SendEmailLogs(emailService, fileSystemLogRepositoty).execute('gabrielbordenabe@gmail.com') */

    // CronService.createJob('*/5 * * * * *', () => {
    //   const url = 'https://google.com';
    //   new CheckService(
    //     fileSystemLogRepositoty,
    //     () => console.log(`${url} is ok`),
    //     (error) => console.log(error)
    //   ).execute(url);
    //   // new CheckService().execute( 'http://localhost:3000' );
    // });
  }
}
