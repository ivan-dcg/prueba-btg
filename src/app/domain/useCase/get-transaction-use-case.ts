import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction.model';
import { TransactionRepository} from '../repositories/transaction.repository';

@Injectable({
  providedIn: 'root'
})

export class GetTransactionUseCases {
  constructor( private repository: TransactionRepository) {}
  
  getTransactionById (id: String) : Observable <Transaction> {
    return this.repository.getByID(id);
  }

  getAllTransaction () : Observable <Array<Transaction>> {
    return this.repository.getAll();
  }

  saveTransaction (transaction: Transaction): Observable<void> {
    return this.repository.save(transaction)
  }
}