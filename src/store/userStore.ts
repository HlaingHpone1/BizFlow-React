import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface UserData {
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    mail: string;
    phoneNumber: string;
    address: string;
    bannerImg: string;
    profileImg: string;
    bio: string;

    followers: number;
    followings: number;
    friends: number;
    posts: number;

    role: string;
    subscription: string;
    dob: Date;
    createdDate: Date;
    updatedDate: Date;
    gender: string;
}

interface UserStore {
    logInUser: boolean;
    userData: UserData | null;

    setLogInUser: (logInUser: boolean) => void;
    setUserData: (data: UserData) => void;
    logOut: () => void;
}

export const userStore = create<UserStore>()(
    devtools(
        persist<UserStore>(
            (set) => ({
                logInUser: false,
                userData: null,

                setLogInUser: (logInUser: boolean) =>
                    set({ logInUser: logInUser }),
                setUserData: (data: UserData) => set({ userData: data }),
                logOut: () => {
                    set(() => ({
                        logInUser: false,
                        userData: null,
                    }));
                    localStorage.removeItem("userStore");
                },
            }),
            {
                name: "userStore",
                getStorage: () => localStorage,
            }
        )
    )
);
