import React, { Fragment,useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { DatePicker, KeyboardDatePicker } from "@material-ui/pickers";

export default function MyDatePicker({handleDate}) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
      setSelectedDate(date)
      handleDate(date)
  }


  return (
    <div style={{marginLeft: "2%"}}>
        <KeyboardDatePicker
                autoOk
                variant="dialog"
                inputVariant="outlined"
                format="dd/MM/yyyy"
                value={selectedDate}
                inputProps={{style: {height: "0px",fontSize: 15,border: "none",color: "gray"}}} // font size of input text
                onChange={date => handleDateChange(date)}
        />
    </div>
  );
}