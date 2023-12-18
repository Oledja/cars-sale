import { useEffect, useState } from "react";
import { emailRegexp, phoneRegexp } from "./constants";

export interface Validations {
    minLength?: number;
    maxLength?: number;
    isEmpty?: boolean;
    isEmail?: boolean;
    isPhone?: boolean;
}

export const useValidation = (value: string, validations: Validations) => {
    const [isEmptyError, setEmptyError] = useState("");
    const [minLengthError, setMinLengthError] = useState("");
    const [maxLengthError, setMaxLengthError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    useEffect(() => {
        for (const validation in validations) {
            switch (validation) {
                case "minLength":
                    if (validations.minLength) {
                        value.length < validations.minLength
                            ? setMinLengthError(
                                  `minimum length ${validations.minLength} characters`
                              )
                            : setMinLengthError("");
                    }
                    break;
                case "maxLength":
                    if (validations.maxLength) {
                        value.length > validations.maxLength
                            ? setMaxLengthError(
                                  `maximum length ${validations.maxLength} characters`
                              )
                            : setMaxLengthError("");
                    }
                    break;
                case "isEmpty":
                    if (!validations.isEmpty) {
                        value
                            ? setEmptyError("")
                            : setEmptyError("This field cannot be empty");
                    }
                    break;
                case "isEmail":
                    if (validations.isEmail) {
                        emailRegexp.test(String(value).toLowerCase())
                            ? setEmailError("")
                            : setEmailError("Email is not correct");
                    }
                    break;
                case "isPhone":
                    if (validations.isPhone) {
                        phoneRegexp.test(String(value).toLowerCase())
                            ? setPhoneError("")
                            : setPhoneError("Phone number is not correct");
                    }
                    break;
            }
        }
    }, [value]);

    return {
        isEmptyError,
        minLengthError,
        maxLengthError,
        emailError,
        phoneError,
    };
};
