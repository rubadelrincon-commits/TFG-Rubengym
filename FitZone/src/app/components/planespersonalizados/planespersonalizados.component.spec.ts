import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanespersonalizadosComponent } from './planespersonalizados.component';

describe('PlanespersonalizadosComponent', () => {
  let component: PlanespersonalizadosComponent;
  let fixture: ComponentFixture<PlanespersonalizadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanespersonalizadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanespersonalizadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
