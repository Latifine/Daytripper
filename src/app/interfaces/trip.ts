import { Location } from './location';
import { Activity } from './activity';
import { Email } from './email';
export interface Trip{
    id: number;
    name: string;
    description: string;
    startdate: Date;
    enddate: Date;
    logo: string;
    location: Location;
    budget: number;
    isPublic: boolean;
    isUsed: boolean;
    activities: Activity[];
    emailList: Email[];
}