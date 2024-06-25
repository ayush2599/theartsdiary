import { Timestamp } from "firebase/firestore";

export interface testimonialFields {
    name: string;
    review: string;
    reviewDate: string;
    stars: number;
    subHead: string;
    country: string;
    city: string;
    address: string;
    isImageReview: boolean;
    imageLink: string;
  }