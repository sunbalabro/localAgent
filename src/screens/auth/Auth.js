import { CookiesProvider, useCookies } from "react-cookie";
const Auth = ({ children }) => {
  return <CookiesProvider>{children}</CookiesProvider>;
};

export default Auth;
export const useIsLoggedIn = () => {
  const [cookies] = useCookies();
  return !!cookies.token;
};
export const useGetUserId = () => {
  const [cookies] = useCookies();
  return cookies.id;
};
export const useSetToken = (token) => {
  const [, setCookie] = useCookies();
  return () => {
    console.log(token);
    setCookie("token", token, { secure: true, sameSite: "lax" });
  }
};
export const useSetUserId = () => {
  const [, setCookie] = useCookies();
  return (id) => {
    console.log(id);
    setCookie("id", id, { secure: true, sameSite: "lax" });
  }
};
export const useRemoveToken = () => {
  const [, , removeCookie] = useCookies();
  return () => {
    removeCookie("token")
    removeCookie("id")
  };
};