import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

import { KaraokeService, Song } from '../../../lib/karaoke.service';

const WAIT_TIME = 30;

@Component({
  selector: 'karaoke-next-song',
  styleUrls: ['./next-song.component.css'],
  templateUrl: 'next-song.component.html',
})
export class NextSongComponent {
  private song: Song;
  private time: number = 0;
  private timer: Subscription;

  constructor(private karaoke: KaraokeService, private router: Router) {}

  ngOnInit() {
    this.time = WAIT_TIME;
    this.karaoke.songQueue.subscribe((queue: Array<Song>) => {
      if (queue.length > 0) {
        this.song = queue[0];
        this.timer = Observable.interval(1000).subscribe(() => this.decreaseTime());
      } else {
        this.router.navigateByUrl('/idle');
      }
    });
  }

  ngOnDestroy() {
    if (this.timer) this.timer.unsubscribe();
  }

  private decreaseTime() {
    this.time--;

    if (this.time < 0) {
      this.router.navigateByUrl('/player');
    }
  }
}
