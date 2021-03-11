import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetReportedService {
  constructor(private http: HttpClient) {}

  getReportedVideos(): Observable<any> {
    return this.http.get('http://localhost:8080/getReportedVideos');
  }

  getReportedComments(): Observable<any> {
    return this.http.get('http://localhost:8080/getReportedComments');
  }

  getUnApprovedVideos(): Observable<any> {
    return this.http.get('http://localhost:8080/UnapprovedVideos');
  }

  reportComment(commentId: number, userId: number): Observable<any> {
    return this.http.get(
      `http://localhost:8080/reportComment/${commentId}/${userId}`
    );
  }
}
