import { Observable } from 'rxjs';
import { Fund } from '../models/fund.model';

export abstract class FundRepository {
    abstract getByID(id: String): Observable<Fund>;
    abstract getAll(): Observable<Array<Fund>>;
}