import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthModule } from '@auth0/auth0-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { TripCardComponent } from './trip-card/trip-card.component';
import { ActivityComponent } from './activity/activity.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { ToastrModule } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { AuthHttpInterceptor } from '@auth0/auth0-angular';

const domain = environment.AUTH0_DOMAIN;
const clientId = environment.AUTH0_CLIENT_ID;

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavComponent,
    TripCardComponent,
    HttpClientModule,
    FooterComponent,
    TripCardComponent,
    ActivityComponent,
    ProfileComponent,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AuthModule.forRoot({
      domain: domain,
      clientId: clientId,
      authorizationParams: {
        //audience: environment.AUTH0_AUDIENCE,
        redirect_uri: window.location.origin
      }
      // httpInterceptor:{
      //   allowedList: [
      //     {
      //       uri: `${environment.api_url}/trip/*`,
      //       httpMethod: 'POST'
            
      //     },
      //     {
      //       uri: `${environment.api_url}/trip/*`,
      //       httpMethod: 'PUT'
            
      //     },
      //     {
      //       uri: `${environment.api_url}/trip/*`,
      //       httpMethod: 'DELETE'
            
      //     },
      //   ]
      // }
    })
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true }, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
