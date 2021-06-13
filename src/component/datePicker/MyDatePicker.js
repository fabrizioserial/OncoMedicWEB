import React, { useState } from 'react';
import {KeyboardDatePicker } from "@material-ui/pickers";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

export default function MyDatePicker({handleDate,dateStart}) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
      setSelectedDate(date)
      handleDate(date)
  }

  const defaultMaterialTheme  = createMuiTheme({
    overrides: {
      MuiOutlinedInput: {
        root: {
            position: 'relative',
            '& $notchedOutline': {
                borderColor: '#DBDBDB',
                borderRadius: "0px",
                borderTopWidth: "0px",
                borderBottomWidth: "0px",
                borderLeftWidth: "3px",
                borderRightWidth: "3px",
            },
            '&:hover:not($disabled):not($focused):not($error) $notchedOutline': {
                borderColor: '#DBDBDB',
                // Reset on touch devices, it doesn't add specificity
                '@media (hover: none)': {
                    borderColor: '#DBDBDB',
                },
            },
            '&$focused $notchedOutline': {
                borderColor: '#DBDBDB',
                borderRadius: "0px",
                borderTopWidth: "0px",
                borderBottomWidth: "0px",
                borderLeftWidth: "3px",
                borderRightWidth: "3px",
            },
        },
    },
    MuiFormLabel: {
        root: {
            '&$focused': {
                color: 'red'
            }
        }
    }
    },
  });

  const disabledDates = (date) => {
    return date<dateStart
  }

  return (
    <div style={{marginLeft: "2%"}}>
      <ThemeProvider theme={defaultMaterialTheme }>
        <KeyboardDatePicker
          shouldDisableDate={disabledDates}
          disableFuture="true"
          autoOk
          variant="dialog"
          inputVariant="outlined"
          format="dd/MM/yyyy"
          value={selectedDate}
          inputProps={{style: {height: "0px",fontSize: 15,border: "none",color: "gray"}}} // font size of input text
          onChange={date => handleDateChange(date)}
        />
      </ThemeProvider>
        
    </div>
  );
}