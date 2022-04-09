import React, {useEffect, useState} from 'react'
import { styled } from '@mui/material/styles';
import { 
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Grid,
    Stack,
    Typography,
    FormControl,
    InputLabel
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CreditCard from './CreditCard';
import CustomInput from "./CustomInput";
import {UseInput} from "../utils";

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
    const nameOnCard = UseInput("");
    const cardNumber = UseInput("");
    const expiryDate = UseInput("");
    const securityCode = UseInput("");
    const country = UseInput("");

    const { setOpen, open, setData } = props;

    const handleClose = () => {
      setOpen(false);
    };
  
    return (
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
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
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel shrink htmlFor="bootstrap-input">
                                Name on card
                            </InputLabel>
                            <CustomInput fullWidth placeholder="Jane Doe" value={nameOnCard.value} onChange={nameOnCard.onChange}/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel shrink htmlFor="bootstrap-input">
                                Card number
                            </InputLabel>
                            <CustomInput fullWidth placeholder="0000 0000 0000 0000"  value={cardNumber.value} onChange={cardNumber.onChange}/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel shrink htmlFor="bootstrap-input">
                                Expiry date
                            </InputLabel>
                            <CustomInput fullWidth placeholder="MM/YY"  value={expiryDate.value} onChange={expiryDate.onChange}/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel shrink htmlFor="bootstrap-input">
                                Security code
                            </InputLabel>
                            <CustomInput fullWidth placeholder="CVV" value={securityCode.value} onChange={securityCode.onChange}/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel shrink htmlFor="bootstrap-input">
                                Country
                            </InputLabel>
                            <CustomInput fullWidth placeholder="e.g. UK"  value={country.value} onChange={country.onChange}/>
                        </FormControl>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions sx={{bgcolor: "secondary.main" }}>
                <Button autoFocus onClick={handleClose}>
                    Save
                </Button>
            </DialogActions>
        </BootstrapDialog>
    );
}

export default AddCardDialog;
