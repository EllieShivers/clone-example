import { Injectable } from '@angular/core';
import {Unit} from 'projects/simple-course-core/src/lib/models/unit';
import {Course} from 'projects/simple-course-core/src/lib/models/course';
import {LessonType} from 'projects/simple-course-core/src/lib/models/lesson';
import {Section, TextLesson} from 'projects/simple-course-core/src/lib/models/text-lesson';
import {VideoLesson} from 'projects/simple-course-core/src/lib/models/video-lesson';
import {MultipleChoiceQuestion, QuestionType, QuizLesson, TrueFalseQuestion} from 'projects/simple-course-core/src/lib/models/quiz-lesson';
import { MarkdownLegend } from './markdown-legend';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

@Injectable({
  providedIn: 'root'
})
export class CourseMapperService {

  currentLineNumber: number = 0;
  ML = MarkdownLegend;
  constructor() {  }

  dataToArray(data: string): string[] {
    let array: string[] = [];
    for (let line of data.split(/[\n]+/)) {
      array.push(line);
    }
    return array;
  }
  parseMarkdown(data: string): Course {
    //console.log(data);

    let currentLine: number = 1;
    let course: Course = {title: '', creationDate: '', lastUpdated: '', authors: [], description: '', units: [], colorScheme: [] };
    let unit: Unit = new Unit();
    let currentLesson: any = '';
    let currentSection: any = '';
    let currentQuestion: any = '';
    this.currentLineNumber = 0;

    let courseArray: string[] = this.dataToArray(data);

    for (let line of courseArray) {
      /**
       * The following section handles course metadata. Lines 1-4 MUST be Course Title, Creation Date, Last Updated Date, Author(s), and
       * Description in that specific order. Dates should be provided in YYYY-MM-DD format.
       *
       * Example:
       *
       * [COURSE_TITLE] My Course 1
       * [CREATION_DATE] 2010-01-01
       * [LAST_UPDATED] 2020-01-01
       * [AUTHORS] Jane Doe
       * [DESCRIPTION] This is a sample course. (No limit on length, but longer strings may not display properly.
       *
       **/
      if (currentLine === 1){
        if (line.startsWith(MarkdownLegend.CourseTitle)){
          course.title = line.substring(MarkdownLegend.CourseTitle.length, line.length).trim();
          console.log("Setting title: " + course.title);
        }
        else {
          throwError('Line 1 must define the course title. Ex: \"[COURSE_TITLE] My Course Title\"');
        }
      }
      else if (currentLine === 2){
        if (line.startsWith(MarkdownLegend.CreationDate)) {
          course.creationDate = line.substring(MarkdownLegend.CreationDate.length, line.length).trim();
        }
        else {
          throwError('Line 2 must define a creation date in the format YYYY-MM-DD. Ex: \"[CREATION_DATE] 2000-01-01\"');
        }
      }
      else if (currentLine === 3){
        if (line.startsWith(MarkdownLegend.LastUpdate)) {
          course.lastUpdated = line.substring(MarkdownLegend.LastUpdate.length, line.length).trim();
        }
        else {
          throwError('Line 3 must define a last updated date in the format YYYY-MM-DD. Ex: \"[LAST_UPDATED] 2000-01-01\"');
        }
      }
      else if (currentLine === 4){
        if (line.startsWith(MarkdownLegend.Authors)) {
          // TODO: Handle multiple authors.
          course.authors.push(line.substring(MarkdownLegend.Authors.length, line.length).trim());
        }
        else {
          throwError('Line 4 must define one or more authors. Multiple authors should be delineated by a comma. Ex: \"[AUTHORS] Jane Doe, Jack Smith\"');
        }
      }
      else if (currentLine === 5){
        if (line.startsWith(MarkdownLegend.Description)) {
          course.description = line.substring(MarkdownLegend.Description.length, line.length).trim();
        }
        else {
          throwError('Line 5 must define a description. Ex: \"[DESCRIPTION] This is my course!\"');
        }
      }
      /**
       * The following section handles
       **/
      else if (currentLine > 5) {


      }
      currentLine++;
    }


    return course;

    /*
    for (let line of data.split(/[\n]+/)) {
      this.currentLineNumber = this.currentLineNumber + 1;
      line = line.trim();
      if (line.startsWith('###')) {
        // create new section
        let sectionTitle = line.substring(4, line.length).trim();
        let section: Section = new Section(sectionTitle, []);
        currentSection = section;
        currentLesson.sections.push(section);
      } else if (line.startsWith('##') && line.charAt(2) != '#') {
        // create new lesson
        if (line.substring(line.length - 6, line.length).endsWith('[TEXT]')) {
          //text lesson
          let lessonTitle = line.substring(3, line.length - 6).trim();
          let lesson: TextLesson = new TextLesson(lessonTitle, []);
          currentLesson = lesson;
          unit.lessons.push(lesson);
        } else if (line.substring(line.length - 7, line.length).endsWith('[VIDEO]')) {
          //video lesson
          let lessonTitle = line.substring(3, line.length - 7).trim();
          let lesson: VideoLesson = new VideoLesson(lessonTitle, '', []);
          currentLesson = lesson;
          unit.lessons.push(lesson);
        } else if (line.substring(line.length - 6, line.length).endsWith('[QUIZ]')) {
          //quiz lesson
          let lessonTitle = line.substring(3, line.length - 6).trim();
          let lesson: QuizLesson = new QuizLesson(lessonTitle, []);
          currentLesson = lesson;
          unit.lessons.push(lesson);
        } else {
          return this.ML.getErrorLineError(this.currentLineNumber, line);
        }
      } else if (line.startsWith('#') && line.charAt(1) != '#' && line.charAt(2) != '#') {
        //create new unit -- TEMP DOES UNIT ONLY AND DOES NOT CREATE A NEW UNIT
        unit.title = line.substring(2, line.length).trim();
        unit.lessons = [];
      } else {
        // HANDLE NON HEADER STRINGS

        // Handle Text Bodies -- Place the string into the body for current section.
        if (currentLesson.type === LessonType.Text) {
          currentSection.body.push(line);
        }
        // Handle Video Bodies -- Parse the URL or place the string into the transcript for current lesson.
        else if (currentLesson.type === LessonType.Video) {
          if (line.substring(0, '[YOUTUBE_VIDEO_URL]'.length) === '[YOUTUBE_VIDEO_URL]') {
            let youtubeVideoURL = line.substring('[YOUTUBE_VIDEO_URL]'.length, line.length);
            youtubeVideoURL = youtubeVideoURL.trim();
            (<VideoLesson> currentLesson).videoEmbedCode = '<!--suppress HtmlDeprecatedAttribute --><iframe width="560" height="315" src="' + youtubeVideoURL + ' frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>\n';
          } else {
            (<VideoLesson> currentLesson).transcript.push(line);
          }
        }
        // Handle Quiz Bodies
        else if (currentLesson.type === LessonType.Quiz) {
          // HAndle New Questions
          if (line.startsWith('[QUESTION]')) {
            // Multiple Choice Questions
            if (line.endsWith('[MC]')) {
              let questionText: string = line.substring('[QUESTION]'.length, line.length - '[MC]'.length);
              let question: MultipleChoiceQuestion = new MultipleChoiceQuestion(questionText, [], 0, []);
              currentQuestion = question;
              currentLesson.questions.push(question);
            }
            // True/False Questions
            else if (line.endsWith('[TF]')){
              let questionText: string = line.substring('[QUESTION]'.length, line.length - '[TF]'.length).trim();
              let question: TrueFalseQuestion = new TrueFalseQuestion(questionText, true, []);
              currentQuestion = question;
              currentLesson.questions.push(question);
            }
          }
          else if (line.startsWith('[ANSWER]')) {
            currentQuestion.possibleAnswers.push(line.substring('[ANSWER]'.length, line.length).trim());
          }
          else if (line.startsWith('[CORRECT_ANSWER]')) {
            if (currentQuestion.questionType === QuestionType.MultipleChoice) {
              let correctAnswerString = line.substring('[CORRECT_ANSWER]'.length, line.length);
              currentQuestion.correctAnswer = parseInt(correctAnswerString);
            }
            else if (currentQuestion.questionType === QuestionType.TrueFalse) {
              let correctAnswerString = line.substring('[CORRECT_ANSWER]'.length, line.length).trim();
              if (correctAnswerString.toLowerCase() === 'f'.toLowerCase() || correctAnswerString.toLowerCase() === 'false') {
                currentQuestion.correctAnswer = false;
              }
              else currentQuestion.correctAnswer = true;
            }
          }
          else if (line.startsWith('[FEEDBACK]')) {
            currentQuestion.feedback.push(line.substring('[FEEDBACK]'.length, line.length).trim());

          }
        }
      }
    }
    */
  }
}
