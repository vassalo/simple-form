import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'http://www.mocky.io/v2/5cb0cfd23100004b00e136f6';

  constructor(private http: HttpClient) { }

  register(user: any) {
    return this.http.post(this.url, user);
  }
}
