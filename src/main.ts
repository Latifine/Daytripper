import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ApplicationConfig } from '@angular/core';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppModule } from './app/app.module';
import { provideAuth0, AuthHttpInterceptor } from '@auth0/auth0-angular';
import { environment } from './environments/environment';

const domain = environment.AUTH0_DOMAIN;
const clientId = environment.AUTH0_CLIENT_ID;

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
    provideHttpClient(withInterceptorsFromDi()),
    provideAuth0({
      domain: domain,
      clientId: clientId,
      authorizationParams: {
        redirect_uri: environment.redirectUri
      },
      httpInterceptor: {
        allowedList: [`${environment.api_url}/trip`,`${environment.api_url}/trip/*`]
      }
    }),
  ],
};