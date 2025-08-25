import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';
import { Transaction } from '../../domain/models/transaction.model';
import { environment as env} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export  class TransactionApiService extends TransactionRepository {

  private _url = env.API_URL;

  constructor(private http: HttpClient) {super();}

  getByID(id: String): Observable<Transaction> {
    return this.http.get<Transaction>(this._url+id);
  }

  getAll(): Observable<Transaction[]> {
    return this.http.get<Array<Transaction>>(this._url+'transactions');
  }

  save(transaction: Transaction): Observable<void> {
    return this.http.post<void>(this._url+'transactions', transaction);
  }

}