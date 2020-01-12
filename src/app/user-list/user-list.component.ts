import { Component, OnInit, Pipe } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ExpireTokenService } from '../expire-token.service';
import Swal from 'sweetalert2';

@Pipe({
  name: 'userSearch'
})

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  userList: any = [];
  dropdownOptions: any = [];
  config;
  dataModel: any;
  Search: any;
  token;
  constructor(private router: Router,
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    private expireTokenService: ExpireTokenService
  ) {
    this.token = localStorage.getItem("token");
    this.config = {
      displayKey: "description", //if objects array passed which key to be displayed defaults to description
      search: true, //true/false for the search functionlity defaults to false,
      height: 'auto', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
      placeholder: 'Select', // text to be displayed when no item is selected defaults to Select,
      customComparator: () => { }, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
      //limitTo: options.length, // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
      moreText: 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
      noResultsFound: 'No results found!', // text to be displayed when no items are found while searching
      searchPlaceholder: 'Search',// label thats displayed in search input,
      searchOnKey: 'name',// key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    }
    this.getUserList();
  }

  ngOnInit() {
    this.apiService.getUserName(this.token).subscribe((response: any) => {
      if (response.success == false && response.message == "Token is not valid") {
        this.spinner.hide();
        this.expireTokenService.expireToken();
      } else {
        setTimeout(() => {
          this.dropdownOptions = response.result;
        }, 1000)
        console.log(response);
      }
    }, (err) => {
      console.log(err);
    })
  }

  getUserList() {
    this.spinner.show();
    this.apiService.getUser(this.token).subscribe((response: any) => {
      if (response.success == false && response.message == "Token is not valid") {
        this.spinner.hide();
        this.expireTokenService.expireToken();
      } else {
        setTimeout(() => {
          this.userList = response.result;
          this.spinner.hide();
        }, 1000)
        console.log(response);
      }
    }, (err) => {

    })
  }

  selectionChanged(e) {
    this.dataModel = e.value;
  }

  deleteUser(array) {
    this.spinner.show();
    var fullname = array.firstName + " " + array.lastName;
    var userfolderdetails = [];
    var UserPermissionDetails_id = array.UserPermissionDetails._id;
    var userDetail_id = array._id;
    for (let i = 0; i < array.userfolderdetails.length; i++) {
      userfolderdetails.push(array.userfolderdetails[i]._id);
    }
    var data = {
      UserPermissionDetails_id,
      userDetail_id,
      userfolderdetails
    }
    this.apiService.deleteUser(data, this.token).subscribe((response: any) => {
      if (response.success == false && response.message == "Token is not valid") {
        this.spinner.hide();
        this.expireTokenService.expireToken();
      } else if (response.responsecode == 200) {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });
        Toast.fire({
          type: 'success',
          title: "User" + " " + fullname + " " + "delete successfull!"
        });
        this.getUserList();
      }
      console.log(response);
    }, (err) => {
      console.log(err);
    })
  }

  addUser() {
    localStorage.setItem("userMode", "add");
    this.router.navigate(['adduser']);
  }

  editUser(val, array) {
    this.router.navigate(['adduser']);
    localStorage.setItem("userMode", val);
    var tempArray = JSON.stringify(array);
    localStorage.setItem("userDetail", tempArray);
    //this.adduserComponent.getUserDetails(val,array);
  }

}
