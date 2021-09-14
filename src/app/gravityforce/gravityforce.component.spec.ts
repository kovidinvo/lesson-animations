import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GravityforceComponent } from './gravityforce.component';

describe('GravityforceComponent', () => {
  let component: GravityforceComponent;
  let fixture: ComponentFixture<GravityforceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GravityforceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GravityforceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
