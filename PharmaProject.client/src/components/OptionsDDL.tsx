/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ValueOptions } from '@mui/x-data-grid';


interface OptionsDDL {
    valueKeys: ValueOptions[];
    setValue: React.Dispatch<React.SetStateAction<number>>;
    title: string;
    selectedValue: number;
}

const OptionsDDL: React.FC<OptionsDDL> = ({ valueKeys, setValue, title, selectedValue }) => {
    const handleChange = (event: SelectChangeEvent) => {
        setValue(Number(event.target.value));
    };


    return (
        <Box sx={{ minWidth: 120 }} >
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{title}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedValue}
                    label="Pharmacy"
                    onChange={handleChange}
                >
                    <MenuItem key={"All"} value={0}>
                        All {title == "Pharmacy" ? "Pharmacies" : title}
                    </MenuItem>
                    {valueKeys.map((keys: ValueOptions) => (
                        <MenuItem key={keys.value} value={keys.value}>
                            {keys.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}

export default OptionsDDL;