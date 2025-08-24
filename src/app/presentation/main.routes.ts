import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { TransactionHistoryComponent } from './pages/transaction-history/transaction-history.component';
import { FundsComponent } from './pages/funds/funds.component';

const routes: Routes = [
  {
    path: '',
    component: FundsComponent,
    
    // children: [
    //   {
    //     path: 'fondos',
    //     component: FundsComponent
    //   },
    //   {
    //     path: 'historial',
    //     component: TransactionHistoryComponent,
    //     title: 'Historial de Transacciones'
    //   }
    // ]
  },
//   {
//     path: 'historial',
//     component: TransactionHistoryComponent,
//     title: 'Historial de Transacciones'
//   }
];

export default routes;