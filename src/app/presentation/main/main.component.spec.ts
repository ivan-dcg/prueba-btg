import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { HeaderComponent } from '../components/header/header.component';
import { SideBarComponent } from '../components/side-bar/side-bar.component';
import { LoginComponent } from '../pages/login/login.component';
import { SubscriptionApiService } from '../../infraestructure/adapter/subscriptioon.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

fdescribe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let subscriptionService: jasmine.SpyObj<SubscriptionApiService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('SubscriptionApiService', ['getAll']);
    await TestBed.configureTestingModule({
      imports: [
        MainComponent,
        CommonModule,
      ],
      providers: [
        { provide: SubscriptionApiService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    subscriptionService = TestBed.inject(SubscriptionApiService) as jasmine.SpyObj<SubscriptionApiService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deberia iniciar cuando isLoggedIn es false', () => {
    expect(component.isLoggedIn).toBeFalse();
  });

  it('Deberia mostrar el login cuando user es no esta logged', () => {
    component.isLoggedIn = false;
    fixture.detectChanges();
    
    const loginElement = fixture.nativeElement.querySelector('app-login');
    expect(loginElement).toBeTruthy();
  });





  it('Deberia ocultar el conetindo del dashboard cuando no hace login', () => {
    component.isLoggedIn = false;
    fixture.detectChanges();
    
    const containerElement = fixture.nativeElement.querySelector('.container');
    expect(containerElement).toBeFalsy();
  });

  describe('validateLogin', () => {
    it('deberia actualizar isLoggedIn cuando hace login', () => {
      component.isLoggedIn = false;
      
      component.validateLogin(true);
      
      expect(component.isLoggedIn).toBeTrue();
    });

  });

});
