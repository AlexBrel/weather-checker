import {Injectable} from '@angular/core';
import {LoggerService} from './logger.service';

@Injectable()
export class DevLoggerService extends LoggerService {
    log(message: string): void {
        console.log(`dev logger: ${message}`);
    }

    error(err: Error): void {
        console.error(`dev logger error: ${err}`);
    }
}