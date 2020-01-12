import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { ExpireTokenService } from '../expire-token.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
declare const create_bookmark: any;
declare const onBookmarkDeleted: any;

@Component({
  selector: 'app-addfolder',
  templateUrl: './addfolder.component.html',
  styleUrls: ['./addfolder.component.css']
})
export class AddfolderComponent implements OnInit {
  arrayValue: any = [{
    dataModel: '',
    create: '',
    read: '',
    delete: '',
    update: ''
  }];
  foldername;
  editRemoveRow: boolean;
  editRemoveArray: any = [];
  editRemoveIteration;
  folderArray: any = [];
  details;
  dropdownOptions: any;
  config;
  dataModel;
  folderMode;
  token;
  folderPermissions;
  valueArray: any = [];
  constructor(
    private router: Router,
    private apiService: ApiService,
    private expireTokenService: ExpireTokenService,
    private spinner: NgxSpinnerService,
  ) {
    this.folderMode = localStorage.getItem("folderMode");
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
    this.editRemoveRow = false;
  }

  ngOnInit() {
    // dumpBookmarks();
    /* Get Particular User Details Start */
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
    if (this.folderMode == "edit") {
      var temp = localStorage.getItem("folderDetail");
      var array = JSON.parse(temp);
      this.foldername = array;
      var data = this.foldername;
      this.apiService.getFolderUser(data, this.token).subscribe((response: any) => {
        if (response.success == false && response.message == "Token is not valid") {
          this.spinner.hide();
          this.expireTokenService.expireToken();
        }
        var result = response.result;
        for (let i = 0; i < result.length; i++) {
          var name = result[i].name;
          result[i]["dataModel"] = name;
          for (let k = 0; k < result[i].permission.length; k++) {
            if (result[i].permission[k].create) {
              var create = result[i].permission[k].create;
              result[i]["create"] = create;
            } if (result[i].permission[k].read) {
              var read = result[i].permission[k].read;
              result[i]["read"] = read;
            } if (result[i].permission[k].update) {
              var update = result[i].permission[k].update;
              result[i]["update"] = update;
            } if (result[i].permission[k].delete) {
              var _delete = result[i].permission[k].delete;
              result[i]["delete"] = _delete;
            }
          }
          delete result[i].permission;
          delete result[i].folderName;
        }
        this.arrayValue = result;
        for (let i = 0; i < this.arrayValue.length; i++) {
          var folder_id = { "folder_id": this.arrayValue[i]._id };
          this.valueArray.push(folder_id);
        }
        console.log(response);
      }, (err) => {

      })
    }
    /* Get Particular User Details End */
  }


  add() {
    this.arrayValue.push({
      dataModel: '',
      create: '',
      read: '',
      delete: '',
      update: ''
    });
  }

  remove(i: number, array) {
    if (this.folderMode == "edit") {
      if (array[i]._id) {
        var arrayTemp = [];
        this.editRemoveRow = true;
        this.editRemoveArray = arrayTemp.concat(array);
        this.editRemoveIteration = i;
      }
    }
    if (array.length > 1) {
      this.arrayValue.splice(i, 1);
    }
  }

  submit() {
    if (this.foldername) {
      /* To add new user start*/
      if (this.folderMode == "add") {
        for (let i = 0; i < this.arrayValue.length; i++) {
          var permission = [];
          var username = "";
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
          username = this.arrayValue[i].dataModel;
          valueArray["name"] = username.length == 0 ? "" : username;
          valueArray["folderName"] = this.foldername;
          valueArray["permission"] = permission;
          this.folderArray.push(valueArray);
          var folderName = this.foldername;
          var folderarray = this.folderArray;
        }
        //create_bookmark(this.foldername);
        let data = {
          folderarray,
          folderName,
        }
        console.log(data); 
        this.apiService.createFolder(data, this.token).subscribe((response: any) => {
          if (response.success == false && response.message == "Token is not valid") {
            this.spinner.hide();
            this.expireTokenService.expireToken();
          } else if (response.responsecode == 200) {
            /* var addFolderDetails;
            if (localStorage.getItem("bookmarkItem")) {
              console.log("localStorage :" + localStorage);
              addFolderDetails = JSON.parse(localStorage.getItem("bookmarkItem"));
              console.log("addFolderDetails title :" + addFolderDetails.title);
            }
            let data = {
              addFolderDetails
            } */
           // this.apiService.createFolderDetails(data, this.token).subscribe((response: any) => {
              if (response.responsecode == 200) {
                localStorage.removeItem("bookmarkItem");
                const Toast = Swal.mixin({
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 3000
                });
                Toast.fire({
                  type: 'success',
                  title: "Folder added successful!"
                });
                this.router.navigate(['folderList']);
              }
            //})
          } else {
            //onBookmarkDeleted(createFolder["id"]);
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
          //onBookmarkDeleted(createFolder["id"]);
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
          });
          Toast.fire({
            type: 'error',
            title: "Something went wrong!"
          });
        })
      }
      /* To add new user end*/

      /* To update user start*/
      else if (this.folderMode == "edit") {
        if (this.editRemoveRow == true) {
          var id = this.editRemoveArray[this.editRemoveIteration]._id;
          this.apiService.removeFolderRow(id, this.token).subscribe((response: any) => {
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
          var username = "";
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
          username = this.arrayValue[i].dataModel;
          valueArray["name"] = username;
          valueArray["folderName"] = this.foldername;
          valueArray["permission"] = permission;
          if (this.valueArray.length >= numberIteration) {
            valueArray["_id"] = this.valueArray[i].folder_id;
          }
          this.folderArray.push(valueArray);
        }
        var folderarray = this.folderArray
        var data = {
          folderarray,
        }
        this.apiService.updateFolder(data, this.token).subscribe((response: any) => {
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
              title: "Folder Updated successful!"
            });
            this.router.navigate(['folderList']);
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
            title: "Something went wrong!"
          });
        })
      }
    } else {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      });
      Toast.fire({
        type: 'error',
        title: "Please write folder name!"
      });
    }
  }

  selectionChanged(e) {
    this.dataModel = e.value;
  }

  cancel() {
    this.router.navigate(['folderList']);
  }
}