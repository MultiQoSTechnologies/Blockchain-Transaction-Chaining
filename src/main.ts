import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';  // Import Angular's dynamic platform

import { AppModule } from './app/app.module';  // Import the root module of the Angular app

// Bootstrap the Angular application by dynamically loading the AppModule
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));  // Catch any errors and log them to the console
