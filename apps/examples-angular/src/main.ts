import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import "@componentry-ui/theme/styles/light.css"
import "@componentry-ui/theme/styles/dark.css"
bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
