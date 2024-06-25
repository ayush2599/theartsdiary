import { myWorkFields } from "./myWorkFields";

export interface myWork extends myWorkFields{
  id: string | null; // This is the Firebase document ID
}