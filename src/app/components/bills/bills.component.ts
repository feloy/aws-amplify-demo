import { Component, OnInit } from '@angular/core';
import { APIService, ListBillsQuery } from 'src/app/API.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {

  bills: any[];

  constructor(
    private router: Router,
    private api: APIService) { }

  ngOnInit(): void {
    this.api.ListBills().then((list: ListBillsQuery) => {
      if (list.items.length == 0) {
        this.router.navigate(['newbill']);
        return;
      }
      this.bills = list.items.sort(this.byCreatedAt);
    });
  }

  // sort by createdAt, newest first
  byCreatedAt(a, b) {
    return a.createdAt < b.createdAt ? 1 : -1;
  }
}
