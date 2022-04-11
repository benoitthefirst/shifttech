import {useState} from "react";
import {CardBrand} from "../utils/models";
import moment from 'moment';

export function CardBrandValidator(value: string)
{
  if (IsAnyNull(value)) return CardBrand.invalid;
  
  //supports Amex, Master Card, Visa, and Discover
  let _cardBrand = CardBrand.invalid;

  //visa, starts with 4 
  var visacardno = /^(?:4[0-9]{0,12}(?:[0-9]{3})?)$/;
  //mc, starts with 51 to 55 
  var mastercardno = /^(?:5[1-5][0-9]{0,14})$/;
  //Amex, starts with 34 or 37 
  var americaExcardno = /^(?:3[47][0-9]{0,13})$/;
  //dsc, starts with 6011, 622126-622925, 644-649, 65 
  var discovercardno = /^(?:6(?:011|5[0-9][0-9])[0-9]{0,12})$/;

  if(value.match(visacardno))
    _cardBrand = CardBrand.visa;
  else if(value.match(mastercardno))
    _cardBrand = CardBrand.masterCard;
  else if(value.match(americaExcardno))
    _cardBrand = CardBrand.americanExpress;
  else if(value.match(discovercardno))
    _cardBrand = CardBrand.discover;
  
  return _cardBrand;
}

export function FormatCardNumber(value: string){
  let _cardBrand = CardBrandValidator(value);

  var block1 = "";
  var block2 = "";
  var block3 = "";
  var block4 = "";

  //all support card types have a 4 digit first block
  block1 = value.substring(0,4);
  if(block1.length === 4)
    block1 = block1 + ' ';

  if(_cardBrand === CardBrand.visa || _cardBrand === CardBrand.masterCard || _cardBrand === CardBrand.discover){
    //for 4x4 cards
    block2 = value.substring(4,8);
    if(block2.length === 4)
      block2 = block2 + " ";

    block3 = value.substring(8,12);
    if(block3.length === 4)
      block3 = block3 + " ";

    block4 = value.substring(12,16);
  }
  else if(_cardBrand === CardBrand.americanExpress){
    //for Amex cards
    block2 = value.substring(4,10);
    if(block2.length === 6)
      block2 = block2 + " ";

    block3 = value.substring(10,15);
    block4 = "";
  }
  else if(_cardBrand === CardBrand.invalid){
    //Invalid card number
    block1 = _cardBrand;
    block2 = "";
    block3 = "";
    block4 = "";
  }
  return block1 + block2 + block3 + block4;
}

export const IsAnyNull = (fields: any) => {
    let _anyNull = true;
  
    if (!fields) return true;
  
    for (let field of fields) {
      _anyNull =
        !field ||
        field === "" ||
        field === "null" ||
        field === null ||
        field === "undefined" ||
        field === undefined;
  
      if (_anyNull) return _anyNull;
    }
  
    return _anyNull;
};

export const UseInput = (defaultValue: any, limit = 0, isNumber = false, isExpireDate = false) => {
  const [value, setValue] = useState(defaultValue);

  const onChange = ({ target }: any) => {
    let _value = target.value;

    if(isNumber === true)
      _value = _value.replace(/[^0-9.]/g,"").toString();

    if(isExpireDate === true)
    {
      let month = "";
      let year = "";
      let seperator = "/";
      if(_value.length === 0)
        _value = "";

      month = _value.substring(0,2);
      if(month === "00" || Number(month) > 12)
        month = "01";

      year = _value.substring(2,4);

      if(_value.length < 3)
      {
        _value = month;
        year = "";
        seperator = "";
      }
      
      _value = month + seperator + year;
    }
    
    if(limit > 0)
      _value = _value.substring(0,limit);

    return setValue(_value);
  }

  return {value, setValue, onChange};
}