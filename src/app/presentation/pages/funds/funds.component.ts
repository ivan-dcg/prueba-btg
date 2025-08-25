import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FundApiService } from '../../../infraestructure/adapter/fund.service';
import { Fund } from '../../../domain/models/fund.model';
import { SubscriptionApiService } from '../../../infraestructure/adapter/subscriptioon.service';
import { Subscription } from '../../../domain/models/subscription.model';
import { DataService } from '../../../infraestructure/helper/service';
import { TransactionApiService } from '../../../infraestructure/adapter/transaction.service';
import { Transaction } from '../../../domain/models/transaction.model';
import { TransactionType } from '../../../domain/enums/transactionType.enum';

@Component({
  selector: 'app-funds',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './funds.component.html',
  styleUrl: './funds.component.css'
})

export class FundsComponent implements OnInit {

  constructor(
    private _serviceFund: FundApiService, 
    private _serviceSub: SubscriptionApiService,
    private _serviceTrans: TransactionApiService,
    private _dataService: DataService
  ) { 
    this._serviceSub.getAll()
    .subscribe(
      (data: Subscription[]) => {
        localStorage.setItem('subscriptions', JSON.stringify(data))
      }
    );
  }

  responseFund$: Observable<Fund[]> | undefined;
  funds?: Fund[];
  responseSub$: Observable<Subscription> | undefined;
  subscription?: Subscription;
  category: string[] = ['', 'FPV', 'FIC'];

  ngOnInit(): void {
    this.getFunds();
  }

  getFunds() {
    this.responseFund$ = this._serviceFund.getAll();
    this.responseFund$.subscribe(
      (data: Fund[]) => {
        this.funds = data;
        localStorage.setItem('funds', JSON.stringify(this.funds))
      }
    );
  }
  
  subscribeFund(fund:Fund, action:string) {
    if(this._dataService.currentValue < fund.minAmount) {
      alert('fondos insuficientes')
      return
    }
    const dateNow = new Date().toString();
    const request:Subscription = { "userId": "1", "fundId":String(fund.id), "amount": fund.minAmount, "createdAt": dateNow, "notificationId": "1", "status": "active" };
    this.responseSub$ = this._serviceSub.save(request);
    this.responseSub$.subscribe(
      (data:Subscription) => {
        const newValue = (action === 'Suscribirse') ? this._dataService.currentValue - fund.minAmount : this._dataService.currentValue + fund.minAmount;
        this._dataService.sendValue(newValue);
        this.saveTransaction(String(data.id), fund.id, action);
      })
  }

  saveTransaction(id:string, fundId:number, action:string) {
    const type = (action === 'Suscribirse') ? TransactionType.SUBSCRIPTION : TransactionType.CANCEL;
    const dateNow = new Date().toString();
    const transaction:Transaction = { "subscriptionId": id, "userId": "1", "fundId": fundId,  "createdAt": dateNow, "type": type }
    this._serviceTrans.save(transaction)
    .subscribe(resp => console.log(resp))
  }


  getAction(fundId:number) {
    const subscriptions = localStorage.getItem('subscriptions');
    const list = (subscriptions) ? JSON.parse(subscriptions) : [];
    return (list.find((tr:Transaction) => tr.fundId == fundId)) ? 'Cancelar' : 'Suscribirse';
  }

}
