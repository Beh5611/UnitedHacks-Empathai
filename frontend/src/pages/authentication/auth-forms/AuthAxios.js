import axios from "axios";
import { useContext } from "react";
import AuthContext from "./AuthContext";
import { useNavigate } from "react-router-dom";

const baseURL = "http://127.0.0.1:8000/";

const useAxios = () => {
  const navigate = useNavigate();
  const { authTokens, user, setAuthTokens, logoutUser } =
    useContext(AuthContext);

  const axiosInstance = axios.create({
    baseURL: baseURL,
    withCredentials: true,
  });


  axiosInstance.interceptors.request.use(async (req) => {

    // if (!authTokens.access) {
    //   await logoutUser();
    //   navigate("/login");
    //   return null;
    // }
    // const token = jwt_decode(authTokens.access);
    // const isExpired = Date.now() >= token.exp * 1000;
  

    if (!isExpired) {
      return req;
    }

    else {
      await logoutUser();
      navigate("/login");
      return null;
    }
    // const response = await axios
    //   .post(
    //     `${baseURL}accounts/token/refresh/`,
    //     {
    //       refresh: authTokens.refresh,
    //     },
    //     { withCredentials: true }
    //   )
    //   .catch(async function (error) {
    //     console.log(error);
    //     await logoutUser();
    //     navigate("/login");
    //     return null;
    //   });

    // if (response.status === 200) {
    //   setAuthTokens(response.data);
    //   const resp = await axios
    //     .post(
    //       `${baseURL}accounts/session/update_token/`,
    //       { tokens: response.data },
    //       { withCredentials: true }
    //     )
    //     .catch(function (error) {
    //       console.log(error);
    //       return null;
    //     });
    //   if (resp) {
    //     console.log("success");
    //   }
    //   req.headers.Authorization = `Bearer ${response.data.access}`;
    // }
    // return req;
  });

  return axiosInstance;
};

export default useAxios;