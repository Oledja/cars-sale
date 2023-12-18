import { ChangeEvent, useState } from "react";
import { Validations, useValidation } from "./useValidation";

export const useInput = (initialValue: string, validations: Validations) => {
    const [value, setValue] = useState(initialValue);
    const [isDirty, setDirty] = useState(false);
    const valid = useValidation(value, validations);
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const onBlur = (e: ChangeEvent<HTMLInputElement>) => {
        setDirty(true);
    };

    return {
        value,
        isDirty,
        onChange,
        onBlur,
        ...valid,
    };
};
