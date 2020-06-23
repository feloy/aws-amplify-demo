import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService, GetBillQuery } from 'src/app/API.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-bill-lines',
  templateUrl: './bill-lines.component.html',
  styleUrls: ['./bill-lines.component.css']
})
export class BillLinesComponent implements OnInit {

  bill: any;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: APIService) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
        this.loadBill(params['id']);
    });
  }

  loadBill(id: string) {
    this.api.GetBill(id).then((bill: GetBillQuery) => {
      this.bill = bill;
      this.createForm();
    });
  }

  createForm() {
    this.form = new FormGroup({
      billID: new FormControl(this.bill.id),
      quantity: new FormControl(null),
      title: new FormControl(null),
      cost: new FormControl(null),
    });
  }

  total(line: any) {
    return line.quantity * line.cost;
  }

  add() {
    this.api.CreateLine(this.form.value).then(() => {
      this.loadBill(this.bill.id);
    });
  }

  delete(id: string) {
    this.api.DeleteLine({id}).then(() => {
      this.loadBill(this.bill.id);
    });
  }
}
