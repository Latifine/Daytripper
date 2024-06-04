import { ActivityType } from './activitytype';
import { Location } from './location';
export interface Activity {
    id: number;
    name: string;
    description: string;
    datetime: Date;
    price: number;
    isUsed: boolean;
    location: Location;
    activityType: ActivityType;
}
