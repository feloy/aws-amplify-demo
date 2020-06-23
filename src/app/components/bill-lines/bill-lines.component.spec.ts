import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillLinesComponent } from './bill-lines.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('BillLinesComponent', () => {
  let component: BillLinesComponent;
  let fixture: ComponentFixture<BillLinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillLinesComponent ],
      imports: [RouterTestingModule.withRoutes([])]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillLinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
