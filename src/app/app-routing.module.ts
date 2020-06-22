import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersComponent } from './components/customers/customers.component';
import { BillsComponent } from './components/bills/bills.component';
import { CustomerComponent } from './components/customer/customer.component';
import { BillComponent } from './components/bill/bill.component';


const routes: Routes = [
  {
    path: 'customers',
    component: CustomersComponent,
  },
  {
    path: 'customer/:id',
    component: CustomerComponent,
  },
  {
    path: 'newcustomer',
    component: CustomerComponent,
  },
  {
    path: 'bills',
    component: BillsComponent,
  },
  {
    path: 'bill/:id',
    component: BillComponent,
  },
  {
    path: 'newbill',
    component: BillComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
