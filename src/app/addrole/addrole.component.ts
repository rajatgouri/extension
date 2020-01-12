import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-addrole',
  templateUrl: './addrole.component.html',
  styleUrls: ['./addrole.component.css']
})
export class AddroleComponent implements OnInit {
value;
isSubmitted;
myForm;
  constructor(public fb: FormBuilder) {
  }

  /*########### Template Driven Form ###########*/
  registrationForm = this.fb.group({
    Access: ['Read']
  })

  // Submit Registration Form
  onSubmit() {
  }  

  ngOnInit() {
  }

}
