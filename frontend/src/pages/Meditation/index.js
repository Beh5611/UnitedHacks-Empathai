import Player from "./Player";



import { useCallback } from "react";
import Particles from "react-particles";
import config from "./config";
//import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "tsparticles-slim"; // if you are going to use `loadSlim`, install the "tsparticles-slim" package too.
import Cookies from "js-cookie";
function Meditation() {
    if(!Cookies.get("cookies") ){
        window.location.href = "http://localhost:3000/login"
        return 
      }
    return (
        <>
            <Particles
                id="tsparticles"
                init={particlesInit}
                loaded={particlesLoaded}
                options={config}

            
            />
            <Player style={{ position: "absolute", top: 0, left: 0, zIndex: 2 }} />
        </>
        
    );
}

export default Meditation;