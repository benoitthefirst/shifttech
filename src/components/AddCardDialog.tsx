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
    TextField,
    FormControl,
    InputLabel,
    Box,
    Typography,
    FormHelperText,
    Alert
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CreditCard from './CreditCard';
import CustomInput from "./CustomInput";
import {UseInput, IsAnyNull, SessionManager} from "../utils";
import CountrySelect from "./CountrySelect";
import { ICreditCard } from '../utils/models';

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
}

const AddCardDialog: React.FunctionComponent<DialogProps> = (props) => {
    const [nameOnCardError, setNameOnCardError] = useState("");
    const [cardNumberError, setCardNumberError] = useState("");
    const [securityCodeError, setSecurityCodeError] = useState("");
    const [expiryDateError, setExpiryDateError] = useState("");
    const [countryError, setCountryError] = useState("");
    const [error, setError] = useState("");
    //const [country, setCountry] = useState("");

    const nameOnCard = UseInput("");
    const cardNumber = UseInput("",16,true);
    const securityCode = UseInput("",3,true);
    const expiryDate = UseInput("",5,true,true);
    const country = UseInput("");

    const { setOpen, open, setData } = props;

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

        if (IsAnyNull(expiryDate.value)) {
            setExpiryDateError("Expiry date is required");
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

    const clearAll = () => {
        nameOnCard.setValue("");
        cardNumber.setValue("");
        securityCode.setValue("");
        expiryDate.setValue("");
        country.setValue("");
    }

    const onSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
    
        //handle input validation
        if(!validate()) return;

        let data = SessionManager.cards().all as ICreditCard[];
        
        //TO-DO: Check the specified country to make sure it doesn’t exist in a list of banned countries.
        
        //Don’t capture the same card twice.
        let found = data.find(x => x.cardNumber === cardNumber.value);
        if(found) return setError("Credit card all ready added!");

        setError("");

        //after success validation
        const model: ICreditCard = {
            nameOnCard: nameOnCard.value,
            cardNumber: cardNumber.value,
            expiryDate: expiryDate.value,
            securityCode: securityCode.value,
            country: country.value
        };

        //If the card is valid – store it somewhere for the session.
        SessionManager.cards().update = model;

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
                            <FormHelperText color='darkRed'>{nameOnCardError}</FormHelperText>
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
                                value={cardNumber.value} 
                                onChange={cardNumber.onChange}/>
                            <FormHelperText color='darkRed'>{cardNumberError}</FormHelperText>
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
                            <FormHelperText color='darkRed'>{expiryDateError}</FormHelperText>
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
                            <FormHelperText color='darkRed'>{securityCodeError}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel shrink htmlFor="bootstrap-input">
                                Country
                            </InputLabel>
                            <CountrySelect value={country.value} required setValue={country.setValue}/>
                            <FormHelperText color='darkRed'>{countryError}</FormHelperText>
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
