import {LoggerService as Logger} from './logger/logger.service';
import {LoggerService} from 'logger';

export const ENV_PROVIDERS = [{provide: Logger, useClass: LoggerService}];