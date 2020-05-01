export class MarkdownLegend {

  /**
   * Metadata Related Tags
   */
  static readonly CourseTitle: string = '[COURSE_TITLE]';
  static readonly CreationDate: string = '[CREATION_DATE]';
  static readonly LastUpdate: string = '[LAST_UPDATED]';
  static readonly Authors: string = '[AUTHORS]';
  static readonly Description: string = '[DESCRIPTION]';

  static readonly Introduction: string = '[INTRODUCTION]';

  /**
   * Tier Delineation Tags.
   */
  static readonly UnitTag: string = '#';
  static readonly LessonTag: string = '##';
  static readonly SectionTag: string = '###';

  /**
   * Video and Image Header Related Tags
   */
  static readonly ImageHeaderTag: string = '[IMAGE_HEADER]';
  static readonly VideoTag: string = '[VIDEO]';
  // noinspection JSUnusedGlobalSymbols
  static readonly TranscriptTag: string = '[TRANSCRIPT]';

  /**
   * Quiz Related Tags
   */
  static readonly QuizTag: string = '[QUIZ]';
  static readonly QuestionTag: string = '[QUESTION]';
  static readonly MultipleChoiceTag: string = '[MC]';
  static readonly TrueFalseTag: string = '[TF]';
  static readonly AnswerTag: string = '[ANSWER]';
  static readonly CorrectAnswerTag: string = '[CORRECT_ANSWER]';
  static readonly FeedbackTag: string = '[FEEDBACK]';
}
