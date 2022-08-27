import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteShoppingCartComponent } from './cliente-shopping-cart.component';

describe('ClienteShoppingCartComponent', () => {
  let component: ClienteShoppingCartComponent;
  let fixture: ComponentFixture<ClienteShoppingCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClienteShoppingCartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteShoppingCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
