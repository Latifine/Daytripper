import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TripCardComponent } from './trip-card/trip-card.component';
import { TripCardDetailComponent } from './trip-card-detail/trip-card-detail.component';
import { PlanningComponent } from './planning/planning.component';
import { ActivityComponent } from './activity/activity.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { ExploreComponent } from './explore/explore.component';
import { SignupComponent } from './signup/signup.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { ErrorComponent } from './error/error.component';
import { EditTripComponent } from './edit-trip/edit-trip.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path:"trip-card", component: TripCardComponent},
  { path:"plan", component: PlanningComponent, canActivate: [AuthGuard]},
  { path:"activity/:id", component: ActivityComponent, canActivate: [AuthGuard]},
  { path:"trip/:id", component: TripCardDetailComponent},
  { path:"profile", component: ProfileComponent, canActivate: [AuthGuard]},
  { path:"login", component: LoginComponent},
  { path:"explore", component: ExploreComponent},
  { path:"signup", component: SignupComponent},
  { path:"logout", component: LogoutComponent},
  { path:"edit/:id", component: EditTripComponent},
  {path : '**', component : ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
