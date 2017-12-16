import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

import { KaraokeService, Song } from '../../../lib/karaoke.service';
import { VoiceService } from '../services/voice.service';

const WAIT_TIME = 30;

@Component({
  selector: 'karaoke-next-song',
  styleUrls: ['./next-song.component.css'],
  templateUrl: 'next-song.component.html',
})
export class NextSongComponent {
  private queueSub: Subscription;
  private song: Song;
  private time: number;
  private timeSub: Subscription;

  constructor(
    private karaoke: KaraokeService,
    private router: Router,
    private voice: VoiceService,
  ) {}

  ngOnInit() {
    this.time = WAIT_TIME;
    this.queueSub = this.karaoke.songQueue.subscribe((queue: Array<Song>) => this.processQueue(queue));
  }

  ngOnDestroy() {
    this.queueSub.unsubscribe();
    if (this.timeSub) this.timeSub.unsubscribe();
  }

  private decreaseTime() {
    this.time--;

    if (this.time < 0) {
      this.router.navigateByUrl('/player');
    }
  }

  private processQueue(queue: Array<Song>) {
    if (queue.length > 0) {
      console.log('queue', queue[0]);
      console.log('song', this.song);
      if (!this.song) {
        // Show the song we are waiting for
        this.song = queue[0];
        this.timeSub = Observable.interval(1000).subscribe(() => this.decreaseTime());
        this.voice.nextSong(this.song.userName, this.song.name);
      } else if(this.song.id !== queue[0].id) {
        // The song has been cancelled, reload the component
        window.location.reload();
      }
    } else {
      // No songs left, go to the idle screen
      this.router.navigateByUrl('/idle');
    }
  }
}
