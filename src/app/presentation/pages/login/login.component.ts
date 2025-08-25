import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {Validators} from '@angular/forms';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  @Output() loggedIn = new EventEmitter<boolean>();

  form = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required) 
  });


  login() {
    //sin validación de login
    const user = {"id": "1", "name": "fulano asd", "email": "user@gmail.com", "password": "12345", "accountBalance": 500000};
    sessionStorage.setItem('user', JSON.stringify(user))
    this.loggedIn.emit(true);
  }
}
