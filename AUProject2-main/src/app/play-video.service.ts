import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlayVideoService {
  constructor(private http: HttpClient) {}

  playVideo(videoId: any): Observable<any> {
    console.log('In playing videoService-> checking Play');
    const videoReturn = this.http.get<any>(
      `http://localhost:8080/play/${videoId}`
    );
    console.log(videoReturn);
    return videoReturn;
  }
}
