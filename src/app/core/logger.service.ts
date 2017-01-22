import {Injectable} from '@angular/core';

@Injectable()
export class LoggerService {
    log(message: string): void {
        console.log(message);
    }

    error(err: Error): void {
        console.error(err);
    }
}