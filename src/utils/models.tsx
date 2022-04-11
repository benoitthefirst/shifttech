export type ICreditCard = {
  id: string;
  nameOnCard: string;
  cardNumber: string;
  expiryDate: string;
  securityCode: string;
  country: string;
};

export enum CardBrand {
  visa="visa",
  masterCard="masterCard",
  discover="discover",
  americanExpress="americanExpress",
  dinersClub="dinersclub",
  jcb="jcb",
  invalid="invalid"
}

export interface CountryType {
  code: string;
  label: string;
  phone: string;
  suggested?: boolean;
}