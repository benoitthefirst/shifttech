import React, {useState} from 'react'
import { styled } from '@mui/material/styles';
import { 
    Button,
    Collapse,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Grid,
    Stack,
    FormControl,
    InputLabel,
    FormHelperText,
    Alert
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CreditCard from './CreditCard';
import CustomInput from "./CustomInput";
import {UseInput, FormatCardNumber,CardNumberLimit, IsAnyNull, SessionManager} from "../utils";
import CountrySelect from "./CountrySelect";
import { ICreditCard, Country } from '../utils/models';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2, bgcolor: "secondary.main" }} {...other}>
        {children}
        {onClose ? (
            <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
            }}
            >
            <CloseIcon />
            </IconButton>
        ) : null}
        </DialogTitle>
    );
};

interface DialogProps {
    setOpen: (isOpen: boolean) => void;
    open: boolean;
    setData: any;
    bannedList: any;
}

const AddCardDialog: React.FunctionComponent<DialogProps> = ({ setOpen, open, setData, bannedList }) => {
    const [nameOnCardError, setNameOnCardError] = useState("");
    const [cardNumberError, setCardNumberError] = useState("");
    const [securityCodeError, setSecurityCodeError] = useState("");
    const [expiryDateError, setExpiryDateError] = useState("");
    const [countryError, setCountryError] = useState("");
    const [error, setError] = useState("");

    const nameOnCard = UseInput("");
    const cardNumber = UseInput("",16,true);
    const securityCode = UseInput("",3,true);
    const expiryDate = UseInput("",5,true,true);
    const country = UseInput("");

    const onClose = () => {
      setOpen(false);
    };

    const validate = () => {
        setNameOnCardError("");
        setCardNumberError("");
        setExpiryDateError("");
        setSecurityCodeError("");
        setCountryError("");

        if (IsAnyNull(nameOnCard.value)) {
            setNameOnCardError("Name is required");
            return false;
        }

        if (IsAnyNull(cardNumber.value)) {
            setCardNumberError("Card number is required");
            return false;
        }
        let limit = CardNumberLimit(cardNumber.value);
        if(cardNumber.value.length < limit)
        {
            setError("The credit card number you entered is invalid. Please check your card and try again.");
            return false;
        }

        let year = new Date().getFullYear();
        if (IsAnyNull(expiryDate.value)) {
            setExpiryDateError("Expiry date is required");
            return false;
        }else if(Number(expiryDate.value.substring(3,5)) < year%100){
            setExpiryDateError("You entered an expiration that has already passed.");
            return false;
        }

        if (IsAnyNull(securityCode.value)) {
            setSecurityCodeError("Security code is required");
            return false;
        }

        if (IsAnyNull(country.value)) {
            setCountryError("Country of region is required");
            return false;
        }

        return true;
    }

    const isCoutryBanned = (value: string) => {
        var found = bannedList.find((x: Country) => x.label === value);
        if(found){
            setError(`Shift Tech is currently not available in your country or region of ${value}!`);
            return true;
        }

        setError(""); //clear errors
        return false;
    }

    const cardExist = (value: string) => {
        let data = SessionManager.cards().all as ICreditCard[];
        let found = data.find(x => x.cardNumber === value);
        if(found){
            setError("Credit card already added, trying using a different credit card!");
            return true;
        }

        setError("");; //clear errors
        return false;
    }

    const clearAll = () => {
        nameOnCard.setValue("");
        cardNumber.setValue("");
        securityCode.setValue("");
        expiryDate.setValue("");
        country.setValue("");
    }

    const onSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        setError("");

        //handle input validation
        if(!validate()) return;
        
        //Check the specified country to make sure it doesn’t exist in a list of banned countries.
        if(isCoutryBanned(country.value)) return;

        //Don’t capture the same card twice.
        if(cardExist(cardNumber.value)) return;

        //after success validation
        const model: ICreditCard = {
            nameOnCard: nameOnCard.value,
            cardNumber: cardNumber.value,
            expiryDate: expiryDate.value,
            securityCode: securityCode.value,
            country: country.value
        };

        //If the card is valid – store it somewhere for the session.
        SessionManager.cards().update.add(model);
        setData(SessionManager.cards().all);

        clearAll();
        onClose();
    };

    return (
        <BootstrapDialog
            onClose={(onClose)}
            aria-labelledby="customized-dialog-title"
            open={open}
            >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={onClose}>
                Add New Card
            </BootstrapDialogTitle>
            <DialogContent dividers sx={{bgcolor: "background.default"}}>
                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={1}
                    marginBottom={2}
                    >
                    <CreditCard Width={350} HasMore={false} NameOnCard={nameOnCard.value} CardNumber={cardNumber.value} ExpiryDate={expiryDate.value}/>
                </Stack>
                <Collapse in={IsAnyNull(error) ? false : true}>
                    <Alert variant="filled" severity="error" sx={{mb: 2}}>{error}</Alert>
                </Collapse>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel shrink htmlFor="bootstrap-input">
                                Name on card
                            </InputLabel>
                            <CustomInput 
                                fullWidth 
                                placeholder="Jane Doe" 
                                required
                                value={nameOnCard.value} 
                                onChange={nameOnCard.onChange}/>
                            <FormHelperText error={true}>{nameOnCardError}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel shrink htmlFor="bootstrap-input">
                                Card number
                            </InputLabel>
                            <CustomInput 
                                fullWidth 
                                placeholder="0000 0000 0000 0000" 
                                type="text"
                                required
                                value={FormatCardNumber(cardNumber.value)} 
                                onChange={cardNumber.onChange}/>
                            <FormHelperText error={true}>{cardNumberError}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel shrink htmlFor="bootstrap-input">
                                Expiry date
                            </InputLabel>
                            <CustomInput 
                                fullWidth 
                                placeholder="MM/YY"
                                required
                                value={expiryDate.value} 
                                onChange={expiryDate.onChange}/>
                            <FormHelperText  error={true}>{expiryDateError}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel shrink htmlFor="bootstrap-input">
                                Security code
                            </InputLabel>
                            <CustomInput 
                                fullWidth 
                                placeholder="CVV"
                                type="text"
                                required
                                value={securityCode.value} 
                                onChange={securityCode.onChange}/>
                            <FormHelperText  error={true}>{securityCodeError}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel shrink htmlFor="bootstrap-input">
                                Country
                            </InputLabel>
                            <CountrySelect value={country.value} required setValue={country.setValue}/>
                            <FormHelperText  error={true}>{countryError}</FormHelperText>
                        </FormControl>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions sx={{bgcolor: "secondary.main" }}>
                <Button autoFocus onClick={onSubmit}>
                    Save
                </Button>
            </DialogActions>
        </BootstrapDialog>
    );
}

export default AddCardDialog;
