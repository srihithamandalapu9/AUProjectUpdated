import { SignUpService } from './../../sign-up.service';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  userForm: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    emailId: new FormControl(' ', Validators.required),
  });

  constructor(
    http: HttpClient,
    private signupservice: SignUpService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  user: any;

  get firstName() {
    return this.userForm.get('firstName');
  }

  get lastName() {
    return this.userForm.get('lastName');
  }

  get emailId() {
    return this.userForm.get('emailId');
  }

  get password() {
    return this.userForm.get('password');
  }

  CallSignUp() {
    console.log(this.userForm.value);
    this.user = this.userForm.value;
    this.user.isadmin = 'No';

    this.signupservice.SignUpUser(this.user).subscribe((response) => {
      console.log(response);
      console.log('User created');
    });
    alert('Hurray !,You have succesfully created an account');
    this.router.navigateByUrl('/signin');
  }
}
