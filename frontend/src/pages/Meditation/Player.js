import React, { useEffect, useState } from "react";
import useSound from "use-sound";
import qala from "../../assets/music/binural.mp3";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { IconContext } from "react-icons";
import { Card, Typography, Stack, CardMedia, Box, Grid, Button } from '@mui/material';

export default function Player() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState({
    min: "",
    sec: ""
  });
  const [currTime, setCurrTime] = useState({
    min: "",
    sec: ""
  });

  const [seconds, setSeconds] = useState(0);

  const [play, { pause, duration, sound}] = useSound(qala);

  useEffect(() => {
    if (duration) {
      const sec = duration / 1000;
      const min = Math.floor(sec / 60);
      const secRemain = Math.floor(sec % 60);
      setTime({
        min: min,
        sec: secRemain <= 9 ? "0" + secRemain : secRemain
      });
    }
  }, [duration]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sound) {
        setSeconds(sound.seek());
        const min = Math.floor(sound.seek() / 60);
        const sec = Math.floor(sound.seek() % 60);
        setCurrTime({
          min:min,
          sec: sec <=9 ? "0" + sec : sec
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [sound]);

  const playingButton = () => {
    if (isPlaying) {
      pause();
      setIsPlaying(false);
    } else {
      play();
      setIsPlaying(true);
    }
  };

  const skipNext = () => {
    if (sound && sound.seek) {
      sound.seek(duration/1000)
    }
  };

  const skipPrevious = () => {
    if (sound && sound.seek) {
      sound.seek(0)
  }
}

  return (
    <Card sx={{padding: '30px', maxWidth: '400px', borderRadius: '20px'}}>
      <Stack spacing={2}>
        <Box  sx={{display: 'flex', justifyContent: 'center'}}>
          <Typography variant='h2'>Playing Now</Typography>
        </Box>
        <Box  sx={{display: 'flex', justifyContent: 'center'}}>
          <CardMedia
            component="img"
            height= '250'
            image="https://picsum.photos/200/200" 
            alt="img"
            sx={{width: '300px', borderRadius: '10px'}}
          />
        </Box>
        <Box  sx={{display: 'flex', justifyContent: 'center'}}>
          <Typography variant='h4'>Title</Typography>
        </Box>
        <Box  sx={{display: 'flex', justifyContent: 'center'}}>
          <Typography>Artist</Typography>
        </Box>
        <Box  sx={{display: 'flex', justifyContent: 'center'}}>
          <Grid container sx={{display: 'flex', justifyContent: 'center'}}>
            <Grid sx='4'>
              <Typography>{currTime.min}:{currTime.sec}</Typography>
            </Grid>
            <Grid sx='4'>
              <input
                type="range"
                min="0"
                max={duration / 1000}
                defaultValue="0"
                value={seconds}
                className="timeline"
                onChange={(e) => {
                  sound.seek(e.target.value);
                }}
              />
            </Grid>
            <Grid sx='4'>
              <Typography>{time.min}:{time.sec}</Typography>
            </Grid>
          </Grid>
        </Box>
        <Box  sx={{display: 'flex', justifyContent: 'center'}}>
          <Button variant='text' sx={{borderRadius: '40%'}} onClick={skipPrevious}>
            <IconContext.Provider value={{ size: "3em", color: "secondary.light" }}>
              <BiSkipPrevious />
            </IconContext.Provider>
          </Button>
          {!isPlaying ? (
            <Button variant='text' sx={{borderRadius: '40%'}} onClick={playingButton}>
              <IconContext.Provider value={{ size: "3em", color: "secondary.light" }}>
                <AiFillPlayCircle />
              </IconContext.Provider>
            </Button>
          ) : (
            <Button variant='text' sx={{borderRadius: '40%'}} onClick={playingButton}>
              <IconContext.Provider value={{ size: "3em", color: "secondary.light" }}>
                <AiFillPauseCircle />
              </IconContext.Provider>
            </Button>
          )}
          <Button variant='text' sx={{borderRadius: '40%'}} onClick={skipNext}>
            <IconContext.Provider value={{ size: "3em", color: "secondary.light" }}>
              <BiSkipNext />
            </IconContext.Provider>
          </Button>
        </Box>
      </Stack>
    </Card>
  );
}
