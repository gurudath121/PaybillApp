import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {

  constructor(private Http:HttpClient) { }

  Autherization() {
    // let json = {username:username, password:password}
    // return this.Http.post();
    // temparory code
    // let json = {};
    // json = {
    //   token: '1d38d128-0671-4121-8084-f6332a992a40'
    // };
    // return json;
    localStorage.setItem('access-token', '1d38d128-0671-4121-8084-f6332a992a40');
  }

}
