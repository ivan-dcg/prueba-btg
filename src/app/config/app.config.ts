import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { FundRepository } from '../domain/repositories/fund.repository';
import { SubscriptionRepository } from '../domain/repositories/subscription.repository';
import { TransactionRepository } from '../domain/repositories/transaction.repository';
import { FundApiService } from '../infraestructure/adapter/fund.service';
import { SubscriptionApiService } from '../infraestructure/adapter/subscriptioon.service';
import { TransactionApiService } from '../infraestructure/adapter/transaction.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), provideHttpClient(withFetch()),
    {provide: FundRepository, useClass: FundApiService},
    {provide: SubscriptionRepository, useClass: SubscriptionApiService},
    {provide: TransactionRepository, useClass: TransactionApiService},
  ]
};
