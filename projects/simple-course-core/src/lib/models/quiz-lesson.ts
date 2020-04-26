import {Citation, Lesson, LessonType} from './lesson';

export class QuizLesson extends Lesson {
  constructor(title: string, questions: Question[], citations?: Citation[]) {
    super(title, citations || undefined);
    this.type = LessonType.Quiz;
    this.questions = questions;
    //if (citations) this.citations = citations;
  }
  questions: Question[];
}

interface Question {
  questionType: QuestionType;
  questionText: string;
  correctAnswer: any;
}

export class MultipleChoiceQuestion implements Question {

  constructor(questionText: string, possibleAnswers: string[], correctAnswer: number, feedback: string[]) {
    this.questionType = QuestionType.MultipleChoice;
    this.questionText = questionText;
    this.possibleAnswers = possibleAnswers;
    this.correctAnswer = correctAnswer;
    if (feedback) this.feedback = feedback;
  }
  questionType: QuestionType;
  questionText: string;
  feedback?: string[];
  possibleAnswers: string[];
  correctAnswer: number;
}

export class TrueFalseQuestion implements Question {
  constructor(questionText: string, correctAnswer: boolean, feedback: string[]){
    this.questionType = QuestionType.TrueFalse;
    this.questionText = questionText;
    this.correctAnswer = correctAnswer;
    if (feedback) this.feedback = feedback;
  }
  questionType: QuestionType;
  questionText: string;
  correctAnswer: boolean;
  feedback?: string[];
}

export enum QuestionType {
  MultipleChoice = 'Multiple Choice',
  TrueFalse = 'True or False'
}
