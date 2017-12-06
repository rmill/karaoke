import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class KaraokeService {
  constructor(private http: HttpClient) {}

  getSongQueue() {
    return this.http.get('http://localhost:3000/songs');
  }
}
