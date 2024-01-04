import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { S2W } from './lib/s2w';

window.s2w = new S2W();

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
