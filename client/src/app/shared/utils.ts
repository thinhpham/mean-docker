import { Headers, RequestOptions } from '@angular/http';

export class Utils {
    public static createRequestOptions(token: string): RequestOptions {
        if (token)
            return new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json', 'X-Access-Token': token }) });
        else
            return new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) });
    }

    public static handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}