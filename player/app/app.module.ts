import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { IdleComponent } from './idle/idle.component';
import { PlayerComponent } from './player/player.component';
import { VoiceService } from './services/voice.service';
import { KaraokeService } from '../../lib/karaoke.service';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/idle' },
  { path: 'idle', component: IdleComponent },
  { path: 'player', component: PlayerComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    IdleComponent,
    PlayerComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [ KaraokeService, VoiceService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
