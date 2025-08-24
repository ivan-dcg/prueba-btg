import { Routes } from '@angular/router';
import { TransactionHistoryComponent } from '../presentation/pages/transaction-history/transaction-history.component';

export const routes: Routes = [
    {
        path: 'dashboard', 
        loadChildren: () => import('../presentation/main.routes').then(m => m.default)
    },
    {
        path: 'historial', 
        component: TransactionHistoryComponent
    },
    {
        path: '', 
        redirectTo: 'dashboard', 
        pathMatch: 'full'
    }
];
