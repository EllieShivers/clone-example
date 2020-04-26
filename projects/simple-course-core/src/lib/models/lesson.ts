

export class Lesson {
  constructor(title: string, citations?: Citation[]) {
    this.title = title;
    if (citations) this.citations = citations;
  }
  type: LessonType;
  title: string;
  citations?: Citation[];
}

export enum LessonType {
  Text = "text",
  Video = "video",
  Quiz = "quiz"
}

export class Citation {
  constructor(apaString: string, link?: string) {
    this.apaString = apaString;
    if (link) this.link = link;
  }
  apaString?: string;
  link?: string;
}
