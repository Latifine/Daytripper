import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Card } from '../trip-card';
import { TripCardService } from '../trip-card.service';
import { TripCardComponent } from '../trip-card/trip-card.component';
import { Trip } from '../interfaces/trip';
import { TripService } from '../services/trip.service';
import { AuthService, User } from '@auth0/auth0-angular';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, TripCardComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  trips: Trip[] = [];
  filteredTrips: Trip[] = [];
  sharedTrips: Trip[] = [];
  user: User | null = null;


  constructor(private tripService: TripService, public auth: AuthService, private router: Router) { }

  filterTrips(): Trip[] {
    return this.trips.filter((trip) => {
      const emailListExists = trip.emailList && trip.emailList.length > 0;
      const userExists = this.user && this.user.email;
  
      const emailMatches = emailListExists && userExists && trip.emailList[0].email === this.user?.email;
      
      return emailMatches && trip.isUsed;
    });
  }

  checkSharedTrips(): Trip[] {
    return this.trips.filter((trip) => {
      const emailListExists = trip.emailList && trip.emailList.length > 0;
      const userExists = this.user && this.user.email;
  
      let emailMatches: boolean = false;
      if (emailListExists && userExists) {
        for (const emailadress in trip.emailList) {
          if (trip.emailList[0].email === this.user?.email) {
            emailMatches = false;
            break;
            }
          else if (trip.emailList[emailadress].email === this.user?.email && emailadress != "0") {
            console.log(emailadress);
            emailMatches = true;
            break;
          }          
        }
      }      
      return emailMatches && trip.isUsed;
    });
  }

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.trips = navigation.extras.state['trips'];
    }
    this.auth.user$.subscribe(
      (profile) => {
        if (profile) {
          this.user = profile;
          console.log(this.user);
        }
      },
      (error) => {
        console.log(error);
      }
    );
    this.tripService.getTrips().subscribe(
      (data: Trip[]) => {        
        this.trips = data;
        this.filteredTrips = this.filterTrips();
        this.sharedTrips = this.checkSharedTrips();
        //log trips in console
        console.log(this.user?.picture);
        console.log(this.filteredTrips);
      },
      (error) => {
        console.error('Error fetching trips', error);
      }
    );
  }
}
