import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { KaraokeService, Song } from '../../../lib/karaoke.service';

@Component({
  selector: 'karaoke-list',
  templateUrl: 'list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  songs: Array<Song>;

  constructor(private karaoke: KaraokeService) {}

  ngOnInit() {
    this.karaoke.songQueue.subscribe((queue: Array<Song>) => this.songs = queue);
  }
}
