import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ExpireTokenService } from '../expire-token.service';
import Swal from 'sweetalert2';

import { ApiService } from '../api.service';
import { PasswordValidation } from '../register/password-validation';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {
  resetPasswordForm;
  token;
  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private expireTokenService: ExpireTokenService,
    fb: FormBuilder,
    private apiService: ApiService,
  ) {
    this.resetPasswordForm = fb.group({
      setpassword: new FormControl(null, Validators.required),
      confirmPass: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$")]),
    }, {
      validator: PasswordValidation.MatchPassword // your validation method
    });
  }

  ngOnInit() {
    var token_temp = window.location.href.split('?')[1];
    var token = token_temp.replace(/=/g, '');
    this.token = token;
    this.apiService.checkResetPassword({ "value": token },this.token).subscribe((response: any) => {
      if (response.success == false && response.message == "Token is not valid") {
        this.expireTokenService.expireToken();
      } else if (response["responsecode"] == 200) {
        this.resetPasswordForm.controls['email'].setValue(response.result["email"]);
      }
      console.log(response);
    }, (err) => {
      console.log(err);
    })
  }

  resetPassword(data) {
    this.apiService.resetPassword(data,this.token).subscribe((response: any) => {
      console.log(response);
      if (response.success == false && response.message == "Token is not valid") {
        this.expireTokenService.expireToken();
      }
      else if (response['error'] == true) {
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
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000
        });
        Toast.fire({
          type: 'success',
          title: "Password reset successful"
        });
        this.router.navigate(['login']);
      }
      else {
      }
    }, (err) => {
    });
  }
}