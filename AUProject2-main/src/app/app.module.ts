import { MatInputModule } from '@angular/material/input';
import { AngularMaterialModule } from './angular-material.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './Components/signin/signin.component';
import { SignupComponent } from './Components/signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RootNavComponent } from './Components/root-nav/root-nav.component';
import { VideoCategoryComponent } from './Components/video-category/video-category.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { ViewVideoComponent } from './Components/view-video/view-video.component';
import { AdminPageComponent } from './Components/admin-page/admin-page.component';
import { SubscribedComponent } from './Components/subscribed/subscribed.component';
import { AddVideoComponent } from './Components/add-video/add-video.component';
import { MyVideoComponent } from './Components/my-video/my-video.component';
import { EdituserVideoComponent } from './Components/edituser-video/edituser-video.component';
import { AdminVidsComponent } from './Components/admin-vids/admin-vids.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    HomePageComponent,
    RootNavComponent,
    VideoCategoryComponent,
    ViewVideoComponent,
    AdminPageComponent,
    SubscribedComponent,
    AddVideoComponent,
    MyVideoComponent,
    EdituserVideoComponent,
    AdminVidsComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyDLHqNoQ29KC-ows4Aa40W-tc_6DlKCbTU',
      authDomain: 'videodisplay483.firebaseapp.com',
      projectId: 'videodisplay483',
      storageBucket: 'videodisplay483.appspot.com',
    }),
    AppRoutingModule,
    NgbModule,
    SocialLoginModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    FlexLayoutModule,
    AngularMaterialModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    AngularFireModule,
    AngularFireStorageModule,
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '1098752635166-b670ulcp59u9bkaotll2tt3no0sd8fio.apps.googleusercontent.com'
            ),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
