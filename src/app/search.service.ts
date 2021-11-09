import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';


import { Observable } from 'rxjs';


import { Profile } from './search/profile';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  searchUrl = 'http://localhost:3000/profiles';  // URL to web api
  constructor(
    private http: HttpClient) {

  }
   /* GET Profile contains the term in any attribute value */
   searchProfiles(term: string): Observable<Profile[]> {
    term = term.trim();

    const options = term ?
     { params: new HttpParams().set('q', term) } : {};

    return this.http.get<Profile[]>(this.searchUrl, options);
  }
}
