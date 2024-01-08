/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ValueOptions } from '@mui/x-data-grid';
import IOptionsDropDownList from '../../Interfaces/IOptionsDropDownList';


const OptionsDropDownList: React.FC<IOptionsDropDownList> = ({ valueKeys, setValue, title, selectedValue }) => {

    const handleChange = (event: SelectChangeEvent) => {
        setValue(Number(event.target.value));
    };

    return (
        <Box sx={{ minWidth: 120 }} >
            <FormControl fullWidth>
                <InputLabel id="simple-select-label">{title}</InputLabel>
                <Select id="sampleSelect" value={selectedValue.toString()} label="Pharmacy" onChange={handleChange}  >
                    <MenuItem key={"All"} value={0}>
                        All {title == "Pharmacy" ? "Pharmacies" : title}
                    </MenuItem>
                    {valueKeys.map((key: ValueOptions) => (
                        <MenuItem key={key.toString()} value={key.value}>
                            {key.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}

export default OptionsDropDownList;