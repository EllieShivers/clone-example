import {Citation, Lesson, LessonType} from './lesson';

export class VideoLesson extends Lesson {
  constructor(title: string, videoEmbedCode: string, transcript:string[], citations?: Citation[]) {
    super(title, citations || undefined);
    this.type = LessonType.Video;
    this.videoEmbedCode = videoEmbedCode;
    this.transcript = transcript;
  }
  videoEmbedCode: string;
  transcript: string[]; // New paragraph is a new item in the array
}
