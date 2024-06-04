import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../interfaces/trip';
import { Location } from '../interfaces/location';
import { Activity } from '../interfaces/activity';
import { ActivityType } from '../interfaces/activitytype';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor(private httpClient: HttpClient) {
  }

   getTrips(): Observable<Trip[]> {
    return this.httpClient.get<Trip[]>(environment.api_url + "/trip");
  }
  getTripById(id: number): Observable<Trip> {
    return this.httpClient.get<Trip>(environment.api_url + "/trip/" + id);
  }
  deactivateTrip(id: number): Observable<void> {
    return this.httpClient.delete<void>(environment.api_url + "/trip/" + id);
  }
  addTrip(trip: Trip): Observable<Trip> {
    return this.httpClient.post<Trip>(environment.api_url + "/trip", trip);
  }
  updateTrip(trip: Trip): Observable<void> {
    return this.httpClient.put<void>(environment.api_url + "/trip/" + trip.id, trip);
  }
  addActivity(id: number, activity: Activity): Observable<void> {
    return this.httpClient.post<void>(environment.api_url + "/trip/activities/" + id, activity);
  }
  getActivityById(id: number): Observable<Activity> {
    return this.httpClient.get<Activity>(environment.api_url + "/trip/activities/" + id);
  }
  updateActivity(id:number, act: Activity): Observable<void> {
    console.log("sending to api");
    console.log(act);
    return this.httpClient.put<void>(environment.api_url + "/trip/activities/" + id, act);
  }
  deactivateActivity(tripId: number,actId:number): Observable<void> {
    return this.httpClient.delete<void>(environment.api_url + "/trip/+"+tripId+"/activities/" + actId);
  }
  getActivityTypes(): Observable<ActivityType[]> {
    return this.httpClient.get<ActivityType[]>(environment.api_url + "/trip/activitytypes");
  }
  getLocations(): Observable<Location[]> {
    return this.httpClient.get<Location[]>(environment.api_url + "/trip/locations");
  }
  getActivities(): Observable<Activity[]> {
    return this.httpClient.get<Activity[]>(environment.api_url + "/trip/activities");
  }
}
