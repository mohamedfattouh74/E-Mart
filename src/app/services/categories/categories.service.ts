import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}
  baseUrl = 'http://localhost:3000/categories';

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(this.baseUrl);
  }
}
