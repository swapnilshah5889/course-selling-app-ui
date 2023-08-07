import {atom} from 'recoil';

export const userStateAtom = atom({
    key:'userState',
    default: {
        isLoggedIn: false,
        userEmail: null,
        token: null
    }
});