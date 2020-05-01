import {Unit} from './unit';

export class Course {
  title: string;
  creationDate: string;
  lastUpdated: string;
  authors: string[];
  description: string;
  introduction: string;
  units: Unit[];
  colorScheme: string[];
}
