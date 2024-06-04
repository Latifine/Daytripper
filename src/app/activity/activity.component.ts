import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TripService } from '../services/trip.service';
import { ToastrService } from 'ngx-toastr';
import { ActivityType } from '../interfaces/activitytype';
import { Location } from '../interfaces/location';
import { Activity } from '../interfaces/activity';
import { Trip } from '../interfaces/trip';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { formatDate } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css'],
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
export class ActivityComponent {
  editId: number | null = null;
  name: string | null = null;
  activityTypeId: string | null = null;
  day : Date | null = null;
  time: string = '';
  budget: number | null = null;
  description: string | null = null;
  tripId: number = 0;
  trip: Trip | null = null;
  address : string | null = null;
  city : string | null = null;
  country : string | null = null;
  activitytypes : ActivityType[] = [];
  act : Activity | null = null;
  activities : Activity[] = [];
  locations : Location[] = [];

  currentStep: number = 1;
  selectedDay: Date | null = null;
  selectedDayId: number = -1;
  isEditing: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private tripService: TripService, 
    private toastr: ToastrService, 
    private router: Router, 
    private auth: AuthService,
    private datePipe: DatePipe) 
  { 

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.tripId = Number(params.get('id'));
    });
    //get the trip by id
    if (this.tripId != null) {
      this.tripService.getTripById(this.tripId).subscribe(
        (tripResponse: any) => {
          this.trip = {
            ...tripResponse,
            startdate: new Date(tripResponse.startDate),
            enddate: new Date(tripResponse.endDate)
          };
        },
        (error) => {
          console.error('Error fetching trip:', error);
        }
      );
    }
    //get all activity types
    this.tripService.getActivityTypes().subscribe(
      (data: ActivityType[]) => {
        this.activitytypes = data;
      },
      (error) => {
        console.error('Error fetching trips', error);
      }
    );
    //get all locations
    this.tripService.getLocations().subscribe(
      (data: Location[]) => {
        this.locations = data;
      },
      (error) => {
        console.error('Error fetching trips', error);
      }
    );
    //get all activities
    this.tripService.getActivities().subscribe(
      (data: Activity[]) => {
        this.activities = data;
      },
      (error) => {
        console.error('Error fetching trips', error);
      }
    );
  }
  onchange(): void{
    this.selectedDay = this.getDate(this.selectedDayId);
  }

  formatDay(day: Date): string {
    return formatDate(day, 'EEEE d MMMM yyyy', 'en-US');
  }


  getDaysInTrip(): Date[] {
    let daysList = [];

    if(this.trip?.startdate != null && this.trip?.enddate != null){
      let startDateTime = new Date(this.trip?.startdate);
      startDateTime.setHours(0, 0, 0, 0);

      let endDateTime = new Date(this.trip?.enddate);
      endDateTime.setHours(0, 0, 0, 0);

      for (let date = startDateTime; date <= endDateTime; date.setDate(date.getDate() + 1)) {
        daysList.push(new Date(date));
      }
    }
    return daysList;
  }

  getDate(id:number): Date {
    return this.getDaysInTrip()[id];
  }
  getIdFromDate(date: Date): number {
    return this.getDaysInTrip().indexOf(date);
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

  editActivity(id:number){
    this.isEditing = true;
    this.currentStep = 1;
    //get activity by id
    if (id != null) {
      this.tripService.getActivityById(id).subscribe(
        (activityResponse: Activity) => {
          this.act = {
            ...activityResponse,
            datetime: activityResponse.datetime,
            location: {
              ...activityResponse.location
            },
            activityType: {
              ...activityResponse.activityType
            }
          };
          //fill the fields with the activity data
          this.editId = this.act?.id;
          this.name = this.act?.name;
          this.activityTypeId = this.act?.activityType.id.toString();
          this.day = new Date(this.act?.datetime);
          this.time = this.datePipe.transform(this.act?.datetime, 'HH:mm') || '';
          this.description = this.act?.description;
          this.address = this.act?.location.address;
          this.city = this.act?.location.city;
          this.country = this.act?.location.country;
          this.budget = this.act?.price;
          this.selectedDay = new Date(this.act?.datetime);
          this.selectedDayId = this.getIdFromDate(this.selectedDay as Date);

        },
        (error) => {
          console.error('Error fetching activity:', error);
        }
      );
    }

  }
  saveActivity(){
    //validate
    if (this.name === null || this.name.trim() === "") {
      this.toastr.error("Please enter a name for your activity");
      return;
    }
    if (this.activityTypeId === null) {
      this.toastr.error("Please enter an activity type for your activity");
      return;
    }
    if (this.address === null || this.address.trim() === "") {
      this.toastr.error("Please enter an address for your activity");
      return;
    }
    if (this.city === null || this.city.trim() === "") {
      this.toastr.error("Please enter a city for your activity");
      return;
    }
    if (this.country === null || this.country.trim() === "") {
      this.toastr.error("Please enter a country for your activity");
      return;
    }
    if (this.description === null || this.description.trim() === "") {
      this.toastr.error("Please enter a description for your activity");
      return;
    }
    if (this.selectedDayId === -1 || this.selectedDay === null) {
      this.toastr.error("Please select a day for your activity");
      return;
    }
    else{
      this.selectedDay = this.getDaysInTrip()[this.selectedDayId];
    }
    if (this.time === "0:0" || this.time === null || this.time.trim() === "") {
      this.toastr.error("Please enter a time for your activity");
      return;
    }

    //if everything is ok add the activity
    if(this.name && this.activityTypeId && this.description && this.address && this.city && this.country && this.selectedDay && this.time){
      const [hours, minutes] = this.time.split(':').map(Number);
      this.act = {
        id: this.editId as number,
        name: this.name as string,
        description: this.description as string,
        price: this.budget as number,
        datetime: this.datePipe.transform(new Date(this.selectedDay.getFullYear(), this.selectedDay.getMonth(),this.selectedDay.getDate(),hours,minutes), 'yyyy-MM-ddTHH:mm:ss'),

        isUsed: true,
        activityType: {
          id: parseInt(this.activityTypeId as string,10),
          name: this.activitytypes[parseInt(this.activityTypeId as string,10)-1].name as string
        } as ActivityType,
  
        location: {
          id: this.locations[this.locations.length - 1].id,
          address: this.address as string,
          city: this.city as string,
          country: this.country as string
        } as Location,
        }as any;
  
  
      this.tripService.updateActivity(this.editId as number, this.act as Activity).subscribe(
        (data: void) => {
          this.toastr.success("Activity updated");
          this.ngOnInit();
          this.isEditing = false;
          this.currentStep = 1;
  
          //empty all fields
          this.emptyFields();
        },
        (error) => {
          console.error('Error updating activity', error);
          this.toastr.error("Error updating activity");
        }
      );
    }
  }

  getActiveActivities(): Activity[] {
    return this.trip?.activities.filter((activity) => activity.isUsed) as Activity[];
  }

  getDateFromString(date: string): Date {
    return new Date(date);
  }

  confirmDeactivate(activityId: number) {
    const result = window.confirm('Are you sure you want to deactivate this activity?');

    if (result) {
      this.deactivateActivity(activityId);
    }
  }

  deactivateActivity(id: number): void {
    this.tripService.deactivateActivity(this.tripId,id).subscribe(
      (data: void) => {
        this.toastr.success("Activity deactivated");
        this.ngOnInit();
      },
      (error) => {
        console.error('Error deactivating activity', error);
        this.toastr.error("Error deactivating activity");
      }
    );
  }

  detail(id: number) {
    this.router.navigate(['/trip', id]);
  }

  addActivity(): void{
    //validate
    if (this.name === null || this.name.trim() === "") {
      this.toastr.error("Please enter a name for your activity");
      return;
    }
    if (this.activityTypeId === null) {
      this.toastr.error("Please enter an activity type for your activity");
      return;
    }
    if (this.address === null || this.address.trim() === "") {
      this.toastr.error("Please enter an address for your activity");
      return;
    }
    if (this.city === null || this.city.trim() === "") {
      this.toastr.error("Please enter a city for your activity");
      return;
    }
    if (this.country === null || this.country.trim() === "") {
      this.toastr.error("Please enter a country for your activity");
      return;
    }
    if (this.description === null || this.description.trim() === "") {
      this.toastr.error("Please enter a description for your activity");
      return;
    }
    if (this.selectedDayId === -1 || this.selectedDay === null) {
      this.toastr.error("Please select a day for your activity");
      return;
    }
    else{
      this.selectedDay = this.getDaysInTrip()[this.selectedDayId];
    }
    if (this.time === "0:0" || this.time === null || this.time.trim() === "") {
      this.toastr.error("Please enter a time for your activity");
      return;
    }

    //if everything is ok add the activity
    if (this.name && this.activityTypeId && this.description && this.address && this.city && this.country && this.selectedDay && this.time) {
      const [hours, minutes] = this.time.split(':').map(Number);
      const formattedDate = new Date(this.selectedDay as Date).setHours(hours, minutes);
      for(let activityType of this.activitytypes){
        if(activityType.id === parseInt(this.activityTypeId,10)){
          this.act = {
            id: 0,
            name: this.name as string,
            description: this.description as string,
            price: this.budget as number,
            datetime: this.datePipe.transform(new Date(this.selectedDay.getFullYear(), this.selectedDay.getMonth(),this.selectedDay.getDate(),hours,minutes), 'yyyy-MM-ddTHH:mm:ss'),
            isUsed: true,
          
            activityType: {
              id: activityType.id as number,
              name: activityType.name as string
            } as ActivityType,

            location: {
              id: this.locations[this.locations.length - 1].id + 1,
              address: this.address as string,
              city: this.city as string,
              country: this.country as string
            } as Location,
            }as any;

        }

      }

      if (this.act) {
        this.tripService.addActivity(this.tripId, this.act).subscribe(
          (data: void) => {
            this.toastr.success("Activity added");
            this.trip?.activities.push(this.act as Activity);

            //empty all fields
            this.emptyFields();
            
            //go back to step 1
            this.currentStep = 1;

            this.ngOnInit();
          },
          (error) => {
            console.error('Error adding activity', error);
            this.toastr.error("Error adding activity");
          }
        );
      }
      else{
        this.toastr.error("Error adding activity");
      }
    }  
  }

  emptyFields(): void{
    this.name = null;
    this.activityTypeId = null;
    this.day = null;
    this.time = "0:0";
    this.description = null;
    this.address = null;
    this.city = null;
    this.country = null;
    this.budget = null;
    this.selectedDay = null;
    this.act = null;
    this.selectedDayId = -1;
  }
}
