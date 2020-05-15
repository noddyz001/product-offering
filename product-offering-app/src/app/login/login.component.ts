import { Component, OnInit } from '@angular/core';
import { Validators,FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  formErrors = {
    'mobileNo': [],
    'Password': [],
    
  };
  validationMessages = {
    'mobileNo': {
      'pattern': 'Enter only numbers',
      'required': 'Mobile No is required.',
      'minlength': 'Minimum 10 digits',
      'maxlength': 'Maximum 10 digits'
    },
    
    'Password': {
      'required': 'Password is required.'
    },
  }
  constructor(private router:Router) {
    this.loginForm = new FormGroup({
      mobileNo: new FormControl('', Validators.compose([
        Validators.pattern('^\\d+$'),
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
      ])),
      Password: new FormControl('', Validators.compose([
        Validators.required
      ])),
    });
    this.loginForm.valueChanges.subscribe(data => this.onValueChanged(data));    
   }

  ngOnInit(): void {
  }

  onValueChanged(data) {
    //console.log(data);
    if (!this.loginForm) {
      return;
    }
    const form = this.loginForm;
    for (const field in this.formErrors) {

      // clear previous error message
      this.formErrors[field] = [];
      this.loginForm[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        // console.log(control);
        const messages = this.validationMessages[field];

        for (const key in control.errors) {

          this.formErrors[field].push(messages[key]);
        }
      }
    }
  }

  async checkUserAuthentication()
  {

  }

  navigateToUserRegistration(){
    this.router.navigate(['/register']);
  }
}
