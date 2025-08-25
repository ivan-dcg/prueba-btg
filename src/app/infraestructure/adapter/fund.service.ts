import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FundRepository } from '../../domain/repositories/fund.repository';
import { Fund } from '../../domain/models/fund.model';
import { environment as env} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export  class FundApiService extends FundRepository {

  private _url = env.API_URL;

  constructor(private http: HttpClient) {super();}

  getByID(id: String): Observable<Fund> {
    return this.http.get<Fund>(this._url+id);
  }

  getAll(): Observable<Fund[]> {
    return this.http.get<Array<Fund>>(this._url+'funds');
  }

}