import React, { useState,useEffect } from 'react';
import {KeyboardDatePicker } from "@material-ui/pickers";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import './MyDatePicker.css'

export default function MyDatePicker({handleDate,dateStart,classname,customDate}) {
  const [selectedDate, setSelectedDate] = useState(null)

  const handleDateChange = (date) => {
      setSelectedDate(date)
      handleDate(date)
  }

  useEffect(() => {
    customDate!==null && setSelectedDate(customDate)
  }, [customDate])

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
    <div className={`${classname}`}>
      <ThemeProvider theme={defaultMaterialTheme }>
        <KeyboardDatePicker
          shouldDisableDate={disabledDates}
          disableFuture="true"
          autoOk
          variant="dialog"
          inputVariant="outlined"
          format="dd/MM/yyyy"
          value={selectedDate}
          inputProps={{style: {height: "0px",fontSize: 15,border: "none",color: "black"}}} // font size of input text
          onChange={date => handleDateChange(date)}
        />
      </ThemeProvider>
        
    </div>
  );
}