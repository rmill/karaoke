import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { KaraokeService, Song } from '../../../lib/karaoke.service';

@Component({
  selector: 'karaoke-search',
  templateUrl: 'search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  loading: boolean = false;
  songs: Array<Result> = [];
  selectedSong: Song;
  searchText: string = '';

  constructor(private karaoke: KaraokeService, private router: Router) {}

  private hasName(name: string) {
    return name && name.trim();
  }

  private hasNoSearch() {
    return this.searchText === '';
  }

  private hasNoSongs() {
    return this.songs.length === 0 && !this.loading && !this.hasNoSearch();
  }

  private onCancel() {
    this.selectedSong = null;
  }

  private onOK(name: string) {
    this.selectedSong['userName'] = name;
    this.karaoke.queueSong(this.selectedSong).subscribe(() => this.router.navigateByUrl('/list'));
  }

  private processSearch(results) {
    for (let result of results.items) {
      const song: Song = {
        name: result.snippet.title,
        thumbnail: result.snippet.thumbnails.default.url,
        userName: 'Test User',
        videoId: result.id.videoId,
      };

      this.songs.push(song);
    }
  }

  private queueSong(song: Song) {
    this.selectedSong = song;
  }

  private search(text: string) {
    this.searchText = text;
    this.loading = true;
    this.songs = [];

    if (text === '') {
      this.loading = false;
      return;
    }

    if (text.toLowerCase().indexOf("karaoke") === -1) {
      text += ' karaoke';
    }

    this.karaoke.search(text).subscribe(
      (results) => this.processSearch(results),
      () => this.loading = false,
      () => this.loading = false
    );
  }
}

interface Result {
  name: string;
  thumbnail: string;
  videoId: string;
}
