/**
 * ImageAsset is attached to a Section or other lesson component where allowed to display an image. It may be either displayed above, below,
 * to the left, or to the right based on the position parameter. An altText should always be supplied for accessibility. A caption may be
 * supplied if there is a need to show a caption separate from the altText, such as for photo accreditation.
 *
 * ImageAssets are also used to store the header images when used for a lesson.
 *
 * TODO: Implement externalUrl. externalUrl should provide an alternative to a local fileName to point to a remote image.
 *
 */
export class ImageAsset {
  constructor(fileName: string, altText: string, position?: ImageAssetPosition, caption?: string) {
    this.fileName = fileName;
    this.altText = altText;
    this.position = position || undefined;
    this.caption = caption || undefined;
  }

  fileName: string;
  altText: string;
  position?: ImageAssetPosition;
  caption?: string;
}

enum ImageAssetPosition {
  // noinspection JSUnusedGlobalSymbols
  left = 'left',
  above = 'above',
  right = 'right',
  below = 'below'
}
