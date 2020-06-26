import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService, ListUsersQuery } from 'src/app/API.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  form: FormGroup;
  id: string = null;

  constructor(
    private router: Router,
    private api: APIService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      id: new FormControl(null),
      firstname: new FormControl(null),
      lastname: new FormControl(null),
      address: new FormControl(null),
      phone: new FormControl(null),
      email: new FormControl(null),
      siret: new FormControl(null),
    });

    this.loadUser();
  }

  loadUser() {
    this.api.ListUsers().then((users: ListUsersQuery) => {
      if (users.items.length == 0) {
        this.id = null;
        return;
      }
      const user = users.items[0];
      this.id = user.id;
      this.form.patchValue({
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        address: user.address,
        phone: user.phone,
        email: user.email,
        siret: user.siret,
      })
    });
  }


  update() {
    if (this.id != null) {
      this.api.UpdateUser(this.form.value).then(() => {
        this.router.navigate(['']);
      })  
    } else {
      this.api.CreateUser(this.form.value).then(() => {
        this.router.navigate(['']);
      });
    }
  }

}
