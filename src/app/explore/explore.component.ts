import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripCardComponent } from '../trip-card/trip-card.component';
import { TripService } from '../services/trip.service';
import { Trip } from '../interfaces/trip';
import { FormsModule } from '@angular/forms';
import { ActivityType } from '../interfaces/activitytype';

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [CommonModule, TripCardComponent, FormsModule],
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent {
  trips: Trip[] = [];
  filteredTrips: Trip[] = [];
  activityTypeId: string = "-1";
  activitytypes : ActivityType[] = [];
  input: string = '';

  pageSize: number = 6;
  currentPage: number = 1;

  constructor(private tripService: TripService) {}

  onChange(): void {
    this.currentPage = 1;
    this.filteredTrips = this.filterTrips();
  }

  filterTrips(): Trip[] {
    const lowercasedInput = this.input.toLowerCase().trim();

    return this.trips.filter((trip) => {
      const nameMatches = trip.name.toLowerCase().includes(lowercasedInput);
      const descriptionMatches = trip.description.toLowerCase().includes(lowercasedInput);

      //check if the trip's activities have an activity whose type matches the selected type
      const activityTypeMatches = trip.activities.some((activity) => {
        if (this.activityTypeId === "-1") {
          return true;
        }
        return activity.activityType.id === parseInt(this.activityTypeId);
      });

      return (nameMatches || descriptionMatches) && trip.isUsed && trip.isPublic && activityTypeMatches;
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  ngOnInit(): void {
    this.tripService.getTrips().subscribe(
      (data: Trip[]) => {
        this.trips = data;
        this.filteredTrips = this.filterTrips();
        console.log(this.trips);
        console.log('api call');
      },
      (error) => {
        console.error('Error fetching trips', error);
      }
    );
    this.tripService.getActivityTypes().subscribe(
      (data: ActivityType[]) => {
        this.activitytypes = data;
        console.log(this.activitytypes);
      },
      (error) => {
        console.error('Error fetching trips', error);
      }
    );
  }

  getDisplayedTrips(): Trip[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filteredTrips.slice(startIndex, endIndex);
  }
  
  getPaginationArray(): number[] {
    const pageCount = Math.ceil(this.filteredTrips.length / this.pageSize);
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }


  filterTripsByEmail(userEmail: string): Trip[] {
    return this.trips.filter((trip) => trip.emailList.some((email) => email.email === userEmail));
  }
}
