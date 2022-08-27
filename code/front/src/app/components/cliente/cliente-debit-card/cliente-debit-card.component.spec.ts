import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteDebitCardComponent } from './cliente-debit-card.component';

describe('ClienteDebitCardComponent', () => {
  let component: ClienteDebitCardComponent;
  let fixture: ComponentFixture<ClienteDebitCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClienteDebitCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteDebitCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
