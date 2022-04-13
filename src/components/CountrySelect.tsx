import {
  Autocomplete,
  Box,
  TextField,
} from '@mui/material';
import {countries} from "../utils/data";

export default function CountrySelect(props: any) {
  let {value, setValue} = props;
  return (
    <Autocomplete
        id="country-select-demo"
        fullWidth
        sx={{mt:3}}
        options={countries}
        size="small"
        inputValue={value}
        onInputChange={(event, newInputValue) => {
          setValue(newInputValue);
        }}
        getOptionLabel={(option:any) => option.label}
        renderOption={(props, option:any) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0},bgcolor: "secondary.main"}} {...props}>
            <img
                loading="lazy"
                width="20"
                src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                alt=""
            />
            {option.label} ({option.code})
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          sx={{bgcolor: "secondary.main", borderRadius: 1, border: '1px solid #ced4da'}}
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill

          }}
        />
      )}
    />
  );
}