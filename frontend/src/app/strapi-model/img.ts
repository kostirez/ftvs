
export interface Img {
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: {
    [k in ImgFormatType]: ImgFormat
  },
  hash: string;
  ext: string;
  mime: string;
  size: string;
  url: string;
  previewUrl: string;
  provider: string;
  provider_metadata: string;
  createdAt: Date;
  updatedAt: Date;
}


export interface ImgFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  url: string;
}

export type ImgFormatType = "thumbnail";
