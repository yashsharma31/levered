import { isPresent } from "./helper";

export const getCookie = (cookieName: string, cookieString = "") => {
  const name = cookieName + "=";
  const decodedCookie = isPresent(cookieString)
    ? cookieString
    : typeof document !== "undefined"
    ? decodeURIComponent(document.cookie)
    : "";

  const cookieArr = decodedCookie.split("; ");
  let res;

  cookieArr.forEach((cookie) => {
    {
      if (cookie.indexOf(name) === 0) res = cookie.substring(name.length);
    }
  });
  return res;
};
