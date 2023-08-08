/* eslint-disable */

import React from 'react'
import { useState, useEffect } from 'react';
import {Typography, Box, Button, Grid } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}


const Timer = () => {
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(true);
    const [time, setTime] = useState(0);
    const [open, setOpen] = useState(false);
    const [value, setValue] = React.useState(0);
    const [hover, setHover] = React.useState(-1);
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    useEffect(() => {
        let interval = null;
 
        if (isActive && isPaused === false) {
            interval = setInterval(() => {
                setTime((time) => time + 10);
            }, 10);
        } else {
            clearInterval(interval);
        }
        return () => {
            clearInterval(interval);
        };
    }, [isActive, isPaused]);
 
    const handleStart = () => {
        setIsActive(true);
        setIsPaused(false);
    };
 
    const handlePauseResume = () => {
        setIsPaused(!isPaused);
    };
 
    const handleReset = () => {
        setIsActive(false);
        setTime(0);
    };
      
    const handleAgree = () => {
        setOpen(false)


    }
 
    return (
        <>
        <Box className="timer"
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            backgroundColor: '#f2f2f2',
            marginBottom: "3%",
            padding: '1rem',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}>
            <Typography variant="h3" component="span">
                {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
            </Typography>
            <Typography variant="h3" component="span">
                {("0" + Math.floor((time / 1000) % 60)).slice(-2)}.
            </Typography>
            <Typography variant="h3" component="span">
                {("0" + ((time / 10) % 100)).slice(-2)}
            </Typography>
        </Box>

        <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
        {isPaused ? 
        <Button fullWidth variant="contained" onClick={handleStart} color="primary">
        Start
      </Button>
      :
      <Button fullWidth variant="contained" onClick={handlePauseResume}  style={{ backgroundColor: 'red', color: 'white' }}>
            Stop
          </Button>
        }
        
      </Grid>
      <Grid item xs={12} sm={4}>
            <Button fullWidth  variant="contained" onClick={handleReset} style={{ backgroundColor: 'green', color: 'white' }}>
                Reset
            </Button>
      </Grid>

      <Grid item xs={12} sm={4}>
            <Button fullWidth variant="contained" onClick={handleClickOpen} style={{ backgroundColor: '#646466', color: 'white' }}>
                Conclude Session
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"How do you feel after your session?"}
                </DialogTitle>
                <DialogContent>

                <Box
                sx={{
                    width: 200,
                    display: 'flex',
                    alignItems: 'center',
                }}
                >
                <Rating
                    name="hover-feedback"
                    value={value}
                    precision={0.5}
                    getLabelText={getLabelText}
                    onChange={(event, newValue) => {
                    setValue(newValue);
                    }}
                    onChangeActive={(event, newHover) => {
                    setHover(newHover);
                    }}
                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
                {value !== null && (
                    <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                )}
                </Box>
                
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>No</Button>
                <Button onClick={handleClose} autoFocus>
                    Yes
                </Button>
                </DialogActions>
            </Dialog>
      </Grid>
    </Grid>
        
        
        </>

    );
}

export default Timer