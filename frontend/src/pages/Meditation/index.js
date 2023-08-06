import Player from "./Player";
import Cookies from "js-cookie";
function Meditation() {
    if(!Cookies.get("cookies") ){
        window.location.href = "http://localhost:3000/login"
        return 
      }
    return (
        <>
            <Player />
        </>
        
    );
}

export default Meditation;