import { commissionWorkFields } from "./commissionWorkFields";

export interface commissionWork extends commissionWorkFields{
    id: string | null; // This is the Firebase document ID
}