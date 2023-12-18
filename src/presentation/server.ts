import { CheckService } from '../domain/use-cases/checks/check-service';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.reposiroty.impl';
import { CronService } from './cron/cron-service';

const fileSystemLogRepositoty = new LogRepositoryImpl(
  new FileSystemDatasource()
);

export class Server {
  public static start() {
    console.log('Server started...');

    CronService.createJob('*/5 * * * * *', () => {
      const url = 'https://google.com';
      new CheckService(
        fileSystemLogRepositoty,
        () => console.log(`${url} is ok`),
        (error) => console.log(error)
      ).execute(url);
      // new CheckService().execute( 'http://localhost:3000' );
    });
  }
}
