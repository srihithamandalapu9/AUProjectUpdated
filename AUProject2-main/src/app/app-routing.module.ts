import { HomePageComponent } from './Components/home-page/home-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './Components/signin/signin.component';
import { SignupComponent } from './Components/signup/signup.component';
import { RootNavComponent } from './Components/root-nav/root-nav.component';
import { VideoCategoryComponent } from './Components/video-category/video-category.component';
import { ViewVideoComponent } from './Components/view-video/view-video.component';
import { AdminPageComponent } from './Components/admin-page/admin-page.component';
import { SubscribedComponent } from './Components/subscribed/subscribed.component';
import { AddVideoComponent } from './Components/add-video/add-video.component';
import { MyVideoComponent } from './Components/my-video/my-video.component';
import { EdituserVideoComponent } from './Components/edituser-video/edituser-video.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'root-nav', component: RootNavComponent },
  { path: 'video-category/:userId/:catId', component: VideoCategoryComponent },
  { path: 'view-video/:videoId/:userId', component: ViewVideoComponent },
  { path: 'admin-page', component: AdminPageComponent },
  { path: 'subscribed/:userId', component: SubscribedComponent },
  { path: 'add-video/:userId', component: AddVideoComponent },
  { path: 'my-video/:userId', component: MyVideoComponent },
  {
    path: 'edituser-video/:videoId/:userId',
    component: EdituserVideoComponent,
  },
  { path: 'admin-page', component: AdminPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
