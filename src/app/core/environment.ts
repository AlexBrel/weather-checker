import {LoggerService} from './logger.service';
import {DevLoggerService} from './dev-logger.service';
import {ProdLoggerService} from './prod-logger.service';

let PROVIDERS = [
        process.env.ENV === 'production'
            ? {provide: LoggerService, useClass: ProdLoggerService}
            : {provide: LoggerService, useClass: DevLoggerService}];

export const ENV_PROVIDERS = PROVIDERS;