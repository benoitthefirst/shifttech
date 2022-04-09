import {useState} from "react";

export function CardNumberValidator(inputtxt: any)
{
    let _isValid = false;

    if (isAnyNull(inputtxt)) return false;

    var cardno = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
    if(inputtxt.value.match(cardno))
    {
      _isValid = true;
    }
    else
    {
        alert("Not a valid Visa credit card number!");
        _isValid = false;
    }

    return _isValid;
}

export const isAnyNull = (fields: any) => {
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

export const UseInput = (defaultValue: any) => {
  const [value, setValue] = useState(defaultValue);

  const onChange = ({ target }: any) => setValue(target.value);

  return {value, setValue, onChange};
}