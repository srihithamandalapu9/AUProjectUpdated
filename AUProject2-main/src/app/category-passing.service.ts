import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Category } from './Components/Model/Category';
import { Video } from './Components/Model/Video';
@Injectable({
  providedIn: 'root',
})
export class CategoryPassingService {
  public _category = new BehaviorSubject('');
  categoryId!: number;
  constructor(private http: HttpClient) {}

  emit<T>(data: string) {
    this._category.next(data);
  }

  on<T>(): Observable<string> {
    return this._category.asObservable();
  }

  getAllCategory(): Observable<Array<Category>> {
    return this.http.get<Array<Category>>('http://localhost:8080/getCategory');
  }

  getVideosByCategory(categoryId: any) {
    return this.http.get<Array<Video>>(
      `http://localhost:8080/getVideoByCat/${categoryId}`
    );
  }

  getSubscribedCategory(userId): Observable<any> {
    return this.http.get<any>(
      `http://localhost:8080/getSubscribedCategory/${userId}`
    );
  }
}
