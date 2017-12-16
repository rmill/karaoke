/// <reference path="./responsive-voice.d.ts" />

import { Injectable } from '@angular/core';

@Injectable()
export class VoiceService {
  speak(text: string) {
    responsiveVoice.speak(text);
  }

  nextSong(userName: string, songName: string) {
    const phrases: Array<string> = [
      `Coming up next. ${userName} is singing ${songName}`,
      `Get ready for the next performer. ${userName} is gonna kill ${songName}`,
      `Our next performer is ${userName} doing their best impression of ${songName}`,
      `Welcome ${userName} to the stage. They will serenade us with ${songName}`,
      `Who does the best rendition of ${songName}? ${userName}, and they are up next`,
      `Put your hands together for ${userName} and their number one hit ${songName}`,
      `Everyone, shutup. I love this song. ${songName} by ${userName}`,
    ];
    const rand = phrases[Math.floor(Math.random() * phrases.length)];
    this.speak(rand);
  }
}
