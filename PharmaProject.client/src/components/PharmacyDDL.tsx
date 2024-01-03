/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ValueOptions } from '@mui/x-data-grid';


interface PharmacyDDLProps {
    pharmacyKeys: ValueOptions[];
    setSelectedPharma: React.Dispatch<React.SetStateAction<string>>;
}

const PharmacyDDL: React.FC<PharmacyDDLProps> = ({ pharmacyKeys, setSelectedPharma }) => {
    const handleChange = (event: SelectChangeEvent) => {
        setSelectedPharma(event.target.value as string);
    };


    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Pharmacy</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={""}
                    label="Pharmacy"
                    onChange={handleChange}
                >
                    {pharmacyKeys.map((pharmacy: ValueOptions) => (
                        <MenuItem key={pharmacy.value} value={pharmacy.value}>
                            {pharmacy.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}

export default PharmacyDDL;