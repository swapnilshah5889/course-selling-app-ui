import { userStateAtom } from "../atoms/user";
import { selector } from "recoil";

export const userEmailSelector = selector({
    key: "userEmailSelector",
    get: ({get}) => {
        const state = get(userStateAtom);
        return state.userEmail;
    },
});

export const userTokenSelector = selector({
    key: "userTokenSelector",
    get: ({get}) => {
        const state = get(userStateAtom);
        return state.token;
    },
});

export const isLoggedInSelector = selector({
    key: "isLoggedInSelector",
    get: ({get}) => {
        const state = get(userStateAtom);
        return state.isLoggedIn;
    },
});
