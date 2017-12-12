/// <reference path="./responsive-voice.d.ts" />

import { Injectable } from '@angular/core';

@Injectable()
export class VoiceService {
  speak(text: string) {
    responsiveVoice.speak(text);
  }
}
