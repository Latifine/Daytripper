import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TripService } from '../services/trip.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Trip } from '../interfaces/trip';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService, User } from '@auth0/auth0-angular';
import { ActivatedRoute } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-trip.component.html',
  styleUrl: './edit-trip.component.css',
  animations: [trigger('slideInOut', [
    transition(':enter', [
      style({ transform: 'translateY(100%)', position: 'absolute', overflow: 'hidden' }),
      animate('500ms ease-in', style({ transform: 'translateY(0%)' })),
    ]),
    transition(':leave',[
      animate('250ms ease-out', style({ transform: 'translateY(-150%)'})),
    ]),
  ]),]
})
export class EditTripComponent implements OnInit{
  trip: Trip = {} as Trip;
  user: User | null = null;
  currentStep: number = 1;


  constructor(private tripService: TripService, private toastr: ToastrService, private router: Router, private http: HttpClient, public auth: AuthService, private route : ActivatedRoute, private datePipe: DatePipe) { }

  ngOnInit(): void {
    const tripId = this.route.snapshot.paramMap.get('id');
    if (tripId != null) {
      this.tripService.getTripById(+tripId).subscribe(
        (tripResponse: any) => {
          this.trip = {
            ...tripResponse,
            startdate: this.datePipe.transform(tripResponse.startDate, 'yyyy-MM-dd'),
            enddate: this.datePipe.transform(tripResponse.endDate, 'yyyy-MM-dd')
          };
          console.log(this.trip.location.address);
        },
        (error) => {
          console.error('Error fetching trip:', error);
        }
      );
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
  }

  nextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  } 
  goBack() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }
  setStep(step: number) {
    this.currentStep = step;
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      this.uploadImage(file);
    }
  }

  uploadImage(file: File): void {
    const formData = new FormData();
    formData.append('image', file);

    const apiKey = environment.IMGBB_API_KEY;
    const apiUrl = `https://api.imgbb.com/1/upload?key=${apiKey}`;

    this.http.post(apiUrl, formData).subscribe(
      (response: any) => {
        console.log('Image uploaded successfully:', response.data.url);
        // You can now use the uploaded image URL as needed
        this.trip.logo = response.data.url;
      },
      (error) => {
        console.error('Error uploading image:', error);
      }
    );
  }
  
  return(id: Number){
    this.router.navigate(['/trip', id]);
  }

  updateTrip(id: Number): void{
    console.log("updateTrip");
    console.log(this.trip.name);
    console.log(this.trip.budget);
    console.log(this.trip.location.address);
    console.log(this.trip.location.city);
    console.log(this.trip.location.country);
    console.log(this.trip.description);
    console.log(this.trip.startdate);
    console.log(this.trip.enddate);

    //validate the data
    if (this.trip.name === null || this.trip.name.trim() === "") {
      this.toastr.error("Please enter a name for your trip");
      return;
    }
    if (this.trip.location.address === null || this.trip.location.address.trim() === "") {
      this.toastr.error("Please enter an address for your trip");
      return;
    }
    //check if budget is null
    if (this.trip.budget === null) {
      this.trip.budget = 0;
    }
    if (this.trip.location.city === null || this.trip.location.city.trim() === "") {
      this.toastr.error("Please enter a city for your trip");
      return;
    }
    if (this.trip.location.country === null || this.trip.location.country.trim() === "") {
      this.toastr.error("Please enter a country for your trip");
      return;
    }
    if (this.trip.description === null || this.trip.description.trim() === "") {
      this.toastr.error("Please enter a description for your trip");
      return;
    }
    if (this.trip.startdate === null) {
      this.toastr.error("Please enter a start date for your trip");
      return;
    }
    if (this.trip.enddate === null) {
      this.toastr.error("Please enter an end date for your trip");
      return;
    }
    if (this.trip.startdate > this.trip.enddate) {
      this.toastr.error("Please enter a valid date range for your trip");
      return;
    }

    this.tripService.updateTrip(this.trip).subscribe(
      (data) => {
        console.log(data);
        this.toastr.success("Trip updated successfully");
        this.router.navigate(['/trip', id]);
      },
      (error) => {
        console.log(error);
        this.toastr.error("Error updating trip");
      }
    )
  }
}
