import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import YouTubePlayer from 'youtube-player';

import { KaraokeService, Song } from '../../../lib/karaoke.service';
import { VoiceService } from '../services/voice.service';

const NEXT_SONG_TRIGGER = 30;

@Component({
  selector: 'karaoke-player',
  styleUrls: ['./player.component.css'],
  templateUrl: 'player.component.html',
})
export class PlayerComponent {
    currentSong: Song;
    nextSong: Song;
    player: YouTubePlayer;
    queueSub: Subscription;
    timerSub: Subscription;
    timeRemaining: number = Infinity;
    target: any;

    constructor(
      private karaoke: KaraokeService,
      private router: Router,
      private voice: VoiceService,
    ) {}

    ngOnInit() {
      const options = { controls: 1, fs: 0, iv_load_policy: 3, modestbranding: 1, rel: 0, showinfo: 0 };
      this.player = YouTubePlayer('player', { playerVars: options });
      this.player.on('stateChange', (event) => this.target = event.target);
      this.player.on('error', (err) => this.onError(err));
      this.queueSub = this.karaoke.songQueue.subscribe((queue) => this.onQueueChange(queue));
      this.timerSub = Observable.interval(1000).subscribe(() => this.processTime());
    }

    ngOnDestroy() {
      this.queueSub.unsubscribe();
      if (this.timerSub) this.timerSub.unsubscribe();
    }

    private onError(err) {
      this.karaoke.next();
    }

    private onQueueChange(queue: Array<Song>) {
      if (queue.length === 0) {
        this.router.navigateByUrl('/idle');
        return;
      }

      this.nextSong = queue.length >= 2 ? queue[1] : null;

      if (!this.currentSong) {
        this.playSong(queue[0]);
        return;
      }

      if (this.currentSong.id !== queue[0].id) {
        this.router.navigateByUrl('/next-song');
      }
    }

    private playSong(song: Song) {
      this.currentSong = song;
      this.player.loadVideoById(song.videoId);
      this.player.playVideo();
    }

    private processTime() {
      if (this.target && this.target.getDuration() > 0 && this.currentSong.id) {
        this.timeRemaining = this.target.getDuration() - this.target.getCurrentTime();
        if (this.timeRemaining <= 3) {
          this.currentSong.id = null;
          this.karaoke.next();
        }
      }
    }

    private showNextSong() {
      return this.timeRemaining <= NEXT_SONG_TRIGGER && this.nextSong;
    }
}
