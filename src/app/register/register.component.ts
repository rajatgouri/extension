import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';

import { ApiService } from '../api.service';
import { PasswordValidation } from './password-validation';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signupForm;
  msg: boolean;
  msg_class;
  showmsg;
  token;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    fb: FormBuilder,
    private apiService: ApiService,
  ) {
    this.token = localStorage.getItem("token");
    if (this.token) {
      this.router.navigate(['dashboard']);
    }
    this.signupForm = fb.group({
      firstName: new FormControl(null, Validators.required),
      setpassword: new FormControl(null, Validators.required),
      confirmPass: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      company: new FormControl(''),
      email: new FormControl(null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$")]),
    }, {
      validator: PasswordValidation.MatchPassword // your validation method
    });
  }

  ngOnInit() {
    this.msg = false;
  }

  signin() {
    this.router.navigate(['login']);
  }

  signUp(data) {
    data.provider = 'email';
    data.role = 'admin';
    this.apiService.createUser(data).subscribe((response) => {
      console.log(response);
      if (response['error'] == true) {
        var resmesage = response['errorMessage'];
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        })
        Toast.fire({
          type: 'error',
          title: resmesage
        })
      }
      else if (response['responsecode'] == 200) {
        this.signupForm.reset();
        this.msg = true;
        this.msg_class = 'label-success';
        this.showmsg = response['message'];
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000
        });
        Toast.fire({
          type: 'success',
          title: "User Register"
        });
        this.router.navigate(['login']);
      }
      else {
        this.msg = true;
        this.msg_class = 'label-warning';
        this.showmsg = response['message'];
      }
    }, (err) => {
      this.msg = true;
      this.msg_class = 'label-danger';
      this.showmsg = 'Something Went Wrong!!';
    });
  }
}