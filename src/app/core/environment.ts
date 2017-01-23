import {LoggerService} from './logger/logger.service';
import {DevLoggerService} from './logger/dev-logger.service';
import {ProdLoggerService} from './logger/prod-logger.service';

let PROVIDERS =
    process.env.ENV === 'development'
        ? [{provide: LoggerService, useClass: DevLoggerService}]
        : [{provide: LoggerService, useClass: ProdLoggerService}];

export const ENV_PROVIDERS = PROVIDERS;