import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fund } from '../models/fund.model';
import { FundRepository} from '../repositories/fund.repository';

@Injectable({
  providedIn: 'root'
})

export class GetFundUseCases {
  constructor( private repository: FundRepository) {}
  
  getFundById (id: String) : Observable <Fund> {
    return this.repository.getByID(id);
  }

  getAllFund () : Observable <Array<Fund>> {
    return this.repository.getAll();
  }
}