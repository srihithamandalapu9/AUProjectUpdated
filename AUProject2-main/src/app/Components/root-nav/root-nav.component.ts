import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CategoryPassingService } from '../../category-passing.service';
import { Router } from '@angular/router';
import { Category } from '../Model/Category';
import { SignInService } from './../../sign-in.service';
import { GetVideosService } from './../../get-videos.service';

@Component({
  selector: 'app-root-nav',
  templateUrl: './root-nav.component.html',
  styleUrls: ['./root-nav.component.css'],
})
export class RootNavComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private serviceObj: CategoryPassingService,
    private router: Router,
    private signinserviceobj: SignInService,
    private getVideoService: GetVideosService
  ) {}

  categoryPresent = 'All Category';
  userId!: Number;
  category_list: Array<Category> = [];
  categoryId!: number;

  sendCategory(name: string) {
    console.log('in root nav', name);
    this.categoryPresent = name;
    this.serviceObj.emit<string>(name);
    this.category_list.forEach((data) => {
      if (data.categoryName === name) {
        this.categoryId = data.categoryId;
      }
    });
    this.router.navigate([`/video-category/${this.userId}/${this.categoryId}`]);
    console.log('sending click in root-nav');
    this.getVideoService.sendClickEvent();
  }

  ngOnInit() {
    localStorage.setItem('userId', this.userId + '');
    this.signinserviceobj.userId.subscribe((data) => {
      this.userId = data;
      console.log('in video cat user Id', data);
      console.log(`/video-category/${this.userId}/${this.categoryId}`);
    });

    this.serviceObj
      .getSubscribedCategory(this.userId)
      .subscribe((data: any) => {
        data.forEach((item) => {
          if (item.categoryName != null && item.categoryName != 'DEFAULT') {
            this.category_list.push(item);
          }
        });
        console.log(this.category_list);
      });
  }

  modifySubscription() {
    this.router.navigateByUrl(`/subscribed/${this.userId}`);
  }

  addVideo() {
    this.router.navigateByUrl(`/add-video/${this.userId}`);
  }

  myVideo() {
    this.router.navigateByUrl(`/my-video/${this.userId}`);
  }

  logOut() {
    this.router.navigate([''], { replaceUrl: true });
  }
}
