import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApproveService {
  constructor(private http: HttpClient) {}

  approveVideo(videoId: any): Observable<any> {
    return this.http.post(`http://localhost:8080/approveVid/${videoId}`, {});
  }

  unApproveVideos(videoId: any): Observable<any> {
    return this.http.post(
      `http://localhost:8080/deleteVid/${videoId}`,
      videoId
    );
  }
}
