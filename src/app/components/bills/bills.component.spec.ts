import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsComponent } from './bills.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('BillsComponent', () => {
  let component: BillsComponent;
  let fixture: ComponentFixture<BillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillsComponent ],
      imports: [RouterTestingModule.withRoutes([])]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
