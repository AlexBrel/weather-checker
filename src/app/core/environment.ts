import {LoggerService} from './logger.service';
import {DevLoggerService} from './dev-logger.service';
import {ProdLoggerService} from './prod-logger.service';
import {Provider} from '@angular/core';


function getProviders(): Provider[] {
    return [
        process.env.ENV === 'production'
            ? {provide: LoggerService, useClass: ProdLoggerService}
            : {provide: LoggerService, useClass: DevLoggerService}];
}

export const ENV_PROVIDERS = getProviders();