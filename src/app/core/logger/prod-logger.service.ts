import {Injectable} from '@angular/core';
import {LoggerService as Logger} from './logger.service';

@Injectable()
export class LoggerService extends Logger {
    log(message: string): void {
        console.log(`prod logger: ${message}`);
    }

    error(err: Error): void {
        console.error(`prod logger error: ${err}`);
    }
}