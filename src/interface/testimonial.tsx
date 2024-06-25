import { testimonialFields } from "./testimonialFields";

export interface testimonial extends testimonialFields{
  id: string | null; // This is the Firebase document ID
}