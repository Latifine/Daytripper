import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripCardComponent } from '../trip-card/trip-card.component';
import { TripService } from '../services/trip.service';
import { Trip } from '../interfaces/trip';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TripCardComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  trips: Trip[] = [];
  featuredTrips: Trip[] = [];

  constructor(private tripService: TripService) { }

  ngOnInit(): void {
    this.tripService.getTrips().subscribe(
      (data: Trip[]) => {
        this.trips = data;
        this.selectRandomFeaturedTrips();
      },
      (error) => {
        console.error('Error fetching trips', error);
      }
    );
  }

  selectRandomFeaturedTrips(): void {
    const eligibleTrips = this.trips.filter(trip => trip.isUsed && trip.isPublic);
    const randomTrips = this.getRandomElements(eligibleTrips, 2);
    this.featuredTrips = randomTrips;
    console.log(this.featuredTrips);
  }

  getRandomElements(arr: Trip[], n: number): Trip[] {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    console.log(shuffled.slice(0, n));
    return shuffled.slice(0, n);
  }
}
