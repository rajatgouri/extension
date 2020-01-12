import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-footerbar',
  templateUrl: './footerbar.component.html',
  styleUrls: ['./footerbar.component.css']
})
export class FooterbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  userlist(){
    this.router.navigate(['userlist']);
  }
  foldderlist(){
    this.router.navigate(['folderList']);
  }
}
