import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GetCommentsService {

  constructor(private http: HttpClient) {}

  addComment(videoId : number, userId : number,commentObj : any): Observable<any> {
    console.log(`http://localhost:8080/comment/${videoId}/${userId}`,commentObj)
    return this.http.post(`http://localhost:8080/comment/${videoId}/${userId}`,commentObj)
  }

}
