import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../lib/auth.service';
import { KaraokeService, Song } from '../../../lib/karaoke.service';

@Component({
  selector: 'karaoke-list',
  templateUrl: 'list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  private isInit: boolean = false;
  private songs: Array<Song>;
  private yourSong: Song;

  constructor(private auth: AuthService, private karaoke: KaraokeService) {}

  ngOnInit() {
    this.karaoke.songQueue.subscribe((queue: Array<Song>) => this.processQueue(queue));
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
}
