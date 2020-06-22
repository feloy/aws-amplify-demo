import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { APIService, ListCustomersQuery } from 'src/app/API.service';

@Component({
  selector: 'app-customer-select',
  templateUrl: './customer-select.component.html',
  styleUrls: ['./customer-select.component.css'],
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomerSelectComponent),
      multi: true
    }
  ]
})
export class CustomerSelectComponent implements OnInit, ControlValueAccessor {

  customerID: string;

  customers: any[];

  propagateChange = (_: any) => { };

  constructor(private api: APIService) { }

  ngOnInit(): void {
    this.api.ListCustomers().then((list: ListCustomersQuery) => {
      this.customers = list.items;
    });
  }

  writeValue(value: any) {
    this.customerID = value;
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(_: any): void {}

  change(value: any) {
    this.propagateChange(value);
  }
}
