import React, {useState} from 'react'
import { Box, Button, Paper, Container, Grid, Stack, Typography } from '@mui/material'
import {Add as AddIcon} from '@mui/icons-material';
import CreditCard from "../components/CreditCard";
import AddCardDialog from '../components/AddCardDialog';
import {ICreditCard} from "../utils/models";

export default function Home() {
    const [openDialog, setDialog] = useState(false);
    const [data, setData] = useState<ICreditCard>();
  return (
    <Container fixed>
        <Box sx={{ minHeight: '100vh', py:5 }}>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
                spacing={2}
                marginBottom={2}>
                <Typography variant="h6" gutterBottom component="div">
                    Credits Cards
                </Typography>
                <Button variant="contained" startIcon={<AddIcon />} size="small" onClick={() => setDialog(true)}>
                    Add
                </Button>
            </Stack>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={8} md={12} lg={8}>
                    <Grid container spacing={2}>
                        {
                            Array.from(new Array(4)).map((item: any, index: any) => (
                                <Grid item key={index} xs={12} sm={12} md={6} lg={6}>
                                    <CreditCard {...item} HasMore={true}  NameOnCard="Benoit Richard" CardNumber="0000 0000 0000 0000" ExpiryDate="MM/YY"/>
                                </Grid>
                            ))
                        }
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={4} md={12} lg={4}>
                    <Paper sx={{bgcolor: "secondary.main", p:2}}>
                        <Typography variant="h6" gutterBottom component="div">
                            Banned Countries
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
        <AddCardDialog setData={setData} setOpen={setDialog} open={openDialog}/>
    </Container>
  )
}
