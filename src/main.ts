import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { setUpWebBl } from './app/web-bl-main';

if (environment.production) {
  enableProdMode();
}

setUpWebBl();

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
