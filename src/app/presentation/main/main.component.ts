import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../components/header/header.component';
import { SideBarComponent } from '../components/side-bar/side-bar.component';
import { LoginComponent } from '../pages/login/login.component';

import { SubscriptionApiService } from '../../infraestructure/adapter/subscriptioon.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HeaderComponent, SideBarComponent, LoginComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})

export class MainComponent {
  
  isLoggedIn:boolean = false;

  constructor(
    private _serviceSub: SubscriptionApiService,
  ) { 
   
  }

  validateLogin(logged:boolean) {
    this.isLoggedIn = logged;
  }
}
