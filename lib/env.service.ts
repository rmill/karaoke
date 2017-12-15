import { Injectable } from '@angular/core';

@Injectable()
export class EnvService {
  private env: any = {};

  get(value: string): any {
    return this.env[value];
  }

  setEnv(env: any) {
    this.env = env;
  }
}
