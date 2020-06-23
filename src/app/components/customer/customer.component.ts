import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService, GetCustomerQuery, CreateCustomerMutation } from 'src/app/API.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  editMode: boolean;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: APIService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null),
      address: new FormControl(null),
      siret: new FormControl(null),
    });

    this.route.params.subscribe(params => {
      this.editMode = 'id' in params;
      if (this.editMode) {
       this.loadCustomer(params['id']);
      }
    })
  }

  loadCustomer(id: string) {
    this.api.GetCustomer(id).then((customer: GetCustomerQuery) => {
      this.form.patchValue({
        id: customer.id,
        name: customer.name,
        address: customer.address,
        siret: customer.siret,
      })
    });
  }
  
  add() {
    this.api.CreateCustomer(this.form.value).then(() => {
      this.router.navigate(['customers']);
    })
  }

  update() {
    this.api.UpdateCustomer(this.form.value).then(() => {
      this.router.navigate(['customers']);
    })
  }

  delete() {
    this.api.DeleteCustomer({ id: this.form.value['id']}).then(() => {
      this.router.navigate(['customers']);
    })
  }
}
