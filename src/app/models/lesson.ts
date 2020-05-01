import {Citation} from './citation';
import {ImageAsset} from './image-asset';
import {VideoAsset} from './video-asset';
import {Section} from './section';

/**
 * Video and ImageHeader cannot be defined at the same time. If they are both defined, the Video is prioritized.
 * There should only be one video per lesson.
 * For ImageHeaders, position is ignored.
 * Citations and sections should never be undefined. They should always at least be empty arrays.
 */

export class Lesson {
  constructor(title: string, video?: VideoAsset, imageHeader?: ImageAsset, citations?: Citation[], sections?: Section[]) {
    this.title = title;
    this.video = video || undefined;
    this.imageHeader = imageHeader || undefined;
    this.citations = citations || [];
    this.sections = sections || [];
  }
  title: string;
  video?: VideoAsset;
  imageHeader?: ImageAsset;
  citations?: Citation[];
  sections?: Section[];

  public setVideo(video: VideoAsset) {
    this.video = video;
  }
  public setHeader(header: ImageAsset) {
    this.imageHeader = header;
  }
}
