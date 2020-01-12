import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ExpireTokenService } from '../expire-token.service';
import Swal from 'sweetalert2';
declare const onBookmarkDeleted: any;

@Pipe({
  name: 'search'
})

@Component({
  selector: 'app-folderlist',
  templateUrl: './folderlist.component.html',
  styleUrls: ['./folderlist.component.css']
})
export class FolderlistComponent implements OnInit {
  dropdownOptions: any = [];
  config;
  dataModel: any;
  token;
  Search;
  folderList: any = [];

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
    this.getFOlderList();
  }

  ngOnInit() {
  }

  addFolder() {
    localStorage.setItem("folderMode", "add");
    this.router.navigate(['addfolder']);
  }

  getFOlderList() {
    this.spinner.show();
    this.apiService.getFolder(this.token).subscribe((response: any) => {
      if (response.success == false && response.message == "Token is not valid") {
        this.spinner.hide();
        this.expireTokenService.expireToken();
      } else {
        setTimeout(() => {
          var result = response.result;
          this.dropdownOptions = response.result;
          /* for (let i = 0; i < result.length; i++) {
            var folder = result[i];
            result["dataModel"] = folder;
        } */
          this.folderList = response.result;
          this.spinner.hide();
        }, 1000)
        console.log(response);
      }
    }, (err) => {

    })
  }

  editFolder(val, array) {
    this.router.navigate(['addfolder']);
    localStorage.setItem("folderMode", val);
    var tempArray = JSON.stringify(array);
    localStorage.setItem("folderDetail", tempArray);
  }

  delete(array) {
    var folderName = array;
    console.log(folderName);
    console.log(array.folderDetails[0].id);
    var data = {
      folderName
    }
    this.apiService.deleteFolder(data, this.token).subscribe((response: any) => {
      if (response.success == false && response.message == "Token is not valid") {
        this.spinner.hide();
        this.expireTokenService.expireToken();
      } else if (response.responsecode == 200) {
        onBookmarkDeleted(array.folderDetails[0].id);
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });
        Toast.fire({
          type: 'success',
          title: "Folder" + " " + array + " " + "delete successfull!"
        });
        this.getFOlderList();
      }
      console.log(response);
    }, (err) => {
      console.log(err);
    })
  }

  selectionChanged(e) {
    this.dataModel = e.value;
  }

}
