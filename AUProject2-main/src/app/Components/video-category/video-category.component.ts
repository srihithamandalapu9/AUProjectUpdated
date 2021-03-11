import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GetVideosService } from 'src/app/get-videos.service';
import { CategoryPassingService } from '../../category-passing.service';
import { Video } from '../Model/Video';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-video-category',
  templateUrl: './video-category.component.html',
  styleUrls: ['./video-category.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class VideoCategoryComponent implements OnInit {
  categoryOnFocus = '';
  videos!: Array<Video>;
  userId!: number;
  categoryId!: number;
  user: number = 88;

  clickEventsubscription: Subscription;

  constructor(
    private _Activatedroute: ActivatedRoute,
    private serviceObj: CategoryPassingService,
    private videoobj: GetVideosService,
    private router: Router
  ) {
    this.clickEventsubscription = this.videoobj
      .getClickEvent()
      .subscribe(() => {
        this.updateDisplay();
      });
  }

  updateDisplay() {
    this.videoobj
      .getVideoCategory(this.categoryId)
      .subscribe((data: Array<Video>) => {
        this.videos = data;
        console.log(data);
      });
  }

  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe((params) => {
      this.userId = (params.get('userId') as unknown) as number;
      this.categoryId = (params.get('catId') as unknown) as number;
    });
    this.serviceObj.on<string>().subscribe((data) => {
      this.categoryOnFocus = data;
      console.log('in video cat', this.categoryOnFocus);
    });
    this.videoobj.getAllVideos().subscribe((data: Array<Video>) => {
      this.videos = data;
      console.log(data);
    });

    this.videoobj
      .getVideoCategory(this.categoryId)
      .subscribe((data: Array<Video>) => {
        this.videos = data;
        console.log(data);
      });
  }

  videoDisplay() {
    console.log('clicking');
  }
}
