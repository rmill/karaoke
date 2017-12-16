import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../../../lib/auth.service';
import { KaraokeService, Song } from '../../../lib/karaoke.service';

@Component({
  selector: 'karaoke-list',
  templateUrl: 'list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  private isInit: boolean = false;
  private queueSub: Subscription;
  private skipPending: boolean = false;
  private songs: Array<Song>;
  private yourSong: Song;

  constructor(private auth: AuthService, private karaoke: KaraokeService) {}

  ngOnInit() {
    this.queueSub = this.karaoke.songQueue.subscribe((queue: Array<Song>) => this.processQueue(queue));
  }

  ngOnDestroy() {
    this.queueSub.unsubscribe();
  }

  private hasSong(): boolean {
    if (this.auth.user.isHost) return false;
    return Boolean(this.yourSong);
  }

  private hasSongText(): string {
    let songsBeforeYou: number = 0;
    for (let song of this.songs) {
      if (song.userId === this.auth.user.token) break;
      songsBeforeYou++;
    }

    switch(songsBeforeYou) {
      case 0: return 'YOU\'RE UP!';
      case 1: return 'YOU\'RE UP NEXT!';
      case 2:
      case 3: return 'HEAD DOWNSTAIRS. YOU\'RE UP SOON';
      default: return `YOU'RE UP IN ABOUT ${songsBeforeYou * 3} MINUTES`
    }
  }

  private processQueue(queue: Array<Song>) {
    let yourSong = null;
    for (let song of queue) {
      if (song.userId === this.auth.user.token) yourSong = song;
    }
    this.yourSong = yourSong;
    this.songs = queue;
    this.isInit = true;
  }

  private showSkip() {
    return !this.skipPending && this.auth.user.isHost && this.songs.length > 0;
  }

  private skip() {
    this.skipPending = true;
    this.karaoke.next();
    setTimeout(() => this.skipPending = false, 3000);
  }
}
