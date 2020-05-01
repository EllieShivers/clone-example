import { Injectable } from '@angular/core';

import { MarkdownLegend } from './markdown-legend';
import {throwError} from 'rxjs';
import {MetaData} from '../models/meta-data';
import {QuizSection, SectionType, TextSection} from '../models/section';
import {Course} from '../models/course';
import {Unit} from '../models/unit';
import {Lesson} from '../models/lesson';
import {MultipleChoiceQuestion, QuestionType, TrueFalseQuestion} from '../models/quiz-question';
import {VideoAsset} from '../models/video-asset';
import {ImageAsset} from '../models/image-asset';

@Injectable({
  providedIn: 'root'
})

@Injectable({
  providedIn: 'root'
})
export class CourseMapperService {

  ML = MarkdownLegend;
  constructor() {  }

  dataToArray(data: string): string[] {
    let array: string[] = [];
    for (let line of data.split(/[\n]+/)) {
      array.push(line);
    }
    return array;
  }

  parseMetaData(data: string): MetaData {
    let metaData: MetaData = new MetaData();
    metaData.authors = [];
    let currentLine = 1;
    for (let line of data.split(/[\n]+/)) {
      if (currentLine > 5) break;
      if (line.startsWith(this.ML.CourseTitle)){
        metaData.title = line.substring(this.ML.CourseTitle.length, line.length).trim();
      }
      else if (line.startsWith(this.ML.CreationDate)) {
        metaData.creationDate = line.substring(this.ML.CreationDate.length, line.length).trim();
      }
      else if (line.startsWith(this.ML.LastUpdate)) {
        metaData.lastUpdated = line.substring(this.ML.LastUpdate.length, line.length).trim();
      }
      else if (line.startsWith(this.ML.Authors)) {
        // TODO: Handle multiple authors.
        metaData.authors.push(line.substring(this.ML.Authors.length, line.length).trim());
      }
      else if (line.startsWith(this.ML.Description)) {
        metaData.description = line.substring(this.ML.Description.length, line.length).trim();
      }
    }
    return metaData;
  }

