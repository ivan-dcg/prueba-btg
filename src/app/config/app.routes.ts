import { Routes } from '@angular/router';
import { TransactionHistoryComponent } from '../presentation/pages/transaction-history/transaction-history.component';
import { FundsComponent } from '../presentation/pages/funds/funds.component';

export const routes: Routes = [
    {
        path: '', 
        children: [
            {path: 'fondos', component: FundsComponent},
            {path: 'historial', component: TransactionHistoryComponent},
            {path: '', redirectTo: 'fondos', pathMatch: 'full'},
            
        ]
    },
    {
        path: '', 
        redirectTo: 'fondos', 
        pathMatch: 'prefix'
    }
];
