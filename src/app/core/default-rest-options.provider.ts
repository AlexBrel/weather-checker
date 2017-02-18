import {Injectable} from '@angular/core';
import {BaseRequestOptions, RequestOptions, RequestMethod, URLSearchParams} from '@angular/http';
import {commonConstants} from './common-constants';

@Injectable()
export class DefaultRequestOptions extends BaseRequestOptions {

    constructor() {
        super();

        this.method = RequestMethod.Get;

        this.headers.set('Accept', 'application/json');
        this.headers.set('Accept-Language', 'en-US,en;q=0.8');

        // this.search = new URLSearchParams();
        // this.search.set('lang', commonConstants.owm.lang);
        // this.search.set('units', commonConstants.owm.units);
        // this.search.set('APPID', commonConstants.owm.apiID);
    }
}

export const defaultRequestOptionsProvider = {provide: RequestOptions, useClass: DefaultRequestOptions};