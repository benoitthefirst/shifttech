import React from 'react';
import VisaIcon from "../assets/visa.svg";
import MastercardIcon from "../assets/mastercard.svg";
import DiscoverIcon from "../assets/discover.svg";
import AmericanExpressIcon from "../assets/american-express.svg";
import {CardBrandValidator} from "../utils";
import { CardBrand } from '../utils/models';

export default function BrandIcon({CardNumber}:any) {
    let _cardBrand = CardBrandValidator(CardNumber);

    const GetSource = () => {
        switch(_cardBrand){
            case CardBrand.visa:
                return VisaIcon;
            case CardBrand.masterCard:
                return MastercardIcon;
            case CardBrand.discover:
                return DiscoverIcon;
            case CardBrand.americanExpress:
                return AmericanExpressIcon;
            default:
                return MastercardIcon;
        }
    }
  return (
    <img src={GetSource()} alt="card brand" style={{height: 50}}/>
  )
}