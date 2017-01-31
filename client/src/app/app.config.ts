import { OpaqueToken } from "@angular/core";

import { IAppConfig } from './iapp.config';

export let APP_CONFIG = new OpaqueToken("app.config");

export const AppConfig: IAppConfig = {    
    apiEndpoint: "http://localhost:3000/api"
};