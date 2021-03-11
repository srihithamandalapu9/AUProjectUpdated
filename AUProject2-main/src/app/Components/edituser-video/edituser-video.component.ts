import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddVideoService } from 'src/app/add-video.service';
import { PlayVideoService } from 'src/app/play-video.service';

@Component({
  selector: 'app-edituser-video',
  templateUrl: './edituser-video.component.html',
  styleUrls: ['./edituser-video.component.css'],
})
export class EdituserVideoComponent implements OnInit {
  userForm: any;
  videoId!: number;
  videoDesc: any;
  videoTitle: any;
  editBody: any;
  videoObject: any;
  viTitle: string;
  viOld: string;
  viDesc: string;
  viCat: string;
  edited: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private addVideoService: AddVideoService,
    private _Activatedroute: ActivatedRoute,
    private playVideoService: PlayVideoService
  ) {
    this.userForm = this.formBuilder.group({
      vTitle: [''],
      vDesc: [''],
    });
  }

  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe((params) => {
      this.videoId = (params.get('videoId') as unknown) as number;
    });

    this.playVideoService.playVideo(this.videoId).subscribe((data) => {
      this.videoObject = data;
      this.viTitle = this.videoObject.videoTitle;
      this.viOld = this.videoObject.videoLink;
      this.viDesc = this.videoObject.videoDesc;
    });
  }

  saveVideo() {
    console.log('title', this.userForm.value.vTitle);
    this.videoDesc = this.userForm.value.vDesc;
    this.videoTitle = this.userForm.value.vTitle;
    this.editBody = {
      videoDesc: this.videoDesc,
      videoTitle: this.videoTitle,
    };
    this.addVideoService
      .editVideos(this.videoId, this.editBody)
      .subscribe((response) => {
        console.log(response);
        console.log('Video Edited');
        this.edited = 1;
      });
  }
}
