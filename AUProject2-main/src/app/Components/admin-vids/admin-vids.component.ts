import { UnApprovedVideos } from './../Model/UnApprovedVideos';
import { ReportedVideos } from './../Model/ReportedVideos';
import { Video } from './../Model/Video';
import { Component, Input, OnInit } from '@angular/core';
import { CategoryPassingService } from 'src/app/category-passing.service';
import { ReportedComments } from '../Model/ReportedComments';
import { Category } from '../Model/Category';
import { ApproveService } from 'src/app/approve.service';
import { SignInService } from 'src/app/sign-in.service';

@Component({
  selector: 'app-admin-vids',
  templateUrl: './admin-vids.component.html',
  styleUrls: ['./admin-vids.component.css'],
})
export class AdminVidsComponent implements OnInit {
  @Input()
  reportedVideos!: Array<ReportedVideos>;
  @Input()
  reportedComments!: Array<ReportedComments>;
  @Input()
  unApprovedVideos!: Array<UnApprovedVideos>;
  @Input()
  clickedOn!: string;
  @Input()
  clickedView!: number;
  @Input()
  lengthOfreportedComments!: number;
  @Input()
  lengthOfreportedVideos!: number;
  @Input()
  lengthOfunApprovedVideos!: number;
  @Input()
  allVideos!: Array<Video>;
  @Input()
  lengthOfAllVideos!: number;
  @Input()
  categoryVideos!: Array<Video>;
  category_list!: Array<Category>;
  userId!: number;

  constructor(
    private categoryserviceobj: CategoryPassingService,
    private approveservice: ApproveService,
    private signinservice: SignInService
  ) {}

  approveVideo(videoId: any) {
    this.approveservice.approveVideo(videoId).subscribe((response) => {
      alert('Video has been Approved');
    });
  }

  deleteVideo(videoId: any) {
    this.approveservice.unApproveVideos(videoId).subscribe((response) => {
      alert('Video has been UnApproved');
    });
  }
  ngOnInit(): void {
    setTimeout(() => {
      console.log('In admin-vids', this.allVideos);
    }, 2000);

    this.signinservice.userId.subscribe((data) => {
      this.userId = +data;
    });
    console.log(this.category_list);
    this.categoryserviceobj
      .getAllCategory()
      .subscribe((data: Array<Category>) => {
        this.category_list = data;
      });
  }
}
