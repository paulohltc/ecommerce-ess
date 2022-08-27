import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteProfilePageComponent } from './cliente-profile-page.component';

describe('ClienteProfilePageComponent', () => {
  let component: ClienteProfilePageComponent;
  let fixture: ComponentFixture<ClienteProfilePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClienteProfilePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
