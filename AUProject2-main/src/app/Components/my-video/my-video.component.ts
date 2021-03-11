import { Component, OnInit } from '@angular/core';
import { GetVideosService } from 'src/app/get-videos.service';

import { Video } from '../Model/Video';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-my-video',
  templateUrl: './my-video.component.html',
  styleUrls: ['./my-video.component.css'],
})
export class MyVideoComponent implements OnInit {
  videos!: Array<Video>;
  userId!: number;
  constructor(
    private _Activatedroute: ActivatedRoute,
    private videoobj: GetVideosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe((params) => {
      this.userId = (params.get('userId') as unknown) as number;
    });

    this.videoobj
      .getAllUserVideos(this.userId)
      .subscribe((data: Array<Video>) => {
        this.videos = data;
        console.log(data);
      });
  }

  deleteVideo(videoId: number) {
    console.log('In delete function', videoId);
    this.videoobj.deleteVideo(videoId).subscribe((data: any) => {
      console.log(data);
    });
  }

  editVideo(videoId: number) {
    console.log('In edit function', videoId);
    this.router.navigateByUrl(`/edituser-video/${videoId}/${this.userId}`);
  }
}
