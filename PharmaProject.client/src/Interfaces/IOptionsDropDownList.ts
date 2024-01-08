import { ValueOptions } from "@mui/x-data-grid";

interface IOptionsDropDownList {
    valueKeys: ValueOptions[];
    setValue: React.Dispatch<React.SetStateAction<number>>;
    title: string;
    selectedValue: number;
}

export default IOptionsDropDownList;