import { Router } from '@angular/router';
import { SignInService } from './../../sign-in.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialUser,
} from 'angularx-social-login';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  userForm!: FormGroup;
  loginForm!: FormGroup;
  UserData!: FormGroup;
  socialUser!: SocialUser;
  isLoggedin: boolean = false;
  user!: ' ';

  constructor(
    private formBuilder: FormBuilder,
    private socialAuthService: SocialAuthService,
    http: HttpClient,
    private signinservice: SignInService,
    private router: Router
  ) {}

  CallSignIn() {
    console.log(this.userForm.value);

    this.signinservice.SignInUser(this.userForm.value).subscribe(
      (response) => {
        console.log(response);
        console.log(response.id);
        this.signinservice.emitUserId(response.id);

        if (response.isadmin === 'Yes') {
          this.router.navigateByUrl('/admin-page');
        } else if (
          this.userForm.value.emailId === response.emailId &&
          this.userForm.value.password === response.password
        ) {
          this.router.navigateByUrl(`/video-category/${response.id}/99`);
          this.signinservice.emitUserId(response.id);
          console.log('emitted user id : ', response.id);
        }
      },
      (error) => {
        alert('Invalid Username or Password');
        console.error('Invalid Username or Password');
      }
    );
  }
  get emailId() {
    return this.userForm.get('emailId');
  }

  get password() {
    return this.userForm.get('password');
  }
  ngOnInit() {
    this.userForm = new FormGroup({
      emailId: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
    });

    this.UserData = new FormGroup({
      emailId: new FormControl('', Validators.email),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
    });

    this.loginForm = this.formBuilder.group({
      emailId: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      console.log(this.socialUser);
      this.isLoggedin = user != null;
      this.UserData.value.emailId = this.socialUser.email;
      this.UserData.value.firstName = this.socialUser.firstName;
      this.UserData.value.lastName = this.socialUser.lastName;
      console.log(this.UserData.value);
      this.signinservice.SignInUser(this.UserData.value).subscribe(
        (response) => {
          console.log('response', response);
          if (this.isLoggedin) {
            this.router.navigateByUrl(`/video-category/${response.id}/99`);
          }
        },
        (error) => console.error('error', error)
      );
    });
  }

  logOut(): void {
    this.socialAuthService.signOut();
  }
}
