import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import * as $ from 'jquery';

import { ApiService } from '../api.service';
import { AuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider } from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm;
  user: SocialUser;
  msg: boolean;
  msg_class;
  showmsg;
  token;

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private apiService: ApiService
  ) { 
    this.token = localStorage.getItem("token");
    if(this.token){
      this.router.navigate(['dashboard']);
    }
  }

  ngOnInit() {
    localStorage.removeItem("token");
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  /* Gmail Sign In Start */
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(x =>
      this.saveUser(x)
    );
  }
  saveUser(data) {
    this.user = data;
    this.apiService.createUser(data).subscribe((response) => {
      if (response['responsecode'] == 200 ) {
        var data = {"email":this.user.email,"provider":this.user.provider}
        this.onSubmit(data);
        this.msg_class = 'label-success';
        this.showmsg = response['message'];
      } else {
        this.msg_class = 'label-warning';
        this.showmsg = response['message'];
      }
    }, (err) => {
      this.msg_class = 'label-danger';
      this.showmsg = 'Something Went Wrong!!';
    });
  }
  /* Gmail Sign In End */

  gosign() {
    this.router.navigate(['register']);
  }

  forgot() {
    var current_url1 = window.location.href;
    var current_url2 = current_url1.split('/');
    var current_url = current_url2[0] +"//"+current_url2[2]+"/"+"forgetpassword";
    Swal.fire({
      title: 'Enter Your Email Id!',
      input: 'text',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'You need to write something!'
        }else if(!value.match("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$")){
          return 'Please write your email!'
        }
      }
    }).then((value) => {
      if (!value.dismiss) {
        var val = {
          "email":value,
          "link":current_url
        }
        this.apiService.forgetPassword(val).subscribe((response: any) => {
          if(response["responsecode"] == 400){
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000
            });
            Toast.fire({
              type: 'error',
              title: response["errorMessage"] +"!"
            });
          }else if(response["responsecode"] == 200){
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000
            });
            Toast.fire({
              type: 'success',
              title: "Email sent!"
            });
          }
          console.log(response);
        }, (err) => {
          console.log(err);
        })
      }
    })
  }

  signOut(): void {
    this.authService.signOut();
  }

  /* Login Submit Start */
  onSubmit(data) {
    if($('#Rememberme').is(":checked")){
      var rememberme =  $('#Rememberme').val();
      data["remberme"] = rememberme;
    }
    var api = data.provider == "GOOGLE" ? this.apiService.loginByGmail(data):this.apiService.loginByEmail(data);
    api.subscribe((response) => {
      if (response['token']) {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        })
        Toast.fire({
          type: 'success',
          title: 'Signed in successfully'
        })
        var token = response['token'];
        localStorage.setItem("token", token);
        this.router.navigate(['dashboard']);
      } else {
        if(response['errorMessage']){
          var errormsg = response['errorMessage'];
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
          })
          
          Toast.fire({
            type: 'error',
            title: errormsg
          })
          this.router.navigate(['login']);
        }
      }
    }, (err) => {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      })
      Toast.fire({
        type: 'error',
        title: "Invalid email and Password"
      })
    });
  }
  /* Login Submit End */

}