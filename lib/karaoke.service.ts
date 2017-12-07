import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class KaraokeService {
  readonly songQueue: Observable<Array<Song>>;

  private queue: Array<Song> = [];
  private songQueueSubject = new BehaviorSubject<Array<Song>>([]);

  constructor(private http: HttpClient) {
    this.songQueue = this.songQueueSubject.asObservable();

    // Poll the song queue and emit when it changes
    Observable.interval(5000)
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
    this.http.post('http://localhost:3000/next', null).subscribe(() => null);
  }

  /**
   * Add a song to the queue
   */
  public queueSong(song: Song) {
    return this.http.post('http://localhost:3000/song', song);
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
}
