import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import Swal from 'sweetalert2';
import { ApiService } from '../api.service';
import { ExpireTokenService } from '../expire-token.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css'],
})

export class AdduserComponent implements OnInit {
  folderArray: any = [];
  valueArray: any = [];
  arrayValue: any = [{
    dataModel: '',
    create: '',
    read: '',
    delete: '',
    update: ''
  }];
  editRemoveRow: boolean;
  editRemoveArray: any = [];
  editRemoveIteration;
  details;
  userPermissions;
  dropdownOptions: any;
  config;
  token;
  dataModel;
  userMode;
  constructor(
    private router: Router,
    private apiService: ApiService,
    private expireTokenService: ExpireTokenService,
    private spinner: NgxSpinnerService,
  ) {
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
    this.userMode = localStorage.getItem("userMode");
    this.token = localStorage.getItem("token");
    this.details = {
      firstName: "",
      lastName: "",
      fullname: "",
      email: "",
      company: "",
      role: "user",
      provider: "email"
    }
    this.userPermissions = {
      company: "",
      fullname: "",
      email: "",
      permissionToCreateGroup: false,
      createdByAdmin: false,
      createNewFolder: false,
    }
  }

  ngOnInit() {
    /* Get Particular User Details Start */
    this.apiService.getFolder(this.token).subscribe((response: any) => {
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

    })
    if (this.userMode == "edit") {
      var temp = localStorage.getItem("userDetail");
      var array = JSON.parse(temp);
      this.userPermissions.permissionToCreateGroup = array.UserPermissionDetails.permissionToCreateGroup;
      this.userPermissions.createdByAdmin = array.UserPermissionDetails.createdByAdmin;
      this.userPermissions.createNewFolder = array.UserPermissionDetails.createNewFolder;
      this.details.firstName = array.firstName;
      this.details.lastName = array.lastName;
      this.details.email = array.email;
      this.details.firstName = array.firstName;
      this.details.fullname = array.firstName + " " + array.lastName;
      if (array.userfolderdetails.length !== 0) {
        this.arrayValue = array.userfolderdetails;
      }
      for (let i = 0; i < array.userfolderdetails.length; i++) {
        var folder_id = { "folder_id": array.userfolderdetails[i]._id };
        this.valueArray.push(folder_id);
      }
    }
    /* Get Particular User Details End */
  }

  focus1() {
    this.details.fullname = this.details.firstName + " " + this.details.lastName;
  }
  focus2() {
    this.details.fullname = this.details.firstName + " " + this.details.lastName;
  }
  blur1() {
    this.details.fullname = this.details.firstName + " " + this.details.lastName;
  }
  blur2() {
    this.details.fullname = this.details.firstName + " " + this.details.lastName;
  }

  /* Add New User Folder Row Start */
  add() {
    this.arrayValue.push({
      dataModel: '',
      create: false,
      read: false,
      delete: false,
      update: false
    });
  }
  /* Add New User Folder Row End */

  /* Remove User Folder Row Start */
  remove(i: number, array) {
    if (this.userMode == "edit") {
      if (array[i]._id) {
        var arrayTemp = [];
        this.editRemoveRow = true;
        this.editRemoveArray = arrayTemp.concat(array);
        this.editRemoveIteration = i;
        /*         var id = array[i]._id;
                this.apiService.removeUserFolderRow(id, this.token).subscribe((response: any) => {
                  console.log(response);
                }, (err) => {
                  console.log(err);
                }) */
      }
    }
    if (array.length > 1) {
      this.arrayValue.splice(i, 1);
    }
  }
  /* Remove User Folder Row End */

