import Player from "./Player";


import { Grid } from "../../../node_modules/@mui/material/index";
import { useCallback } from "react";
import { Particles } from "react-particles";
import config from "./config";
// import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "tsparticles-slim"; // if you are going to use `loadSlim`, install the "tsparticles-slim" package too.
import Cookies from "js-cookie";
import Timer from "./Timer";
function Meditation() {
    

      const particlesInit = useCallback(async engine => {
        console.log(engine);
        // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        //await loadFull(engine);
        await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
        await console.log(container);
    }, []);
    if(!Cookies.get("cookies") ){
        window.location.href = "http://localhost:3000/login"
        return 
      }
    return (
        <>
            <Grid container>
      {/* Particles covering the whole container */}
      <Grid item xs={12}>
        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={config}
        />
      </Grid>

      {/* Left column */}
      <Grid item xs={12} md={6}>
        {/* Player */}
        <Player style={{ position: 'absolute', top: 0, left: 0, zIndex: 2 }} />
      </Grid>

      {/* Right column */}
      <Grid item xs={12} md={6}>
        {/* Timer */}
        <Timer />
      </Grid>
      </Grid>
        </>
        
    );
}

export default Meditation;