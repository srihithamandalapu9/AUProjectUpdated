import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubscribeService {
  constructor(private http: HttpClient) {}

  getSubscribedDetails(userId: number): Observable<any> {
    return this.http.get<any>(
      `http://localhost:8080/getSubscribedDetails/${userId}`
    );
  }

  subscribeVideos(catName: string, userId: number): Observable<any> {
    return this.http.post<any>(
      `http://localhost:8080/subscribe/${catName}/${userId}`,
      {}
    );
  }
}
