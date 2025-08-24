import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction.model';

export abstract class TransactionRepository {
    abstract getByID(id: String): Observable<Transaction>;
    abstract getAll(): Observable<Array<Transaction>>;
    abstract saveNew (transaction :Transaction) : Observable<void>;
}