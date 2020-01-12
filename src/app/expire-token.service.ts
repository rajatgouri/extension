import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ExpireTokenService {

  constructor(public router:Router) { }
  expireToken(){
    Swal.fire({
      title: 'Your session has expired',
      showCancelButton: false,
      allowOutsideClick: false
    }).then((value) => {
      if (value.value == true) {
        this.router.navigate(['login']);
        localStorage.removeItem("token");
      }
    });
  }
}
