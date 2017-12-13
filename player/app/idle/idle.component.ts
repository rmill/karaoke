import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { KaraokeService, Song } from '../../../lib/karaoke.service';

@Component({
  selector: 'karaoke-idle',
  styleUrls: ['./idle.component.css'],
  templateUrl: 'idle.component.html',
})
export class IdleComponent {
    private queueSub: Subscription;

    constructor(private karaoke: KaraokeService, private router: Router) {}

    ngOnInit() {
      this.queueSub = this.karaoke.songQueue.subscribe((queue) => this.onQueueChange(queue));
    }

    ngOnDestroy() {
      this.queueSub.unsubscribe();
    }

    private onQueueChange(queue: Array<Song>) {
      if (queue.length > 0) {
        this.router.navigateByUrl('/next-song');
      }
    }
}
