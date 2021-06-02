import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChemistryCalculatorComponent } from './chemistry-calculator.component';

describe('ChemistryCalculatorComponent', () => {
  let component: ChemistryCalculatorComponent;
  let fixture: ComponentFixture<ChemistryCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChemistryCalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChemistryCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
