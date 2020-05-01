export class Citation {
  /**
   * @param citation: The actual citation as you would find in any citations/references section of a work, such as in MLA or APA format.
   * @param link: Optional. For citations that reside on the internet, such as articles, you may provide a URL string. This may also be used
   * to provide DOI links.
   */
  constructor(citation: string, link?: string) {
    this.citation = citation;
    this.link = link || undefined;
  }
  citation: string;
  link?: string;
}
