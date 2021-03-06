import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';

import { AuthService } from '../../../lib/auth.service';
import { KaraokeService, Song } from '../../../lib/karaoke.service';

@Component({
  selector: 'karaoke-search',
  templateUrl: 'search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  loading: boolean = false;
  queue: Array<Song> = [];
  queueSub: Subscription;
  searchText: string = '';
  searchSub: Subscription;
  selectedSong: Song;
  songs: Array<Result> = [];

  private searchSource: Subject<string> = new Subject<string>();

  constructor(
    private auth: AuthService,
    private karaoke: KaraokeService,
    private router: Router
  ) {
    const searchObs = this.searchSource.debounceTime(500).distinctUntilChanged();
    this.searchSub = searchObs.subscribe((searchText: string) => {
      this.karaoke.search(searchText).subscribe(
        (results) => this.processSearch(results),
        () => this.loading = false,
        () => this.loading = false
      );
    });
  }

  ngOnInit() {
    this.queueSub = this.karaoke.songQueue.subscribe((queue: Array<Song>) => this.queue = queue);
  }

  ngOnDestroy() {
    this.queueSub.unsubscribe();
  }

  private getWaitTime(): string {
    return `${this.queue.length * 3} Minutes`;
  }

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
    this.auth.setName(name);
    this.selectedSong['userName'] = name;
    this.karaoke.queueSong(this.selectedSong).subscribe(() => this.router.navigateByUrl('/list'));
  }

  private processSearch(results) {
    for (let result of results.items) {
      const song: Song = {
        name: result.snippet.title,
        thumbnail: result.snippet.thumbnails.default.url,
        userName: '',
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

    this.searchSource.next(text);
  }
}

interface Result {
  name: string;
  thumbnail: string;
  videoId: string;
}
