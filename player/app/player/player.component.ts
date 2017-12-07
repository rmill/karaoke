import { Component } from '@angular/core';
import { Router } from '@angular/router';
import YouTubePlayer from 'youtube-player';

import { KaraokeService, Song } from '../../../lib/karaoke.service';

const UNSTARTED = -1;
const ENDED = 0;
const PLAYING = 1;
const PAUSED = 2;
const BUFFERING = 3;
const VIDEO_QUEUED = 5;

@Component({
  selector: 'karaoke-player',
  template: '<div id="player"></div>',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent {
    player: any;
    currentSong: Song;

    constructor(private karaoke: KaraokeService, private router: Router) {}

    ngOnInit() {
      this.player = YouTubePlayer('player');
      this.player.on('stateChange', (event) => {
        if (event.data === ENDED) this.karaoke.next();
      });
      this.player.on('error', () => this.karaoke.next());
      this.karaoke.songQueue.subscribe((queue) => this.onQueueChange(queue));
    }

    private onQueueChange(queue: Array<Song>) {
      if (queue.length === 0) {
        this.router.navigateByUrl('/idle');
        return;
      }

      if (!this.currentSong || queue[0].id !== this.currentSong.id) {
        // Change the song
        this.playSong(queue[0]);
      }
    }

    private playSong(song: Song) {
      this.currentSong = song;
      this.player.loadVideoById(song.id);
      this.player.playVideo();
    }
}
