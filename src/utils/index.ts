import {useState} from "react";
import {CardBrand, ICreditCard} from "../utils/models";

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

  //Diners Club card starting with 300 through 305, 36, or 38, length 14 digits
  var dinersclubcardno = /^(?:3(?:0[0-5]|[68][0-9])[0-9]{0,11})$/;

  //JCB card starting with 2131 or 1800, length 15 digits or starting with 35, length 16 digits
  var jcbcardno = /^(?:(?:2131|1800|35\d{3})\d{0,11})$/;

  if(value.match(visacardno))
    _cardBrand = CardBrand.visa;
  else if(value.match(mastercardno))
    _cardBrand = CardBrand.masterCard;
  else if(value.match(americaExcardno))
    _cardBrand = CardBrand.americanExpress;
  else if(value.match(discovercardno))
    _cardBrand = CardBrand.discover;
  else if(value.match(dinersclubcardno))
    _cardBrand = CardBrand.dinersClub;
  else if(value.match(jcbcardno))
    _cardBrand = CardBrand.jcb;
  
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

  if(_cardBrand === CardBrand.visa || _cardBrand === CardBrand.masterCard || _cardBrand === CardBrand.discover  || _cardBrand === CardBrand.jcb){
    //for 4x4 cards
    block2 = value.substring(4,8);
    if(block2.length === 4)
      block2 = block2 + " ";

    block3 = value.substring(8,12);
    if(block3.length === 4)
      block3 = block3 + " ";

    block4 = value.substring(12,16);
  }
  else if(_cardBrand === CardBrand.americanExpress || _cardBrand === CardBrand.dinersClub){
    //for Amex cards
    block2 = value.substring(4,10);
    if(block2.length === 6)
      block2 = block2 + " ";

    block3 = value.substring(10,value.length);
    block4 = "";
  }
  else if(_cardBrand === CardBrand.invalid){
    //Invalid card number
    block1 = value;
    block2 = "";
    block3 = "";
    block4 = "";
  }
  return block1 + block2 + block3 + block4;
}

export const IsAnyNull = (fields: any) => {
    let _anyNull = true;

    switch(typeof(fields))
    {
      case "number":
      case "bigint":
      case "boolean":
        return false;
      case "string":
        return fields === null || fields === "" || fields === undefined;
      default:
        break;
    }
  
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

class CardDataStore {
  private readonly creditCardKey: string = "shifttech.credit_card";
  constructor(private store: Storage, data?: any) {
    if (data) this.update = data;
  }

  public get all() {
    const d = this.store.getItem(this.creditCardKey);

    if (d) return JSON.parse(d) as ICreditCard[];

    return new Array<ICreditCard>();
  }

  public set update(data: ICreditCard[] | ICreditCard) {

    if(!data)
      return;
      
    if((data as ICreditCard[]).length > 0)
    {
      this.store.setItem(this.creditCardKey, JSON.stringify(data));
    }else{
      const _cards = this.all;
      const _data = data as ICreditCard;
      const index = _cards.findIndex(x => x.cardNumber === _data.cardNumber);

      if(index == -1){
        _cards.push(_data)
      }else{
        _cards[index] = _data;
      }

      this.store.setItem(this.creditCardKey, JSON.stringify(_cards));
    }
  }

  public set delete(value: string){
    if(IsAnyNull(value))
      return;
    
    let _cards = this.all;
    let index = _cards.findIndex(x => x.cardNumber === value);

    if(index != -1){
      _cards.splice(index,1);
      this.store.setItem(this.creditCardKey, JSON.stringify(_cards));
    }
  }

  public clealAll() {
    this.update = new Array<ICreditCard>();
  }
}

export class SessionManager {
  private static readonly store: Storage = sessionStorage;

  /**
   * cards
   */
  public static cards(data?: any) {
    return new CardDataStore(SessionManager.store, data);
  }
}