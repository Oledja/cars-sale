import { useState } from "react";

export const useLocalStorage = (key: string, initialValue: string) => {
    const [state, setState] = useState("");

    const setValue = (value: string) => {
        setState(value);
        localStorage.setItem(key, value);
    };
    return [state, setValue];
};
