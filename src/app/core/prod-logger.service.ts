import {Injectable} from '@angular/core';
import {LoggerService} from './logger.service';

@Injectable()
export class ProdLoggerService extends LoggerService {
    log(message: string): void {
        console.log(`prod logger: ${message}`);
    }

    error(err: Error): void {
        console.error(`prod logger error: ${err}`);
    }
}