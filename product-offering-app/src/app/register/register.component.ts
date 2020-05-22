import { Component, OnInit } from '@angular/core';
import { Validators,FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import {ProductApiService} from '../services/product-api.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  public signUpFormData:any;
  signUpForm: FormGroup;
  formErrors = {
    'mobileNo': [],
    'firstName': [],
    'email': [],
    'Password': [],
    'confirmPassword': []
};
  validationMessages = {
    'firstName': {
      'maxlength': 'Maximum length 20 characters',
      'required':'Username is required.'
    },
    'Password': {
      'required': 'Password is required.',
      'minlength':'Minimum length 7 characters'
    },
    'confirmPassword':{
      'required': 'Confirm password is required.',
       'validateEqual': 'Password mismatch'
    },
    'mobileNo':{
    'required': 'Phone no is required.',
     'minlength': 'Minimum 10 digits',
     'maxlength': 'Maximum 10 digits',
     'pattern': 'Enter only numbers'
    },
    'email':{
    'required': 'Email id is required.',
     'pattern': 'Enter a valid email.'
    }
  }
  constructor(private formBuilder: FormBuilder,private api:ProductApiService) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      mobileNo: new FormControl('', Validators.compose([
        Validators.pattern('^\\d+$'),
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ])),
      firstName: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(20)
      ])),
      lastName: new FormControl(''),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)@([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)[\\.]([a-zA-Z]{2,9})$')
      ])),
      Password: new FormControl('',Validators.compose([
        Validators.required,
        Validators.minLength(7)
       ])),
      confirmPassword: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });
    this.signUpForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data?: any) {
    if (!this.signUpForm) { return; }
    const form = this.signUpForm;
    for (const field in this.formErrors) {
      // clear previous error message
      this.formErrors[field] = [];
      this.signUpForm[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field].push(messages[key]);
        }
      }
    }
  }


  async signUpUser(data)
  {
    if(this.signUpForm.valid)
    {
        //console.log(encryptPassword);
    this.api.signUp({
      "mobileNo": data.mobileNo,
      "email": data.email,
      "password": data.Password,
      "firstName": data.firstName,
      "lastName": data.lastName
     
    }).subscribe((data:any)=>{
      console.log(data);
      if(data.success=='success'){
   
        
        alert('User Successfully Created'); 
       
         }
           else{
            
            alert(data.commandsummary); 
           }
        },
        //data success ends
        (error:any) => {
         
        });
      }
     }

   
}
