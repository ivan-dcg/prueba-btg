import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionHistoryComponent } from './transaction-history.component';
import { TransactionApiService } from '../../../infraestructure/adapter/transaction.service';
import { Transaction } from '../../../domain/models/transaction.model';
import { Fund } from '../../../domain/models/fund.model';
import { TransactionType } from '../../../domain/enums/transactionType.enum';
import { of } from 'rxjs';


fdescribe('TransactionHistoryComponent', () => {
  let component: TransactionHistoryComponent;
  let fixture: ComponentFixture<TransactionHistoryComponent>;
  let transactionService: jasmine.SpyObj<TransactionApiService>;

  const mockTransactions: Transaction[] = [
    {
      id: '1',
      subscriptionId: 'sub1',
      fundId: 1,
      userId: '1',
      createdAt: '2024-01-01T10:00:00Z',
      type: TransactionType.SUBSCRIPTION
    },
    {
      id: '2',
      subscriptionId: 'sub2',
      fundId: 2,
      userId: '1',
      createdAt: '2024-01-02T10:00:00Z',
      type: TransactionType.CANCEL
    },
    {
      id: '3',
      subscriptionId: 'sub3',
      fundId: 1,
      userId: '2',
      createdAt: '2024-01-03T10:00:00Z',
      type: TransactionType.SUBSCRIPTION
    }
  ];

  const mockFunds: Fund[] = [
    {
      id: 1,
      name: 'Fondo A',
      minAmount: 1000,
      categoryId: 1
    },
    {
      id: 2,
      name: 'Fondo B',
      minAmount: 2000,
      categoryId: 2
    }
  ];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('TransactionApiService', ['getAll']);
    
    await TestBed.configureTestingModule({
      imports: [TransactionHistoryComponent],
      providers: [
        { provide: TransactionApiService, useValue: spy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionHistoryComponent);
    component = fixture.componentInstance;
    transactionService = TestBed.inject(TransactionApiService) as jasmine.SpyObj<TransactionApiService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Debe cargar los servicios llamados al iniciar la aplicación', () => {
    beforeEach(() => {
      spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockFunds));
      transactionService.getAll.and.returnValue(of(mockTransactions));
    });

    it('Debe cargar los fondos desde localStorage y filtrar las transacciones del usuario', () => {
      // Arrange
      const expectedFilteredTransactions = mockTransactions.filter(t => t.userId === '1');
      
      // Act
      component.ngOnInit();
      
      // Assert
      expect(localStorage.getItem).toHaveBeenCalledWith('funds');
      expect(component.funds).toEqual(mockFunds);
      expect(transactionService.getAll).toHaveBeenCalled();
      expect(component.transaction).toEqual(expectedFilteredTransactions);
    });

  });

  describe('Obtener los nombres de fondos', () => {
    beforeEach(() => {
      component.funds = mockFunds;
    });

    it('Debe retornar el nombre del fondo si esta presente en el array', () => {
      // Act
      const result = component.getName(1);
      
      // Assert
      expect(result).toBe('Fondo A');
    });

    it('Debe retornar el nombre si existe el id', () => {
      // Act
      const result = component.getName('1');
      
      // Assert
      expect(result).toBe('Fondo A');
    });

    it('Debe retornar el id si el nombre no se encuentra', () => {
      // Act
      const result = component.getName(999);
      
      // Assert
      expect(result).toBe(999);
    });

    it('Debe retornar el id si el array no esta definido', () => {
      // Arrange
      component.funds = undefined;
      
      // Act
      const result = component.getName(1);
      
      // Assert
      expect(result).toBe(1);
    });

    it('Debe retornar el id si el array esta vacio', () => {
      // Arrange
      component.funds = [];
      
      // Act
      const result = component.getName(1);
      
      // Assert
      expect(result).toBe(1);
    });


    it('Debe validar cuando el nombre no esta definido', () => {
      // Act
      const result = component.getName(undefined);
      
      // Assert
      expect(result).toBe(undefined);
    });
  });


  describe('Error Handling', () => {
    it('Manejo de errores', () => {
      // Arrange
      spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockFunds));
      spyOn(console, 'error');
      transactionService.getAll.and.returnValue(of([]));
      
      // Act
      component.ngOnInit();
      
      // Assert
      expect(component.transaction).toEqual([]);
    });
  });
});
