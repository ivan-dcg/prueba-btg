import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionApiService } from '../../../infraestructure/adapter/transaction.service';
import { Observable } from 'rxjs';
import { Transaction } from '../../../domain/models/transaction.model';
import { Fund } from '../../../domain/models/fund.model';

@Component({
  selector: 'app-transaction-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction-history.component.html',
  styleUrl: './transaction-history.component.css'
})

export class TransactionHistoryComponent implements OnInit {

  responseTrans$: Observable<Transaction[]> | undefined;
  transaction?: Transaction[];
  funds?: Fund[];

  constructor(
    private _serviceTrans: TransactionApiService
  ) { }

  ngOnInit(): void {
    const fondosGuardados = localStorage.getItem('funds');
    this.funds = (fondosGuardados) ? JSON.parse(fondosGuardados) : [];

    this.responseTrans$ = this._serviceTrans.getAll();
    
    this.responseTrans$.subscribe(
      (resp: Transaction[]) => {
        
        this.transaction = resp.filter((tr:Transaction) => tr.userId == '1');
        console.log(this.transaction)
      }
    );
  }

  getName(id:any) {
    return this.funds?.find((f:Fund) => f.id == Number(id))?.name || id;
  }

}
