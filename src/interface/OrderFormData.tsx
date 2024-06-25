export interface OrderFormDataField {
    artworkType: string;
    communication: string;
    contactNumber: string;
    countryCode: string;
    deliveryLocation: string;
    description: string;
    email: string;
    instagramUsername: string;
    name: string;
    referenceImages: string[];
  }

export interface OrderFormData extends OrderFormDataField{
  id: string | null; // This is the Firebase document ID
}
