import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FundApiService } from '../../../infraestructure/adapter/fund.service';
import { Fund } from '../../../domain/models/fund.model';

@Component({
  selector: 'app-funds',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './funds.component.html',
  styleUrl: './funds.component.css'
})

export class FundsComponent implements OnInit {

  constructor(private _service: FundApiService) { }

  response$: Observable<Fund[]> | undefined;
  funds?: Fund[];

  ngOnInit(): void {
    this.response$ = this._service.getAll();
    this.response$.subscribe(
      (data: Fund[]) => {
        console.log(data)
        this.funds = data;
      }
    );

  }

}
