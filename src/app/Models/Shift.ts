import { Stop } from './Stop';

export class Shift {
  title: String;

  _id: String;
  shiftStartTime: String;
  shiftEndTime: String;
  startLoc: Number[];
  endLoc: Number[];
  listOfStops: Stop[];
  shiftStatus: Boolean;
  vehicle: String;


}

