import React, {useEffect, useState} from 'react'
import { IconButton, Paper, Stack, Typography } from '@mui/material'
import {MoreVert as MoreVertIcon} from '@mui/icons-material';
import ChipIcon from "../assets/chip.svg";
import VisaIcon from "../assets/visa.svg";
import MastcardIcon from "../assets/mastercard.svg";
import DiscoverIcon from "../assets/discover.svg";
import AmericanExpressIcon from "../assets/american-express.svg";
import {CardNumberValidator, isAnyNull} from "../utils"

export default function CreditCard({
    Width,
    NameOnCard,
    CardNumber,
    ExpiryDate,
    HasMore
}: any) {
    const [cardNumber, setCardNumber] = useState("");
    const [brand, setBrand] = useState("");

    //var isValid = CardNumberValidator(CardNumber);
    useEffect(() => {
        setCardNumber(CardNumber);
    }, [CardNumber])
    
  return (
    <Paper sx={{ display: 'flex', flexDirection: 'column', justifyContent: "space-between", bgcolor: "secondary.main", borderRadius:2, height:220, width: Width, p:2}} >
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
            width="100%">
            <img src={ChipIcon} alt="chip icon" style={{height: 50}}/>
            {HasMore == true ? (
                <IconButton aria-label="fingerprint" color="primary">
                    <MoreVertIcon />
                </IconButton>
            ) : ""}
        </Stack>
        <Typography variant="h4" component="div" align="left">
            {!isAnyNull(CardNumber) ? CardNumber : "0000 0000 0000 0000"}
        </Typography>
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
            width="100%">
            <Typography variant="h6" gutterBottom component="div">
                {!isAnyNull(NameOnCard) ? NameOnCard : "Jane Done"}
            </Typography>
            <Typography variant="h6" gutterBottom component="div">
                {!isAnyNull(ExpiryDate) ? ExpiryDate : "MM/YY"}
            </Typography>
            <img src={MastcardIcon} alt="card brand" style={{height: 50}}/>
        </Stack>
    </Paper>
  )
}
