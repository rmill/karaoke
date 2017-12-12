import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable()
export class KaraokeService {
  readonly songQueue: Observable<Array<Song>>;

  private headers: HttpHeaders;
  private queue: Array<Song> = [];
  private songQueueSubject = new BehaviorSubject<Array<Song>>([]);

  constructor(private http: HttpClient, private auth: AuthService) {
    this.songQueue = this.songQueueSubject.asObservable();
    this.headers = new HttpHeaders({ Authorization: JSON.stringify(this.auth.user) });

    // Poll the song queue and emit when it changes
    Observable.interval(3000)
              .flatMap(() => this.getSongQueue())
              .subscribe((queue) => this.processSongQueue(queue));
  }

  /**
   * Get the song queue
   */
  public getSongQueue(): Observable<Array<Song>> {
    return this.http.get('http://localhost:3000/songs');
  }

  /**
   * Go to the next song
   */
  public next() {
    this.http.post('http://localhost:3000/next', null, { headers: this.headers }).subscribe(() => null);
  }

  /**
   * Add a song to the queue
   */
  public queueSong(song: Song) {
    return this.http.post('http://localhost:3000/song', song, { headers: this.headers });
  }

  /**
   * Search YouTube for videos
   */
  public search(text: string) {
    const url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyDKWqWZpJd6plpFEkXWmhRypm1XA3gNm9g&q=';
    return this.http.get(url + encodeURIComponent(text));
  }

  /**
   * Only emit new queues
   */
  private processSongQueue(queue: Array<Song>) {
    if (JSON.stringify(this.queue) !== JSON.stringify(queue)) {
      this.queue = queue;
      this.songQueueSubject.next(queue);
    }
  }
}

export interface Song {
  id: string;
  name: string;
  thumbnail: string;
  user: string;
  videoId: string;
}
