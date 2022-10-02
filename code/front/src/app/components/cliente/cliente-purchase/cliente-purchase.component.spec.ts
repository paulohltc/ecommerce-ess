import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientePurchaseComponent } from './cliente-purchase.component';

describe('ClientePurchaseComponent', () => {
  let component: ClientePurchaseComponent;
  let fixture: ComponentFixture<ClientePurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientePurchaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientePurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
