import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignInService {
  public userId = new BehaviorSubject<number>(1);
  constructor(private http: HttpClient) {}

  SignInUser(user: any): Observable<any> {
    return this.http.post('http://localhost:8080/login', user);
  }
  emitUserId(id: number) {
    this.userId.next(id);
  }
}
