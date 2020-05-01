import {ImageAsset} from './image-asset';
import {QuizQuestion} from './quiz-question';

export interface Section {
  type: SectionType;
  header: string;
  body?: string[];
  imageAsset?: ImageAsset;
  questions?: QuizQuestion[];
}

export class TextSection implements Section{
  constructor(header: string, body: string[], imageAsset?: ImageAsset) {
    this.header = header;
    this.body = body;
    this.type = SectionType.Text;
    this.imageAsset = imageAsset || undefined;
  }
  body: string[];
  header: string;
  type: SectionType;
  imageAsset?: ImageAsset;
}

export class QuizSection implements Section {
  constructor (header: string, questions: QuizQuestion[]) {
    this.header = header;
    this.questions = questions;
    this.type = SectionType.Quiz;
  }
  header: string;
  type: SectionType;
  questions: QuizQuestion[];
}

export enum SectionType {
  Text = "text",
  Quiz = "quiz"
}
