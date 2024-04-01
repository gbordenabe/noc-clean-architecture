import { CheckService } from '../domain/use-cases/checks/check-service';
import { CheckServiceMultiple } from '../domain/use-cases/checks/check-service-multiple';
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { MongoLogDatasource } from '../infrastructure/datasources/mongo-log.datasource';
import { PostgresLogDatasource } from '../infrastructure/datasources/postgres-log.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.reposiroty.impl';
import { CronService } from './cron/cron-service';
import { EmailService } from './email/email-servive';

// const logRepository = new LogRepositoryImpl(
//   /* new FileSystemDatasource(),
//   new MongoLogDatasource(), */
//   new PostgresLogDatasource()
// );

const fsLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
);

const mongoLogRepository = new LogRepositoryImpl(
  new MongoLogDatasource()
);

const postgresLogRepository = new LogRepositoryImpl(
  new PostgresLogDatasource()
);

const emailService = new EmailService();

export class Server {
  public static start() {
    console.log('Server started...');
    
    /* new SendEmailLogs(emailService, fileSystemLogRepositoty).execute('gabrielbordenabe@gmail.com') */

    // CronService.createJob('*/5 * * * * *', () => {
    //   const url = 'https://google.com';
    //   new CheckService(
    //     logRepository,
    //     () => console.log(`${url} is ok`),
    //     (error) => console.log(error)
    //   ).execute(url);
    //   // new CheckService().execute( 'http://localhost:3000' );
    // });

    CronService.createJob('*/5 * * * * *', () => {
      const url = 'https://google.com';
      new CheckServiceMultiple(
        [fsLogRepository, mongoLogRepository, postgresLogRepository],
        () => console.log(`${url} is ok`),
        (error) => console.log(error)
      ).execute(url);
      // new CheckService().execute( 'http://localhost:3000' );
    });
  }
}
