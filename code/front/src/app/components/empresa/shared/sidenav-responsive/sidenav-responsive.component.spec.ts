import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavResponsiveComponent } from './sidenav-responsive.component';

describe('SidenavResponsiveComponent', () => {
  let component: SidenavResponsiveComponent;
  let fixture: ComponentFixture<SidenavResponsiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidenavResponsiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidenavResponsiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
