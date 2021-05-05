import React from 'react'
import { Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'


export const MySnackbar = ({message,openSnackBar,handleCloseSnackBar,severity}) => {
    return (
    <Snackbar open={openSnackBar} autoHideDuration={4000} onClose={handleCloseSnackBar}>
        <Alert onClose={handleCloseSnackBar} severity={severity}>
            {message}
        </Alert>
    </Snackbar>
    )
}
