import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripService } from '../services/trip.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Trip } from '../interfaces/trip';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService, User } from '@auth0/auth0-angular';
import { Email } from '../interfaces/email';
import { RouterModule } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-planning',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css'],
  animations: [
    trigger('slideInOut', [
    transition(':enter', [
      style({ transform: 'translateY(100%)', position: 'absolute', overflow: 'hidden' }),
      animate('500ms ease-in', style({ transform: 'translateY(0%)' })),
    ]),
    transition(':leave',[
      animate('250ms ease-out', style({ transform: 'translateY(-150%)'})),
    ]),
  ]),]
})

export class PlanningComponent implements OnInit {
  name: string | null = null;
  budget: number = 0;
  description: string | null = null;
  startDate: Date | null = null;
  endDate: Date | null = null;
  logo: string = "../../assets/upload.png";
  trips: Trip[] = [];
  isPublic: boolean = false;
  address: string | null = null;
  city: string | null = null;
  country: string | null = null;
  user: User | null = null;
  currentStep: number = 1;

  authauth = "";

  constructor(private tripService: TripService, private toastr: ToastrService, private router: Router, private http: HttpClient, public auth: AuthService) {
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
    this.tripService.getTrips().subscribe(
      (data: Trip[]) => {
        this.trips = data;
        console.log(this.trips);
      },
      (error) => {
        console.error('Error fetching trips', error);
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
    if (file.size > 24 * 1024 * 1024) {
      this.toastr.error("Image size is too large. Please select an image smaller than 32 Mb.");
      return;
    }
    this.http.post(apiUrl, formData).subscribe(
      (response: any) => {
        this.logo = response.data.url;
        this.toastr.success("Image succesfully added!");
      },
      (error) => {
        console.error('Error uploading image:', error);
      });
  }

  createTrip(): void{

    //validate the data
    if (this.name === null || this.name.trim() === "") {
      this.toastr.error("Please enter a name for your trip");
      return;
    }
    if (this.address === null || this.address.trim() === "") {
      this.toastr.error("Please enter an address for your trip");
      return;
    }
    //check if budget is null
    if (this.budget === null) {
      this.budget = 0;
    }
    if (this.city === null || this.city.trim() === "") {
      this.toastr.error("Please enter a city for your trip");
      return;
    }
    if (this.country === null || this.country.trim() === "") {
      this.toastr.error("Please enter a country for your trip");
      return;
    }
    if (this.description === null || this.description.trim() === "") {
      this.toastr.error("Please enter a description for your trip");
      return;
    }
    if (this.startDate === null) {
      this.toastr.error("Please enter a start date for your trip");
      return;
    }
    if (this.endDate === null) {
      this.toastr.error("Please enter an end date for your trip");
      return;
    }
    if (this.startDate > this.endDate) {
      this.toastr.error("Please enter a valid date range for your trip");
      return;
    }

    //check if everything is ok and add the trip
    for (let trip of this.trips) {
      if (trip.name === this.name) {
        this.toastr.error("A trip with the same name already exists");
        return;
      }
    }

    if (this.logo === "../../assets/upload.png") {
      this.logo = "https://i.ibb.co/bKMTp1P/360-F-315349043-6ohf-Fyx37-AFus-CKZt-GQt-JR0jq-Uxhb25-Y.jpg"
    }

    const newTrip: Trip = {
      id: 0,
      name: this.name,
      budget: this.budget,
      description: this.description,
      startdate: this.startDate,
      enddate: this.endDate,
      logo: this.logo,
      isPublic: this.isPublic,
      activities: [],
      isUsed: true,
      location: {
        id: 0,
        city: this.city as string,
        country: this.country as string,
        address: this.address as string,
      },
      //add the user.email to the email list
      emailList: [
        {
          id: 0,
          email: this.user?.email as string,
        }
      ]
    }

    this.tripService.addTrip(newTrip).subscribe(
      (data) => {
        console.log(data);
        this.trips.push(data);
        this.toastr.success("Trip created successfully");
        //go to activity page with the new trip
        this.router.navigate(["/activity", data.id]);
      },
      (error) => {
        console.log(error);
        this.toastr.error("An error occured");
      }
    );
    
  }
}
