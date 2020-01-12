import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-editrole',
  templateUrl: './editrole.component.html',
  styleUrls: ['./editrole.component.css']
})
export class EditroleComponent implements OnInit {
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

