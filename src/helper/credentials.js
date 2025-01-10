import { getCookie, setCookie } from "./cookie";

export const myUsername = "rakafebriansy";
export const myPassword = "123456";
export const getMyFullName = () => {
    return getCookie('fullName');
}
export const setMyFullName = (fullName) => {
    return setCookie('fullName',fullName,30);
}
