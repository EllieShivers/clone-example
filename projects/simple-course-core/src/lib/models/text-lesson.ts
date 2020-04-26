import {Citation, Lesson, LessonType} from './lesson';
import {ImageAsset} from './image-asset';

export class TextLesson extends Lesson {
  constructor(title: string, sections: Section[], citations?: Citation[]) {
    super(title, citations || undefined);
    this.title = title;
    this.type = LessonType.Text;
    this.sections = sections;
  }
  //citations?: Citation[];
  sections: Section[];
}

export class Section {
  constructor(header: string, body: string[], imageAsset?: ImageAsset) {
    this.header = header;
    this.body = body;
    if (imageAsset) this.imageAsset = imageAsset;
  }
  header: string;
  body: string[];
  imageAsset?: ImageAsset;
}
