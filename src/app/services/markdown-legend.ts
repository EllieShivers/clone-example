export class MarkdownLegend {

  // Course Metadata Tags
  static readonly CourseTitle: string = '[COURSE_TITLE]';
  static readonly CreationDate: string = '[CREATION_DATE]';
  static readonly LastUpdate: string = '[LAST_UPDATED]';
  static readonly Authors: string = '[AUTHORS]';
  static readonly Description: string = '[DESCRIPTION]';

  static readonly LessonHeader: string = '##';
  static readonly SectionHeader: string = '#';


  static readonly TextLessonTag: string = '[TEXT]';
  static readonly VideoLessonTag: string = '[VIDEO]';
  static readonly QuizLessonTag: string = '';


  public UnitHeader: string = '###';


  static getErrorLineError(lineNo: number, line: string): string {
    // tslint:disable-next-line:max-line-length
    return 'Error at Line Number ' + lineNo + ': ' + line + ' -- Unable to parse Lesson Type. Lesson type should be tagged with [TEXT], [VIDEO], or [QUIZ]. NOTE: The line number does not account for empty lines in your document.';
  }
}
