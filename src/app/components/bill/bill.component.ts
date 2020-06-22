import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService, GetBillQuery } from 'src/app/API.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {

  editMode: boolean;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: APIService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      id: new FormControl(null),
      customerID: new FormControl(null),
      title: new FormControl(null),
    });

    this.route.params.subscribe(params => {
      this.editMode = 'id' in params;
      if (this.editMode) {
        this.loadBill(params['id']);
      }
    });

    this.form.valueChanges.subscribe(v => console.log(v));
  }

  loadBill(id: string) {
    this.api.GetBill(id).then((bill: GetBillQuery) => {
      this.form.patchValue({
        id: bill.id,
        customerID: bill.customerID,
        title: bill.title,
      })
    });
  }

  add() {
    this.api.CreateBill(this.form.value).then(() => {
      this.router.navigate(['bills']);
    })
  }

  update() {
    this.api.UpdateBill(this.form.value).then(() => {
      this.router.navigate(['bills']);
    })
  }

  delete() {
    this.api.DeleteBill({ id: this.form.value['id'] }).then(() => {
      this.router.navigate(['bills']);
    })
  }
}
