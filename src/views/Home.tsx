import React, {useState} from 'react'
import { 
    Box, 
    Button, 
    Collapse,
    IconButton,
    Paper, 
    Container, 
    Grid, 
    Stack, 
    ListItemButton, 
    List, 
    ListSubheader, 
    ListItemText, 
    ListItemIcon,
    Slide,
    SlideProps,
    Snackbar,
    Typography,
    Alert,
    AlertColor, 
} from '@mui/material'
import {Add as AddIcon, Delete as DeleteIcon} from '@mui/icons-material';
import CreditCard from "../components/CreditCard";
import AddCardDialog from '../components/AddCardDialog';
import {GetCountry, SessionManager, IsAnyNull} from "../utils";
import {ICreditCard, Country} from "../utils/models";
import bannedCountries from "../assets/bannedCountries.json";
import CountrySelect from "../components/CountrySelect";

type TransitionProps = Omit<SlideProps, 'direction'>;

function TransitionLeft(props: TransitionProps) {
    return <Slide {...props} direction="right" />;
}

export default function Home() {
    const jsonData = bannedCountries as Array<Country>;
    const _bannedList = SessionManager.bannedCountries(jsonData);
    const [openDialog, setDialog] = useState(false);
    const [open, setOpen] = useState(false);
    const [showSnack, setShowSnack] = useState(false);
    const [snackMessage, setSnackMessage] = useState("");
    const [severity, setSeverity] = useState<AlertColor>("success");
    const [country, setCountry] = React.useState<string | null>("");
    const [data, setData] = useState<Array<ICreditCard>>(SessionManager.cards().all);
    const [banned, setBanned] = useState<Array<Country>>(_bannedList.getBannedList());
    const [transition, setTransition] = React.useState<React.ComponentType<TransitionProps> | undefined>(undefined);

    const updateBannedList = () => {

        if(IsAnyNull(country))
            return;

        let found = banned.find((x: Country) => x.label === country);
        if(found){
            setSeverity("error");
            setSnackMessage(`${country} is already part of the banned countries.`);
            setTransition(() => TransitionLeft);
            setShowSnack(true);
            return;
        }

        let _country = GetCountry(country as string);

        if(_country){
            _bannedList.add(_country);
            setBanned(_bannedList.getBannedList());
            setOpen(false);

            setSeverity("success");
            setSnackMessage(`${country} has been added to banned list.`);
            setTransition(() => TransitionLeft);
            setShowSnack(true);
        }


        setCountry("");
    }

    const removeFromBannedList = (value: string) => {
        if(IsAnyNull(value))
            return;

        _bannedList.delete(value);
        setBanned(_bannedList.getBannedList());

        setSeverity("success");
        setSnackMessage(`${value} has been removed from the list of banned countries.`);
        setTransition(() => TransitionLeft);
        setShowSnack(true);
    }

    return (
        <Container fixed>
            <Box sx={{ minHeight: '100vh', py:5 }}>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    spacing={2}
                    marginBottom={2}>
                    <Typography variant="h5" gutterBottom component="div">
                        Credits Cards
                    </Typography>
                    <Button variant="contained" startIcon={<AddIcon />} size="small" onClick={() => setDialog(true)}>
                        Add
                    </Button>
                </Stack>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={8} md={12} lg={8}>
                        <Grid container spacing={2}>
                            {data && 
                                data.map((item: ICreditCard, index: any) => (
                                    <Grid item key={index} xs={12} sm={12} md={6} lg={6}>
                                        <CreditCard HasMore={true}  NameOnCard={item.nameOnCard} CardNumber={item.cardNumber} ExpiryDate={item.expiryDate} setData={setData}/>
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={4} md={12} lg={4}>
                        <Paper sx={{bgcolor: "secondary.main", p:2}}>
                            <List
                                sx={{ 
                                    width: '100%', 
                                    overflow: 'auto',
                                    maxHeight: 350,
                                    bgcolor: 'secondary.main' 
                                }}
                                component="nav"
                                aria-labelledby="nested-list-subheader"
                                subheader={
                                    <ListSubheader component="div" id="nested-list-subheader" sx={{bgcolor: 'secondary.main' }}>
                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="flex-start"
                                            spacing={2}
                                            marginBottom={0}>
                                            Banned Countries
                                            <Button 
                                                variant="contained" 
                                                startIcon={<AddIcon />} 
                                                size="small" 
                                                color={open ? "error" : "primary"} 
                                                disabled={open && IsAnyNull(country)}
                                                onClick={open ? updateBannedList : () => setOpen(true)}>
                                                {open ? "Ban" : ""}
                                            </Button>
                                        </Stack>
                                        <Collapse in={open} sx={{mt:0}}>
                                            <CountrySelect mt={0} value={country} setValue={setCountry}/>
                                        </Collapse>
                                    </ListSubheader>
                                }
                                >
                                {banned && 
                                    banned.map((item, index: any) => (
                                        <ListItemButton key={index} >
                                            <ListItemIcon>
                                                <img
                                                    loading="lazy"
                                                    width="20"
                                                    src={`https://flagcdn.com/w20/${item.code.toLowerCase()}.png`}
                                                    srcSet={`https://flagcdn.com/w40/${item.code.toLowerCase()}.png 2x`}
                                                    alt={item.label}
                                                />
                                            </ListItemIcon>
                                            <ListItemText primary={item.label} />
                                            <IconButton aria-label="delete" color="error" onClick={() => removeFromBannedList(item.label)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </ListItemButton>
                                    ))}
                            </List>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
            <AddCardDialog bannedList={banned} setData={setData} setOpen={setDialog} open={openDialog}/>
            <Snackbar
                open={showSnack}
                onClose={() => setShowSnack(false)}
                TransitionComponent={transition}
                autoHideDuration={3000}
                key={transition ? transition.name : ''}>
                <Alert onClose={() => setShowSnack(false)} severity={severity} variant="filled" sx={{ width: '100%' }}>
                    {snackMessage}
                </Alert>
            </Snackbar>
        </Container>
    )
}
