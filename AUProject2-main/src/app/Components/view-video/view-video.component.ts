import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PlayVideoService } from '../../play-video.service';
import { GetVideosService } from 'src/app/get-videos.service';
import { GetReportedService } from 'src/app/get-reported.service';
import { GetCommentsService } from '../../get-comments.service';

@Component({
  selector: 'app-view-video',
  templateUrl: './view-video.component.html',

  styleUrls: ['./view-video.component.css'],
})
export class ViewVideoComponent implements OnInit {
  numberOfLikes: number = 0;
  comment: any;
  commentValue: string[];
  commentName: string[];
  cID: number[];
  commentArray = [];
  reportedComments = [];
  userId?: number;

  userForm: any;
  videoIdPlaying: number = 11;
  videoObject: any;
  reported: boolean = false;
  constructor(
    private router: Router,
    private _Activatedroute: ActivatedRoute,
    private getVideoService: GetVideosService,
    private playVideoService: PlayVideoService,
    private getReportedService: GetReportedService,
    private getCommentsService: GetCommentsService,
    private formBuilder: FormBuilder
  ) {
    this.userForm = this.formBuilder.group({
      comment: [''],
    });
  }

  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe((params) => {
      this.videoIdPlaying = (params.get('videoId') as unknown) as number;
      this.userId = (params.get('userId') as unknown) as number;
    });

    this.getReportedService.getReportedComments().subscribe((data) => {
      this.reportedComments = data;
    });

    this.playVideoService.playVideo(this.videoIdPlaying).subscribe((data) => {
      this.videoObject = data;
      console.log('video object', this.videoObject);
      console.log('VideoLink', this.videoObject.videoLink);
      this.numberOfLikes = this.videoObject.like.length;
      this.commentValue = this.videoObject.commentMade;
      this.commentName = this.videoObject.name;
      this.cID = this.videoObject.cID;
      for (let i = 0; i < this.commentValue.length; i++) {
        this.commentArray.push({
          value: this.commentValue[i],
          name: this.commentName[i],
          id: this.cID[i],
        });
      }
      console.log(this.commentArray);
    });

    this.getReportedService.getReportedVideos().subscribe((data) => {
      data.forEach((element: { videoId: number }) => {
        if (this.videoIdPlaying == element.videoId) {
          this.reported = true;
          alert('This video has been reported ....!');
        }
      });
    });
  }

  likeButtonClick() {
    this.getVideoService
      .likeVideo(this.videoIdPlaying, this.userId)
      .subscribe((data: number) => {
        console.log('liked video');
        this.numberOfLikes = data;
      });
  }

  reportVideo() {
    this.getReportedService.getReportedVideos().subscribe((data) => {
      data.array.forEach((element: { videoId: number }) => {
        if (this.videoIdPlaying == element.videoId) {
          this.reported = true;
          return;
        }
      });
    });

    this.getVideoService
      .reportVideo(this.videoIdPlaying, this.userId!)
      .subscribe((data: any) => {
        console.log(data);
        this.reported = true;
      });
  }

  addToComments() {
    this.comment = {
      commentDesc: this.userForm.value.comment,
    };
    console.log('in addToComment', this.comment);
    this.getCommentsService
      .addComment(this.videoIdPlaying, this.userId, this.comment)
      .subscribe((response) => {
        console.log(response);
        console.log('comment added');
      });

    this.playVideoService.playVideo(this.videoIdPlaying).subscribe((data) => {
      this.videoObject = data;
      this.commentValue = this.videoObject.commentMade;
      this.commentName = this.videoObject.name;
      this.cID = this.videoObject.cID;
      for (let i = 0; i < this.commentValue.length; i++) {
        this.commentArray.push({
          value: this.commentValue[i],
          name: this.commentName[i],
          id: this.cID[i],
        });
      }
      console.log(this.commentArray);
    });
  }

  reportComment(commentId) {
    this.getReportedService
      .reportComment(commentId, this.userId)
      .subscribe((data) => {
        console.log(commentId, ' Reported');
      });
  }
}
