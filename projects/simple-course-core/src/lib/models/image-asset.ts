/**
 * ImageAsset is attached to a Section or other lesson component where allowed to display an image. It may be either displayed above, below,
 * to the left, or to the right based on the position parameter. An altText should always be supplied for accessibility. A caption may be
 * supplied if there is a need to show a caption separate from the altText, such as for photo accreditation.
 *
 * TODO: Implement externalUrl. externalUrl should provide an alternative to a local fileName to point to a remote image.
 *
 */

export class ImageAsset {
  constructor(fileName: string, position: ImageAssetPosition, altText: string, caption?: string, externalUrl?: string) {
    this.fileName = fileName;
    this.position = position;
    this.altText = altText;
    this.caption = caption || undefined;
    this.externalURL = externalUrl || undefined;
  }

  fileName: string;
  externalURL?: string;
  position: ImageAssetPosition;
  altText: string;
  caption: string;


}

export enum ImageAssetPosition {
  left = 'left',
  above = 'above',
  right = 'right',
  below = 'below'

}
