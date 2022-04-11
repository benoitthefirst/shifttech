import { IconButton, Grid, Paper, Stack, Typography } from '@mui/material'
import {Delete as DeleteIcon} from '@mui/icons-material';
import moment from 'moment';
import ChipIcon from "../assets/chip.svg";
import BrandIcon from "./BrandIcon";
import {IsAnyNull,FormatCardNumber, SessionManager} from "../utils"

export default function CreditCard({
    Width,
    NameOnCard,
    CardNumber,
    ExpiryDate,
    HasMore,
    setData
}: any) {
    
    const onDelete = (value: string) => {

        if(!IsAnyNull(value)){
            SessionManager.cards().delete = value;
            setData(SessionManager.cards().all);
        }
    }
    
  return (
    <Paper sx={{ display: 'flex', flexDirection: 'column', justifyContent: "space-between", bgcolor: "secondary.main", borderRadius:2, height:220, width: Width, p:2}} >
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
            width="100%">
            <img src={ChipIcon} alt="chip icon" style={{height: 50}}/>
            {HasMore === true ? (
                <IconButton aria-label="fingerprint" color="primary" onClick={() => onDelete(CardNumber)}>
                    <DeleteIcon />
                </IconButton>
            ) : ""}
        </Stack>
        <Typography variant="h4" component="div" align="left">
            {CardNumber > 0 ? FormatCardNumber(CardNumber) : "0000 0000 0000 0000"}
        </Typography>
        <Grid container spacing={1} alignItems="center">
            <Grid item xs={6} sm={7}>
                <Typography variant="h6" gutterBottom component="div">
                    {!IsAnyNull(NameOnCard) ? NameOnCard.toUpperCase() : "JANE DOE"}
                </Typography>
            </Grid>
            <Grid item xs={3} sm={3}>
                <Typography variant="h6" gutterBottom component="div">
                    {!IsAnyNull(ExpiryDate) ? ExpiryDate : "MM/YY"}
                </Typography>
            </Grid>
            <Grid item xs={2}>
                <BrandIcon CardNumber={CardNumber}/>
            </Grid>
        </Grid>
    </Paper>
  )
}
