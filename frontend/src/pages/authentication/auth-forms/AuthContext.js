/* eslint-disable no-unused-vars */
import {
    createContext,
    useState,
    useEffect,
    useContext,
    useLayoutEffect,
  } from "react";
  import { redirect } from "react-router-dom";
  import axios from "axios";
  
  const AuthContext = createContext(null);
  
  export default AuthContext;
  
  // source: https://blog.devgenius.io/django-rest-framework-react-authentication-workflow-2022-part-2-d299b7fef875
  
  export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authTokens, setAuthTokens] = useState({});
  
    // const loadSession = async () => {
    //   setUser(JSON.parse(sessionStorage.getItem("user")));
    //   setAuthTokens(JSON.parse(sessionStorage.getItem("tokens")));
    //   console.log("user", JSON.parse(sessionStorage.getItem("user")));
    //   console.log("tokens", JSON.parse(sessionStorage.getItem("tokens")));
    // };
  
    const fetchUserSession = async () => {
      await axios
        .get("http://127.0.0.1:8000/accounts/session/", { withCredentials: true })
        .then(async function (response) {
          console.log("session", response);
          await setUser(response.data.user);
          await setAuthTokens(response.data.tokens);
        })
        .catch(async function (error) {
          console.log(error);
          await setUser(null);
          await setAuthTokens({});
        });
    };
  
    const [loading, setLoading] = useState(true);
  
    const loginUser = async ({ username, password, remember_me }) => {
      const response = await axios
        .post(
          "http://127.0.0.1:8000/accounts/login/",
          {
            username,
            password,
            remember_me,
          },
          { withCredentials: true }
        )
        .then(function (response) {
          if (response.status === 200) {
            console.log("response " + response);
            fetchUserSession();
            return response;
          }
        })
        .catch(function (error) {
          console.log(error);
          return error;
        });
    };
  
    const registerUser = async (data) => {
      const response = await axios
        .post("http://127.0.0.1:8000/accounts/signup/", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        })
        .then(async function (response) {
          if (response.status === 201) {
            console.log("successfully registered user.");
            console.log(response);
            return loginUser({
              username: data.username,
              password: data.password,
              remember_me: false,
            });
          }
          return response;
        })
        .then(async function (response) {
          if (response.status === 200) {
            console.log("successfully logged in user.");
            console.log(response);
            return response;
          }
        })
        .catch(function (error) {
          console.log(error);
          return error;
        });
    };
  
    const updateUser = async (data) => {
      const response = await axios
        .put(`http://127.0.0.1:8000/accounts/update/`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        })
        .catch(function (error) {
          console.log(error);
        });
      if (response.status === 200) {
        console.log("response", response);
        return response;
      } else {
        console.log(response);
        return response;
      }
    };
  
    const logoutUser = async () => {
      const response = await axios.post(
        "http://127.0.0.1:8000/accounts/logout/",
        null,
        { withCredentials: true }
      );
      console.log("res1" + JSON.stringify(response));
      console.log(document.cookie);
      // sessionStorage.removeItem("user");
      // sessionStorage.removeItem("tokens");
      setUser(null);
      setAuthTokens(null);
    };
  
    const unauthRedirect = () => {
      console.log("user before render", user);
      if (!user) {
        console.log(user);
        return redirect("/login");
      }
      return null;
    };
  
    const authRedirect = () => {
      if (user) {
        console.log(user);
        return redirect("/profile");
      }
      return null;
    };
  
    const contextData = {
      user,
      authTokens,
      loading,
      setLoading,
      setAuthTokens,
      fetchUserSession,
      setUser,
      updateUser,
      registerUser,
      loginUser,
      logoutUser,
      unauthRedirect,
      authRedirect,
    };
  
    useEffect(() => {
      async function load() {
        console.log("this runs here");
        await fetchUserSession();
        setLoading(false);
      }
      load();
    }, [loading]);
  
    return (
      <AuthContext.Provider value={contextData}>
        {loading ? null : children}
      </AuthContext.Provider>
    );
  };
  
  export const useAuth = () => {
    return useContext(AuthContext);
  };