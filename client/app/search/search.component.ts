import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { KaraokeService, Song } from '../../../lib/karaoke.service';

@Component({
  selector: 'karaoke-search',
  templateUrl: 'search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  songs: Array<Song> = [];

  constructor(private karaoke: KaraokeService) {}

  ngOnInit() {
    this.karaoke.songQueue.subscribe((queue: Array<Song>) => this.songs = queue);
  }
}
