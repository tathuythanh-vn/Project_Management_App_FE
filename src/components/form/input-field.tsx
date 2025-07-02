'use client'

import React, {useEffect, useLayoutEffect, useRef} from 'react';
import {capitalize} from "@/utils/helper";

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> & {
    name: string;
    isFocused?: boolean;
    children?: React.ReactNode;
    labelType?: 'inline' | 'block';
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
    ({name, children, defaultValue, placeholder = name, type = 'text', isFocused = false, labelType = 'block', ...props}, ref) => {

        const inputRef = useRef<HTMLInputElement>(null);

        useEffect(() => {
            if (isFocused && inputRef?.current) {
                inputRef.current.focus();
            }
        }, [isFocused, inputRef]);

        return (
            <div className={`flex gap-2 mb-2 min-w-60 ${labelType === 'block' ? ' flex-col' : 'items-center gap-x-4'}`}>
                <label className={labelType === 'inline' ? 'w-[8ch] text-sm text-stone-600': ''} htmlFor={name}>{children}</label>
                {type === 'textarea' ? (
                    <textarea
                        className='p-2 rounded-sm bg-gray-50 h-30 resize-y shadowm-sm'
                        id={name}
                        name={name}
                        placeholder={capitalize(placeholder)}
                        defaultValue={defaultValue}
                        {...props}/>
                ) : (
                    <input
                        className='p-2 rounded-sm bg-gray-50 shadowm-sm text-sm'
                        type={type}
                        id={name}
                        name={name}
                        placeholder={capitalize(placeholder)}
                        defaultValue={defaultValue}
                        ref={inputRef}
                        {...props}
                    />
                )}
            </div>
        );
    }
);

export default InputField;
