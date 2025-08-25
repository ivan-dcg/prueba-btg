import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private account = new Subject<number>();
  currentValue:number = 0;

  // Observable that components can subscribe to
  valueObservable$ = this.account.asObservable();

  // Method to emit new values
  sendValue(value: number) {
    this.account.next(value);
    this.currentValue = value;
  }

}