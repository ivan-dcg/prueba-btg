import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../../domain/models/user.model';
import { DataService } from '../../../infraestructure/helper/service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent implements OnInit, OnDestroy {

  user:User;
  accountBalance: number = 500000;
  private subscription: Subscription = new Subscription;

  constructor(private _dataService: DataService) {
    const userString = sessionStorage.getItem('user');
    this.user = userString ? JSON.parse(userString) : null;
    this._dataService.sendValue(this.user.accountBalance)
    console.log(this.user);
  }

  ngOnInit() {
    this.subscription = this._dataService.valueObservable$
      .subscribe(value => {
        this.accountBalance = value;
        localStorage.setItem('balance', `${value}`)
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
