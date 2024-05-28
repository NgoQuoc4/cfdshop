import Cookies from "js-cookie";
import { STORAGE } from "../constants/storage";
// Local Token
export const localToken = {
    get: () => JSON.parse(localStorage.setItem(STORAGE.token)),
    set: (token) => localStorage.setItem(STORAGE.token, JSON.stringify(token)),
    remove: () => localStorage.removeItem(STORAGE.token),
}
// Coolie Token
export const cookieToken = {
    get: () => JSON.parse(Cookies.get(STORAGE.token) !== undefined ? Cookies.get(STORAGE.token) : null),
    set: (token) => Cookies.set(STORAGE.token, JSON.stringify(token)),
    remove: () => Cookies.remove(STORAGE.token),
}

const tokenMethod = {
    get: () => {
        // return localToken.get();
        return cookieToken.get();
    },
    set: (token) => {
        // return localToken.set(token);
        return cookieToken.set(token);
    },
    remove: () => {
        // return localToken.remove();
        return cookieToken.remove();
    }
}

export default tokenMethod;


