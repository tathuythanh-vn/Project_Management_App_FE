import React, {ChangeEventHandler, useState} from "react";

export default function useInput(initialValue: string): [
    string,
    ChangeEventHandler<HTMLInputElement>,
    () => void
] {
    const [value, setValue] = useState<string>(initialValue)

    function onReset() {
        setValue(initialValue);
    }

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value);
    }

    return [value, onChange, onReset];
}