import { Observable } from 'rxjs';
import { Subscription } from '../models/subscription.model';

export abstract class SubscriptionRepository {
    abstract getByID(id: String): Observable<Subscription>;
    abstract getAll(): Observable<Array<Subscription>>;
    abstract save (subscription :Subscription) : Observable<void>;
}