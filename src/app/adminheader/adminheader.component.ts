import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-adminheader',
  templateUrl: './adminheader.component.html',
  styleUrls: ['./adminheader.component.css']
})
export class AdminheaderComponent implements OnInit {

	constructor(private router: Router) { }

	ngOnInit() {
	}

	clearAll() {
		const Toast = Swal.mixin({
			toast: true,
			position: 'top-end',
			showConfirmButton: false,
			timer: 3000
		  })
		  Toast.fire({
			type: 'success',
			title: 'Signed out successfully'
		  })
		window.localStorage.clear();
		this.router.navigate(['login']);
	}
	homePage(){
		this.router.navigate(['dashboard']);
	}
}