import { Injectable } from '@angular/core';
import { Card } from './trip-card';

@Injectable({
  providedIn: 'root'
})
export class TripCardService {
  private trips: Card[] = [];

  constructor() {}

  getTrips(): Card[] {
    return this.trips;
  }

  getTripById(id: number) : Card | null {
    return this.trips.find(t=>t.id == id) ?? null;
  }

}
