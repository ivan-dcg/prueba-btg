import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubscriptionRepository } from '../../domain/repositories/subscription.repository';
import { Subscription } from '../../domain/models/subscription.model';
import { environment as env} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export  class SubscriptionApiService extends SubscriptionRepository {

  private _url = env.API_URL;

  constructor(private http: HttpClient) {super();}

  getByID(id: String): Observable<Subscription> {
    return this.http.get<Subscription>(this._url+id);
  }

  getAll(): Observable<Subscription[]> {
    return this.http.get<Array<Subscription>>(this._url);
  }

  save(subscription: Subscription): Observable<void> {
    return this.http.post<void>(this._url, subscription);
  }

}