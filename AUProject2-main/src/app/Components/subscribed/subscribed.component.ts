import { Component, OnInit } from '@angular/core';
import { SubscribeService } from '../../subscribe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-subscribed',
  templateUrl: './subscribed.component.html',
  styleUrls: ['./subscribed.component.css'],
})
export class SubscribedComponent implements OnInit {
  subscribeArray: any = [];
  userId: any;
  constructor(
    private subscribeService: SubscribeService,
    private _Activatedroute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe((params) => {
      this.userId = (params.get('userId') as unknown) as number;
    });

    this.subscribeService
      .getSubscribedDetails(this.userId)
      .subscribe((data: any) => {
        data.forEach((item: any) => {
          if (
            item.catName != null &&
            item.catName != 'DEFAULT' &&
            item.catName != 'All Category'
          ) {
            if (item.subs === false) {
              item.subs = 'Not Subscribed';
            } else {
              item.subs = 'Subscribed';
            }
            this.subscribeArray.push(item);
          }
        });
        console.log(data);
      });
  }

  subscribeVideo(catName: string) {
    this.subscribeService
      .subscribeVideos(catName, this.userId)
      .subscribe((data: any) => {
        console.log('response of subscribe call', data);
        location.reload();
      });
  }

  unSubscribeVideo(catName: string) {
    this.subscribeService
      .subscribeVideos(catName, this.userId)
      .subscribe((data: any) => {
        console.log('response of subscribe call', data);
        location.reload();
      });
  }
}
