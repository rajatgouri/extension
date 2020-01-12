import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { ExpireTokenService } from '../expire-token.service';
import Swal from 'sweetalert2';
import * as $ from 'jquery';
declare const dumpBookmarks: any;
declare const create_bookmark: any;
//const Swal = require('sweetalert2')


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  token;
  categorylist: any = [];
  category: any = {};
  constructor(
    private router: Router,
    private apiService: ApiService,
    private expireTokenService:ExpireTokenService
  ) {
   /*  this.token = localStorage.getItem("token");
    this.getCategory(); */
  }

  ngOnInit() {
    //dumpBookmarks();
  }

  //Get category List Start
/*   getCategory() {
    this.apiService.getCategory(this.token).subscribe((response: any) => {
      if (response.success == false && response.message == "Token is not valid") {
        this.expireTokenService.expireToken();
      } else {
        this.categorylist = response.result;
        console.log(response);
      }
    }, (error) => {
      console.log(error);
    });
  } */
 //Get category List End

  //Add Category Start
/*   catergoryAdd() {
    Swal.fire({
      title: 'Category',
      //input: 'text',
      html: '<input autocomplete="off" id="Category" class="swal2-input" autofocus placeholder="Category">' +
        '<label class="checkbox-inline" style="margin-right: 16px;"><input type="checkbox" id="read" value="">Read</label>' +
        '<label class="checkbox-inline"><input type="checkbox" id="write" value="">Write</label>',
      showCancelButton: true
    }).then((value) => {
      if (value.value == true) {
        var read = "";
        var write = "";
        if ($('#read').is(":checked")) {
          read = "read";
        } else {
          read = "";
        }
        if ($('#write').is(":checked")) {
          write = "write";
        } else {
          write = "";
        }
        var data = {
          "category": $('#Category').val(),
          "read": read,
          "write": write,
        }
        this.apiService.categoryAdd(data, this.token).subscribe((response:any) => {
          if (response.success == false && response.message == "Token is not valid") {
            this.expireTokenService.expireToken();
          }
        //  create_bookmark(data.category);
          this.getCategory();
        }, (error) => {
          console.log(error);
        });
      }
    });
  } */
  //Add Category End

  //Update Category Start
/*   openCategory(category) {
    var name = category.category;
    if (category.write == "write" && category.read !== "read") {
      var Html =
        '<label class="checkbox-inline" style="margin-right: 16px;"><input type="checkbox" id="read" value="">Read</label>' +
        '<label class="checkbox-inline"><input type="checkbox" id="write" value="" checked>Write</label>'
    }
    else if (category.read == "read" && category.write !== "write") {
      var Html =
        '<label class="checkbox-inline" style="margin-right: 16px;"><input type="checkbox" id="read" value="" checked>Read</label>' +
        '<label class="checkbox-inline"><input type="checkbox" id="write" value="" >Write</label>'
    }
    else if (category.read == "read" && category.write == "write") {
      var Html =
        '<label class="checkbox-inline" style="margin-right: 16px;"><input type="checkbox" id="read" value="" checked>Read</label>' +
        '<label class="checkbox-inline"><input type="checkbox" id="write" value="" checked>Write</label>'
    }
    Swal.fire({
      title: 'Category',
      input: 'text',
      inputValue: category.category,
      html: Html,
      showCancelButton: true
    }).then((inputValue) => {
      if (inputValue.value) {
        if (inputValue.value.length > 0) {
          var read = "";
          var write = "";
          if ($('#read').is(":checked")) {
            read = "read";
          } else {
            read = "";
          }
          if ($('#write').is(":checked")) {
            write = "write";
          } else {
            write = "";
          }
          var data = {
            "id": category._id,
            "category": inputValue.value,
            "read": read,
            "write": write,
          }
          this.apiService.UpdateCategory(data, this.token).subscribe((response: any) => {
            //create_bookmark(data.category);
            if (response.success == false && response.message == "Token is not valid") {
              this.expireTokenService.expireToken();
            }
            else if (response.message == "Request success") {
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
              });
              Toast.fire({
                type: 'info',
                title: 'Nothing updated'
              });
            } else {
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
              });
              Toast.fire({
                type: 'success',
                title: 'Category updated'
              });
            }
            this.getCategory();
            console.log(response);
          }, (error) => {
            console.log(error);
          });
        }
      }
    });
  } */
  //Update Category End
}
