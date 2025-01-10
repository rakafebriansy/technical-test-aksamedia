import axios from "axios";
import { getCookie } from "./cookie";

export function uniqid() {
    return Date.now() + '_' + Math.floor(Math.random() * 1000000);
}

export function getAuthorizationToken() {
    const user = JSON.parse(getCookie('user'));
    if(user) {
        return user.token;
    }
    return null;
}

export function getUserFromCookie() {
    const user = JSON.parse(getCookie('user'));
    if(user) {
        return user.admin;
    }
    return null;
}