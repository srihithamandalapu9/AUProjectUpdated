import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AddVideoService {
  constructor(private http: HttpClient) {}

  uploadVideos(userId: number, video: any): Observable<any> {
    console.log('In add video service', userId, video);
    return this.http.post(`http://localhost:8080/upload/${userId}`, video);
  }

  editVideos(videoId: number, videoObj: any): Observable<any> {
    console.log('In add video service', videoId, videoObj);
    return this.http.post(
      `http://localhost:8080/updateVid/${videoId}`,
      videoObj
    );
  }
}
