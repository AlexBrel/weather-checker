import {Injectable} from '@angular/core';
import {LoggerService as Logger} from './logger.service';

@Injectable()
export class LoggerService extends Logger {
    log(message: string): void {
        console.log(`dev logger: ${message}`);
    }

    error(err: Error): void {
        console.error(`dev logger error: ${err}`);
    }
}