  /* Add/Update Folder Start */
  submit() {
    this.spinner.show();
    if (this.details.email.match("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$")) {
      /* To add new user start*/
      if (this.userMode == "add") {
        for (let i = 0; i < this.arrayValue.length; i++) {
          var permission = [];
          var folderName = "";
          if (this.arrayValue[i].create) {
            permission.push({ "create": this.arrayValue[i].create });
          } if (this.arrayValue[i].delete) {
            permission.push({ "delete": this.arrayValue[i].delete });
          } if (this.arrayValue[i].read) {
            permission.push({ "read": this.arrayValue[i].read });
          } if (this.arrayValue[i].update) {
            permission.push({ "update": this.arrayValue[i].update });
          }
          var valueArray = {}
          folderName = this.arrayValue[i].dataModel;
          valueArray["folderName"] = folderName;
          valueArray["permission"] = permission;
          valueArray["email"] = this.details.email;
          valueArray["name"] = this.details.fullname;
          valueArray["company"] = this.details.company;
          this.folderArray.push(valueArray);
        }
        this.userPermissions.email = this.details.email;
        this.userPermissions.fullname = this.details.fullname;
        this.userPermissions.company = this.details.company;
        var userPermissions = this.userPermissions;
        var folderarray = this.folderArray;
        var details = this.details;
        var role = "user";
        var provider = "email";
        var data = {
          userPermissions,
          folderarray,
          details,
          role,
          provider
        }
        this.apiService.createUser(data).subscribe((response: any) => {
          this.spinner.hide();
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
              title: "User added successful!"
            });
            this.router.navigate(['userlist']);
          } else {
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000
            });
            Toast.fire({
              type: 'error',
              title: response.errorMessage || "Something went wrong!"
            });
          }
        }, (err) => {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
          });
          Toast.fire({
            type: 'error',
            title: "Enter the correct email ID!"
          });
        })
      }
      /* To add new Folder end*/

      /* To update Folder start*/
      else if (this.userMode == "edit") {
        if (this.editRemoveRow == true) {
          var id = this.editRemoveArray[this.editRemoveIteration]._id;
          this.apiService.removeUserFolderRow(id, this.token).subscribe((response: any) => {
            if (response.success == false && response.message == "Token is not valid") {
              this.spinner.hide();
              this.expireTokenService.expireToken();
            }
            console.log(response);
          }, (err) => {
            console.log(err);
          })
        }
        for (let i = 0; i < this.arrayValue.length; i++) {
          var numberIteration = i + 1;
          var permission = [];
          var folderName = "";
          var valueArray = {}
          if (this.arrayValue[i].create) {
            permission.push({ "create": this.arrayValue[i].create });
          } if (this.arrayValue[i].delete) {
            permission.push({ "delete": this.arrayValue[i].delete });
          } if (this.arrayValue[i].read) {
            permission.push({ "read": this.arrayValue[i].read });
          } if (this.arrayValue[i].update) {
            permission.push({ "update": this.arrayValue[i].update });
          }
          folderName = this.arrayValue[i].dataModel;
          valueArray["folderName"] = folderName;
          valueArray["permission"] = permission;
          valueArray["email"] = this.details.email;
          valueArray["name"] = this.details.fullname;
          valueArray["company"] = this.details.company;
          if (this.valueArray.length >= numberIteration) {
            valueArray["_id"] = this.valueArray[i].folder_id;
          }
          this.folderArray.push(valueArray);
        }
        this.userPermissions.email = this.details.email;
        this.userPermissions.fullname = this.details.fullname;
        this.userPermissions.company = this.details.company;
        var userPermissions = this.userPermissions;
        var folderarray = this.folderArray;
        var details = this.details;
        var role = "user";
        var provider = "email";
        var data = {
          userPermissions,
          folderarray,
          details,
          role,
          provider
        }
        this.apiService.updateUser(data, this.token).subscribe((response: any) => {
          this.spinner.hide();
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
              title: "User updated successful!"
            });
            this.router.navigate(['userlist']);
          } else {
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000
            });
            Toast.fire({
              type: 'error',
              title: response.errorMessage || "Something went wrong!"
            });
          }
        }, (err) => {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
          });
          Toast.fire({
            type: 'error',
            title: "Enter the correct email ID!"
          });
        })
      }
      /* To update Folder end*/
    } else {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      });
      Toast.fire({
        type: 'error',
        title: "Enter the correct email ID!"
      });
    }
  }
  /* Add/Update Folder End */

  selectionChanged(e) {
    this.dataModel = e.value;
  }

  deselectItem(item: any, index: number) {
    console.log(item, index);
  }

  cancel() {
    this.router.navigate(['userlist']);
  }
}
