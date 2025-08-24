import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { FundRepository } from '../domain/repositories/fund.repository';
import { FundApiService } from '../infraestructure/adapter/fund.service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(withFetch()),
    {provide: FundRepository, useClass: FundApiService}]
};
