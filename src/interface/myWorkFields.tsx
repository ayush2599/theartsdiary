import { Timestamp } from "firebase/firestore";

export interface myWorkFields {
    title: string;
    description: string;
    year: number;
    category: string;
    size: string;
    imageLink: string;
    thumbLink: string;
    instaPostLink: string;
    isFeatured: boolean;
  }

export interface testimonialFields {
  name: string;
  review: string;
  reviewDate: Timestamp;
  stars: number;
  subHead: string;
  country: string;
  city: string;
  address: string;
  isImageReview: string;
  imageLink: string;
}