import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subscription } from '../models/subscription.model';
import { SubscriptionRepository} from '../repositories/subscription.repository';

@Injectable({
  providedIn: 'root'
})

export class GetSubscriptionUseCases {
  constructor( private repository: SubscriptionRepository) {}
  
  getSubscriptionById (id: String) : Observable <Subscription> {
    return this.repository.getByID(id);
  }

  getAllSubscription () : Observable <Array<Subscription>> {
    return this.repository.getAll();
  }

  saveSubscription (subscription: Subscription): Observable<void> {
    return this.repository.save(subscription)
  }
}