  parseMarkdown(data: string): Course {

    let currentLine: number = 1;
    let course: Course = {title: '', creationDate: '', lastUpdated: '', authors: [], description: '', units: [], introduction: '', colorScheme: [] };
    let currentUnit: Unit = new Unit();
    let currentLesson: any = ''; // Placeholder
    let currentSection: any = ''; // Placeholder
    let currentQuestion: any = ''; // Placeholder

    let courseArray: string[] = this.dataToArray(data);

    for (let i = 0 ; i < courseArray.length; i++){
      let line = courseArray[i];
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
      if (currentLine <= 5) {
        if (currentLine === 1) {
          if (line.startsWith(this.ML.CourseTitle)) {
            course.title = line.substring(this.ML.CourseTitle.length, line.length).trim();
          } else {
            throwError('Line 1 must define the course title. Ex: \"[COURSE_TITLE] My Course Title\"');
          }
        } else if (currentLine === 2) {
          if (line.startsWith(this.ML.CreationDate)) {
            course.creationDate = line.substring(this.ML.CreationDate.length, line.length).trim();
          } else {
            throwError('Line 2 must define a creation date in the format YYYY-MM-DD. Ex: \"[CREATION_DATE] 2000-01-01\"');
          }
        } else if (currentLine === 3) {
          if (line.startsWith(this.ML.LastUpdate)) {
            course.lastUpdated = line.substring(this.ML.LastUpdate.length, line.length).trim();
          } else {
            throwError('Line 3 must define a last updated date in the format YYYY-MM-DD. Ex: \"[LAST_UPDATED] 2000-01-01\"');
          }
        } else if (currentLine === 4) {
          if (line.startsWith(this.ML.Authors)) {
            // TODO: Handle multiple authors.
            course.authors.push(line.substring(this.ML.Authors.length, line.length).trim());
          } else {
            throwError('Line 4 must define one or more authors. Multiple authors should be delineated by a comma. Ex: \"[AUTHORS] Jane Doe, Jack Smith\"');
          }
        } else if (currentLine === 5) {
          if (line.startsWith(this.ML.Description)) {
            course.description = line.substring(this.ML.Description.length, line.length).trim();
          } else {
            throwError('Line 5 must define a description. Ex: \"[DESCRIPTION] This is my course!\"');
          }
        }
      }
      /**
       * The following section handles everything past the course metadata.
       **/
      else if (currentLine > 5) {
        /**
         * This section handles creating a new unit, lesson, or section.
         * For the Unit and Lesson Tags, it must be also determined that they are not in reality the deeper tags, as all start with # and
         * both lesson and section start with ##. While this could be setup in descending order such that sections are handled first, the
         * current approach provides is more human readable.
         */

        /**
         * Create a new unit and push it to the current course.
         */
        if (line.trim().startsWith(this.ML.Introduction)) {
          course.introduction = line.trim().substring(this.ML.Introduction.length, line.length).trim();
        }
        else if (line.trim().startsWith(this.ML.UnitTag) && !line.trim().startsWith(this.ML.LessonTag)) {
          currentUnit = new Unit();
          currentUnit.title = line.trim().substring(this.ML.UnitTag.length, line.length).trim();
          currentUnit.lessons = [];
          course.units.push(currentUnit);
        }
        else if (line.startsWith(this.ML.LessonTag) && !line.startsWith(this.ML.SectionTag)) {
          /**
           * This section handles creating lessons.
           */
          let lessonTitle = line.trim().substring(this.ML.LessonTag.length, line.length).trim();
          currentLesson = new Lesson(lessonTitle);
          currentUnit.lessons.push(currentLesson);
        }
        else if (line.startsWith(this.ML.SectionTag)) {
          /**
           * This section handles creating sections based on type.
           */
          if (line.trim().endsWith(this.ML.QuizTag)) {
            let header: string = line.trim().substring(this.ML.SectionTag.length, line.length - this.ML.QuizTag.length - 1).trim();
            currentSection = new QuizSection(header, []);
            currentLesson.sections.push(currentSection)
          }
          else {
            let header: string = line.trim().substring(this.ML.SectionTag.length, line.length).trim();
            currentSection = new TextSection(header,[]);
            currentLesson.sections.push(currentSection);
          }
        }
        else if (line.trim().startsWith(this.ML.ImageHeaderTag)) {
          //TODO: HAndle image headers
          let fileName: string = line.trim().substring(this.ML.ImageHeaderTag.length, line.length).trim();
          let header: ImageAsset = new ImageAsset(fileName, currentLesson.title);
          currentLesson.setHeader(header);
        }
        else if (line.trim().startsWith(this.ML.VideoTag)) {
          let videoString: string = line.trim().substring(this.ML.VideoTag.length, line.length).trim();
          let video: VideoAsset = new VideoAsset(videoString);
          currentLesson.setVideo(video);
        }
        else {
          /**
           * This section populates the details for sections based on section type.
           */
          if (currentSection.type === SectionType.Text) {
            currentSection.body.push(line.trim());
          }
          else if (currentSection.type === SectionType.Quiz) {
            if (line.trim().startsWith(this.ML.QuestionTag)) {
              if (line.trim().endsWith(this.ML.MultipleChoiceTag)){
                let questionText = line.trim().substring(this.ML.QuestionTag.length, line.length - 1 - this.ML.MultipleChoiceTag.length);
                currentQuestion = new MultipleChoiceQuestion(questionText, [], 0, '');
                currentSection.questions.push(currentQuestion);
              }
              else if (line.trim().endsWith(this.ML.TrueFalseTag)) {
                let questionText = line.trim().substring(this.ML.QuestionTag.length, line.length - 1 - this.ML.TrueFalseTag.length);
                currentQuestion = new TrueFalseQuestion(questionText, true, '');
                currentSection.questions.push(currentQuestion);
              }
            }
            else if (line.trim().startsWith(this.ML.AnswerTag)) {
              try {
                currentQuestion.possibleAnswers.push(line.substring(this.ML.AnswerTag.length, line.length).trim());
              }
              catch (e) {
                throwError(e + ' -- Attempted to add possible answer but question type does not support multiple possible answers.');
              }
            }
            else if (line.trim().startsWith(this.ML.CorrectAnswerTag)) {
              if (currentQuestion.type === QuestionType.MultipleChoice) {
                let correctAnswerString: string = line.trim().substring(this.ML.CorrectAnswerTag.length, line.length).trim();
                let correctAnswerParsed: number;
                try {
                  correctAnswerParsed = parseInt(correctAnswerString);
                }
                catch (e) {
                  throwError(e + ' -- Unable to parse into a number. Multiple Choice questions should consist of only the tag and the number of the correct answer in order, starting with 1.')
                }
                if (correctAnswerParsed > currentQuestion.possibleAnswers.length) {
                  throwError('Correct Answer number cannot exceed the number of possible answers. Please ensure that the correct answer line is provided after all possible answers.');
                }
                else {
                  currentQuestion.correctAnswer = correctAnswerParsed;
                }
              }
              else if (currentQuestion.type === QuestionType.TrueFalse) {
                let correctAnswerString: string = line.trim().substring(this.ML.CorrectAnswerTag.length, line.length).trim().toLowerCase();
                if (correctAnswerString.startsWith('f')) {
                  currentQuestion.correctAnswer = false;
                }
                else if (correctAnswerString.startsWith('t')) {
                  currentQuestion.correctAnswer = true;
                }
                else {
                  throwError('Could not parse correct answer into a boolean. For True/False questions, the correct answer line should consist of a variation of True, False, T, or F. This is not case sensitive. Any string beginning with T is parsed as True. Any string beginning with F is parsed as False');
                }
              }
            }
            else if (line.trim().startsWith(this.ML.FeedbackTag)) {
              try {
                currentQuestion.feedback = line.trim().substring(this.ML.FeedbackTag.length, line.length).trim();
              }
              catch (e) {
              }
            }
          }
        }
      }
      currentLine++;
    }

    console.log('Parsed Course:');
    console.log(course);
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
          let lesson: QuizQuestion = new QuizQuestion(lessonTitle, []);
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
