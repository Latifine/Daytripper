import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TripCardComponent } from '../trip-card/trip-card.component';
import { Trip } from '../interfaces/trip';
import { TripService } from '../services/trip.service';
import { HttpClient } from '@angular/common/http';
import * as jsPDF from 'jspdf';
import { Router, RouterModule } from '@angular/router';
import { AuthService, User } from '@auth0/auth0-angular';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { compileClassDebugInfo } from '@angular/compiler';
import { Activity } from '../interfaces/activity';

@Component({
  selector: 'app-trip-card-detail',
  standalone: true,
  imports: [CommonModule, TripCardComponent, RouterModule, FormsModule],
  templateUrl: './trip-card-detail.component.html',
  styleUrls: ['./trip-card-detail.component.css']
})
export class TripCardDetailComponent implements OnInit{
  trip: Trip = {} as Trip;
  startDate: Date = new Date();
  endDate: Date = new Date();
  totalCost: Number = 0
  weatherData: any;
  dateRange: Date[] = new Array();
  user: User | null = null;
  email: string | null = null;
  trips : Trip[] = [];

  constructor(private router: Router, private tripService: TripService, private toastr: ToastrService, private route : ActivatedRoute, private datePipe: DatePipe, private http: HttpClient, public auth: AuthService){}

  isOwner() {
    return this.trip.emailList[0].email === this.user?.email;
  }

  inEmailList() {
    const emailListExists = this.trip.emailList && this.trip.emailList.length > 0;
    const userExists = this.user && this.user.email;

    const emailMatches = emailListExists && userExists && this.trip.emailList.some(emailObj => emailObj.email === this.user?.email);
    
    return emailMatches && this.trip.isUsed;
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
    const tripId = this.route.snapshot.paramMap.get('id');
    const weather = [];

    if (tripId != null) {
      this.tripService.getTripById(+tripId).subscribe(
        (tripResponse: any) => {
          this.trip = {
            ...tripResponse,
            startdate: new Date(tripResponse.startDate),
            enddate: new Date(tripResponse.endDate)
          };
          this.getWeatherData(this.trip.location.city);  // Fetch weather data based on the city
          this.totalCost = this.trip.activities.reduce((total, activity) => total + (activity.price || 0), 0);

          const startDate = new Date(this.trip.startdate);
          const endDate = new Date(this.trip.enddate);

          for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
            this.dateRange.push(new Date(date));
          }
        },
        (error) => {
          console.error('Error fetching trip:', error);
        }
      );
    }


    // this.tripService.getTrips().subscribe(
    //   (data: Trip[]) => {
    //     this.trips = data;
    //     //log every trip in console
    //     console.log(this.trips);
    //   },
    //   (error) => {
    //     console.error('Error fetching trips', error);
    //   }
    // );
  }

  getSortedAndUsedActivities(): Activity[] {
  // Clone the activities array to avoid modifying the original array
  const activitiesCopy = [...this.trip.activities];

  // Filter out activities with isUsed === true
  const usedActivities = activitiesCopy.filter(activity => activity.isUsed === true);

  // Sort the filtered activities based on the datetime property
  usedActivities.sort((a, b) => {
    const datetimeA = new Date(a.datetime).getTime();
    const datetimeB = new Date(b.datetime).getTime();
    return datetimeA - datetimeB;
  });

  return usedActivities;
}

  checkIfDatesMatch(startDate: Date, targetDate: Date): boolean {
    return this.datePipe.transform(startDate, 'yyyy-MM-dd') === this.datePipe.transform(targetDate, 'yyyy-MM-dd');
  }

  getWeatherData(city: string): void {
    const apiKey = 'AKVEVX63R7CZWDCCAWMR3VGUR';
    const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${apiKey}&contentType=json`;

    this.http.get(apiUrl).subscribe(
      (weatherData: any) => {
        console.log('Weather data:', weatherData);
        // Filter data for today's date
        const todayDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
        this.weatherData = weatherData.days.find((day: any) => day.datetime == todayDate);

        if (!this.weatherData) {
          console.warn('No weather data available for today.');
        }
      },
      (error) => {
        console.error('Error fetching weather data:', error);
      }
    );
  }

  detail(id: number) {
    this.router.navigate(['/edit', id]);
  }

  confirmDeactivate(tripId: number) {
    const result = window.confirm('Are you sure you want to deactivate this trip?');

    if (result) {
      this.deactivateTrip(tripId);
    }
  }

  deactivateTrip(tripId: number): void {
    console.log("deleteTrip");
    console.log(this.trip.name);

    this.tripService.deactivateTrip(tripId).subscribe(
      (data) => {
        this.toastr.success("Trip deleted successfully");
        this.router.navigate(['/profile']);
      },
      (error) => {
        console.error('Error deleting trip', error);
      }
    );
  }

  addUser(): void{
    const emailRegex = /\S+@\S+\.\S+/;
    const emailValid = emailRegex.test(this.email || '');

    // check if everything is ok
    if (this.email && emailValid) {
      // Check if the email address is not already in the emailList
      const emailExists = this.trip.emailList.some(emailObj => emailObj.email === this.email);

      if (!emailExists) {
        // Add the email address to the emailList
        this.trip.emailList.push({ id:0, email: this.email });

        console.log(this.trip.emailList);
        console.log("hier")

        // Update the tripservice
        this.tripService.updateTrip(this.trip).subscribe(
          (data) => {
            console.log(data);
            this.toastr.success("Email address added successfully.");
          },
          (error) => {
            console.error(this.trip)
            console.error('Error adding email address', error);
          }
        );
      } 
      else {
        this.toastr.warning("Email address already exists in the list.");
      }
    } 
    else{
      this.toastr.error("Invalid email address");
    }       
  }

  activity() {
    this.router.navigate(["/activity", this.trip.id]);
  }

  printThisPage() {
    window.print();
  }

  exportToPDF() {
    let trip = document.getElementById('trip-export') as HTMLElement;
    let pdf = new jsPDF.jsPDF('portrait', 'pt', 'a4');
    pdf.html(trip, {
      x: -20,
      y: 3,
      html2canvas: {
        scale: 0.45,
        ignoreElements: function(node) {
          return node.tagName === 'BUTTON';
        }
      },
      callback: function (doc) {
        doc.save();
      }
    });   
  }
}
