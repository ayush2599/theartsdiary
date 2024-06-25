export interface FAQItemFields {
    question: string;
    answer: string;
  }

  export interface FAQItem extends FAQItemFields {
    id: string | null; // This is the Firebase document ID
  }