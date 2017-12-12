import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { IdleComponent } from './idle/idle.component';
import { NextSongComponent } from './next-song/next-song.component';
import { PlayerComponent } from './player/player.component';
import { VoiceService } from './services/voice.service';
import { KaraokeService } from '../../lib/karaoke.service';
import { AuthService } from '../../lib/auth.service';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/idle' },
  { path: 'idle', component: IdleComponent },
  { path: 'next-song', component: NextSongComponent },
  { path: 'player', component: PlayerComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    IdleComponent,
    NextSongComponent,
    PlayerComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [ AuthService, KaraokeService, VoiceService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
