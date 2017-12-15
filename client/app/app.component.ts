import { Component } from '@angular/core';

import { environment } from '../environments/environment';
import { EnvService } from '../../lib/env.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private env: EnvService) {
    env.setEnv(environment);
  }
}
