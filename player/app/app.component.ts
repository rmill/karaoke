import { Component } from '@angular/core';
import YouTubePlayer from 'youtube-player';

import { KaraokeService } from './services/karaoke.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    player: any;

    constructor(private karaoke: KaraokeService) {}

    ngOnInit() {
      this.player = YouTubePlayer('player');
      this.karaoke.getSongQueue().subscribe((resp) => console.log(resp));
    }
}
