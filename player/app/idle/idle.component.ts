import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { KaraokeService, Song } from '../../../lib/karaoke.service';

@Component({
  selector: 'karaoke-idle',
  template: 'WAITING',
  styleUrls: ['./idle.component.css']
})
export class IdleComponent {
    constructor(private karaoke: KaraokeService, private router: Router) {}

    ngOnInit() {
      this.karaoke.songQueue.subscribe((queue) => this.onQueueChange(queue));
    }

    private onQueueChange(queue: Array<Song>) {
      if (queue.length > 0) {
        this.router.navigateByUrl('/player');
      }
    }
}
