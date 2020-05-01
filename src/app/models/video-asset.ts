/**
 *
 * @param videoEmbedCode
 * @param transcript
 *<iframe id="ytplayer" type="text/html" width="720" height="405" src="https://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1" frameborder="0" allowfullscreen>
 *   Handle converting normal youtube urls to embed urls too.
 * TODO: Set it up to automatically handle embed code for youtube if only the address is passed.
 */

export class VideoAsset {
  videoEmbedCode: string;
  transcript?: string[]; // New paragraph is a new item in the array

  constructor(videoEmbedCode: string, transcript?: string[]) {
    this.videoEmbedCode = videoEmbedCode;
    this.transcript = transcript || undefined;
  }
}
