export interface ImageType {
  _id: string;
  title: string;
  folder: string;
  image_url: string;
  created_at: Date;
}

export interface CreateImageDTO {
  title: string;
  folder: string;
  image_url: string;
}

export interface updateImageDTO {
  title?: string | undefined;
  folder?: string | undefined;
  image_url?: string | undefined;
}
