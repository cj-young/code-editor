import { Timestamp } from '@angular/fire/firestore';

export type SparkModel = {
  code: {
    css: string;
    html: string;
    javascript: string;
  };
  creatorName?: string;
  imageUrl?: string;
  isInGallery: boolean;
  name: string;
  id?: string;
  createdAt: Timestamp;
  views?: number;
};
