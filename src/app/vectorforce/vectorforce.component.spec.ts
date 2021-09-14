import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VectorforceComponent } from './vectorforce.component';

describe('VectorforceComponent', () => {
  let component: VectorforceComponent;
  let fixture: ComponentFixture<VectorforceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VectorforceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VectorforceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
