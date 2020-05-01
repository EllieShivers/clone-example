import {ImageAsset} from './image-asset';

export interface QuizQuestion {
  questionType: QuestionType;
  questionText: string;
  correctAnswer: any;
  image?: ImageAsset;
  feedback: string;
}

export class MultipleChoiceQuestion implements QuizQuestion {

  constructor(questionText: string, possibleAnswers: string[], correctAnswer: number, feedback: string, image?: ImageAsset) {
    this.questionType = QuestionType.MultipleChoice;
    this.questionText = questionText;
    this.possibleAnswers = possibleAnswers;
    this.correctAnswer = correctAnswer;
    this.feedback = feedback;
    this.image = image || undefined;
  }
  questionType: QuestionType;
  questionText: string;
  possibleAnswers: string[];
  correctAnswer: number;
  feedback: string;
  image?: ImageAsset;
}

export class TrueFalseQuestion implements QuizQuestion {
  constructor(questionText: string, correctAnswer: boolean, feedback: string, image?: ImageAsset){
    this.questionType = QuestionType.TrueFalse;
    this.questionText = questionText;
    this.correctAnswer = correctAnswer;
    this.feedback = feedback;
    this.image = image || undefined;
  }
  questionType: QuestionType;
  questionText: string;
  correctAnswer: boolean;
  feedback: string;
  image?: ImageAsset;
}

export enum QuestionType {
  MultipleChoice = 'Multiple Choice',
  TrueFalse = 'True or False'
}
