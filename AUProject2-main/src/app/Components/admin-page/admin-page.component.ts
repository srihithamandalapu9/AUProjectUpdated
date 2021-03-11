import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryPassingService } from 'src/app/category-passing.service';
import { GetReportedService } from 'src/app/get-reported.service';
import { GetVideosService } from 'src/app/get-videos.service';
import { Category } from '../Model/Category';
import { UnApprovedVideos } from '../Model/UnApprovedVideos';
import { Video } from '../Model/Video';
import { ReportedVideos } from '../Model/ReportedVideos';
import { ReportedComments } from '../Model/ReportedComments';
import { SignInService } from 'src/app/sign-in.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
})
export class AdminPageComponent implements OnInit {
  clicked = true;
  clickedOn = 'Home';
  length!: boolean;
  categoryVideos!: Array<Video>; //Make a call to fetch videos
  category_list: any[] = [];
  reportedVideos!: Array<ReportedVideos>;
  reportedComments!: Array<ReportedComments>;
  unApprovedVideos!: Array<UnApprovedVideos>;
  allVideos!: Array<Video>;
  lengthOfreportedComments!: number;
  lengthOfreportedVideos!: number;
  lengthOfunApprovedVideos!: number;
  lengthOfAllVideos!: number;
  clickedView!: number;
  userId: number;

  constructor(
    private http: HttpClient,
    private router: Router,
    private categoryserviceobj: CategoryPassingService,
    private reported: GetReportedService,
    private getVideos: GetVideosService,
    private signinservice: SignInService
  ) {}
  toggleClick = () => {
    this.clicked = !this.clicked;
  };

  displayCatVideos(categoryId: any) {
    console.log(categoryId);
    this.getVideos.getVideoCategory(categoryId).subscribe((catVideos) => {
      this.categoryVideos = catVideos;
      console.log(this.categoryVideos);
      if (this.categoryVideos.length > 0) {
        this.length = true;
      }
    });
  }
  logout() {
    this.router.navigate([''], { replaceUrl: true });
  }

  displayReportedVideos() {
    this.reported.getReportedVideos().subscribe((reportedVids) => {
      this.reportedVideos = reportedVids;

      this.lengthOfreportedVideos = reportedVids.length;
    });
  }
  displayReportedComments() {
    this.reported.getReportedComments().subscribe((reportedCommentsData) => {
      this.reportedComments = reportedCommentsData;
      this.lengthOfreportedComments = this.reportedComments.length;
      console.log(this.reportedComments);
    });
  }

  adminUpload() {
    this.router.navigateByUrl(`/my-video/${this.userId}`);
  }

  displayUnApprovedVideos() {
    this.reported.getUnApprovedVideos().subscribe((unApprovedVideoData) => {
      this.unApprovedVideos = unApprovedVideoData;
      this.lengthOfunApprovedVideos = unApprovedVideoData.length;
      console.log('in unapproved..');
      console.log(this.unApprovedVideos);
    });
  }

  displayAllVideos() {
    this.getVideos.getAllVideos().subscribe((AllVideos) => {
      this.allVideos = AllVideos;
      console.log('Inside all videos', this.allVideos);
      this.lengthOfAllVideos = AllVideos.length;
    });
  }

  changeView(view: string): void {
    this.clickedOn = view;
    console.log(this.clickedOn);
  }

  changeCategory(categoryView: string, categoryId: number): void {
    this.clickedOn = categoryView;
    this.displayCatVideos(categoryId);
  }

  uploadVideoAdmin() {
    this.router.navigateByUrl(`/add-video/${this.userId}`);
  }

  ngOnInit(): void {
    this.categoryserviceobj
      .getAllCategory()
      .subscribe((data: Array<Category>) => {
        data.forEach((item) => {
          if (
            item.categoryName !== 'DEFAULT' &&
            item.categoryName !== 'All Category'
          ) {
            this.category_list.push(item);
          }
        });
      });

    this.signinservice.userId.subscribe((data) => {
      this.userId = +data;
    });

    this.displayAllVideos();
    this.displayReportedComments();
    this.displayReportedVideos();
    this.displayUnApprovedVideos();
  }
}
