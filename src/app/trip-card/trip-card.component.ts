import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ShortenContentPipe } from '../shorten-content.pipe';
import { Trip } from '../interfaces/trip';
import { TripService } from '../services/trip.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService, User } from '@auth0/auth0-angular';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule, ShortenContentPipe, RouterModule],
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css']
})
export class TripCardComponent implements OnInit{
  @Input() trip: Trip = {} as Trip;
  @Input() isDetail: boolean = false;
  @Input() isRegular: boolean = false;
  @Input() isEditable: boolean = false;
  user: User | null = null;
  trips: Trip[] = [];


  constructor(private router: Router, private location: Location, private toastr: ToastrService, private tripService: TripService, private auth: AuthService) { }

  inEmailList() {
    return this.trip.emailList[0].email === this.user?.email;
  }

  ngOnInit(): void {
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
  }

  detail(id: number) {
    this.router.navigate(['/trip', id]);
  }

  delete(id: number): void {
    console.log("deleteTrip");
    console.log(this.trip.name);

    this.tripService.deactivateTrip(id).subscribe(
      (data) => {
        this.toastr.success("Trip deleted successfully");
        this.trips = this.trips.filter(trip => trip.id !== id);
        this.router.navigate(['/profile']);
      },
      (error) => {
        console.error('Error deleting trip', error);
      }
    );
  }

  return(){
    this.location.back();
  }
}
