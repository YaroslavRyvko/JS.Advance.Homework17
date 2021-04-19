import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBlogs, IUsers } from '../interfaces/add-data.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {
  private urlBlog: string;
  private urlUser: string;
  constructor(private http: HttpClient) {
    this.urlBlog = 'http://localhost:3000/blogs';
    this.urlUser = 'http://localhost:3000/users';
  }

  getJSONUser(): Observable<Array<IUsers>> {
    return this.http.get<Array<IUsers>>(this.urlUser);
  }

  postJSONUser(newUser: IUsers): Observable<IUsers> {
    return this.http.post<IUsers>(this.urlUser, newUser);
  }
  getJSONBlogs(): Observable<Array<IBlogs>> {
    return this.http.get<Array<IBlogs>>(this.urlBlog)
  }
  postJSONBlog(newBlog: IBlogs): Observable<IBlogs> {
    return this.http.post<IBlogs>(this.urlBlog, newBlog);
  }
  deleteJSON(id: number | string): Observable<IBlogs> {
    return this.http.delete<IBlogs>(`${this.urlBlog}/${id}`)
  }

  editJSON(editBlog: IBlogs): Observable<IBlogs> {
    return this.http.put<IBlogs>(`${this.urlBlog}/${editBlog.id}`, editBlog);
  }

}

