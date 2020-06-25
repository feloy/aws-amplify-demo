import { Component, OnInit } from '@angular/core';
import { APIService, ListBillsQuery } from 'src/app/API.service';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {

  bills: any[];

  constructor(private api: APIService) { }

  ngOnInit(): void {
    this.api.ListBills().then((list: ListBillsQuery) => {
      this.bills = list.items.sort(this.byCreatedAt);
    });
  }

  // sort by createdAt, newest first
  byCreatedAt(a, b) {
    return a.createdAt < b.createdAt ? 1 : -1;
  }
}
