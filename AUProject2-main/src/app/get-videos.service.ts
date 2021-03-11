import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Video } from './Components/Model/Video';

@Injectable({
  providedIn: 'root',
})
export class GetVideosService {
  constructor(private http: HttpClient) {}

  getAllVideos(): Observable<Array<Video>> {
    return this.http.get<Array<Video>>('http://localhost:8080/getAllVids');
  }

  getAllUserVideos(userId: any): Observable<Array<Video>> {
    return this.http.get<Array<Video>>(
      `http://localhost:8080/getAllUserVideos/${userId}`
    );
  }

  videoId!: string;
  userId!: string;

  likeVideo(videoId: any, userId: any): Observable<any> {
    return this.http.get<any>(
      `http://localhost:8080/like/${videoId}/${userId}`
    );
  }

  getVideoCategory(catId: any) {
    return this.http.get<Array<Video>>(
      `http://localhost:8080/getVideosByCat/${catId}`
    );
  }

  private subject = new Subject<any>();
  sendClickEvent() {
    this.subject.next();
  }
  getClickEvent(): Observable<any> {
    return this.subject.asObservable();
  }

  reportVideo(videoId: number, userId: number) {
    return this.http.get<any>(
      `http://localhost:8080/reportVideo/${videoId}/${userId}`
    );
  }

  deleteVideo(videoId: number) {
    return this.http.post<any>(
      `http://localhost:8080/deleteVid/${videoId}`,
      videoId
    );
  }
}
