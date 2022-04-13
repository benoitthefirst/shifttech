import {useState} from 'react'
import { 
    Box, 
    Button, 
    Collapse,
    Paper, 
    Container, 
    Grid, 
    Stack, 
    Typography, 
    ListItemButton, 
    List, 
    ListSubheader, 
    ListItemText, 
    ListItemIcon 
} from '@mui/material'
import {Add as AddIcon} from '@mui/icons-material';
import CreditCard from "../components/CreditCard";
import AddCardDialog from '../components/AddCardDialog';
import {GetCountry, SessionManager, BannedList, UseInput, IsAnyNull} from "../utils";
import {ICreditCard, Country} from "../utils/models";
import bannedCountries from "../assets/bannedCountries.json";
import CountrySelect from "../components/CountrySelect";

export default function Home() {
    var jsonData = bannedCountries as Array<Country>;
    var _bannedList = BannedList(jsonData);

    const [openDialog, setDialog] = useState(false);
    const [open, setOpen] = useState(false);
    const [data, setData] = useState<Array<ICreditCard>>(SessionManager.cards().all);
    const [banned, setBanned] = useState<Array<Country>>(_bannedList.getBannedList());

    const country = UseInput("");


    const updateBannedList = () => {

        if(IsAnyNull(country.value))
            return;

        let found = banned.find((x: Country) => x.label === country.value);
        if(found) return;

        let _country = GetCountry(country.value);

        if(_country){
            _bannedList.add(_country);
            setBanned(_bannedList.getBannedList());
            setOpen(false);
            country.setValue("");
        }
        
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
                                    maxHeight: 300,
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
                                                onClick={open ? updateBannedList : () => setOpen(true)}>
                                                {open ? "Ban" : ""}
                                            </Button>
                                        </Stack>
                                        <Collapse in={open}>
                                            <CountrySelect mt={0} value={country.value} required setValue={country.setValue}/>
                                        </Collapse>
                                    </ListSubheader>
                                }
                                >
                                {banned && 
                                    banned.map((item, index: any) => (
                                        <ListItemButton key={index}>
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
                                        </ListItemButton>
                                    ))}
                            </List>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
            <AddCardDialog bannedList={banned} setData={setData} setOpen={setDialog} open={openDialog}/>
        </Container>
    )
}
