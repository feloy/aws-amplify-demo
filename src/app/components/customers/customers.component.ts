import { Component, OnInit } from '@angular/core';
import { APIService, ListCustomersQuery, OnCreateCustomerSubscription } from 'src/app/API.service';
import { API } from 'aws-amplify';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers: any[];

  constructor(
    private router: Router,
    private api: APIService) { }

  ngOnInit(): void {
    this.api.ListCustomers().then((list: ListCustomersQuery) => {
      if (list.items.length == 0) {
        this.router.navigate(['newcustomer']);
        return;
      }
      this.customers = list.items.sort(this.byName);
    });
  }

  // Sort by name alphabetically
  byName(a, b) {
    return a.name < b.name ? -1 : 1;
  }
}
