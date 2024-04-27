import { myWorkFields, testimonialFields } from "./myWorkFields";

export interface myWork extends myWorkFields{
  id: string | null; // This is the Firebase document ID
}

export interface testimonial extends testimonialFields{
  id: string | null; // This is the Firebase document ID
}