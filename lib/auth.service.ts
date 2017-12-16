import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';

@Injectable()
export class AuthService {
  public user: User;
  public name: string = '';

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.user = JSON.parse(localStorage.getItem('user'));

      if(!this.user || params.clear) {
        const token = Math.random().toString(36).replace(/[^a-z]+/g, '');
        const isHost = Boolean(params.isHost);
        this.user = { isHost, token };
        localStorage.setItem('user', JSON.stringify(this.user));
      }
    });
  }

  setName(name: string) {
    if (!this.user.isHost) this.name = name;
  }
}

interface User {
  isHost: boolean;
  token: string;
}
