import { FormControl, FormLabel, FormHelperText, Input } from "@chakra-ui/react";
import { useController } from 'react-hook-form';
import { useState } from "react";

const TextInput = ({ name, label, control, type, fieldRef, defaultVal, helperText, showHelperText, ...rest }) => {
    const { field } = useController({
        name,
        control,
        defaultValue: defaultVal ?? ''
    });

    return (
        <FormControl>
            {type !== 'hidden' && <FormLabel htmlFor={name}>{label}</FormLabel>}

            <Input
                name={name}
                control={control}
                label={label}
                id={name}
                type={type}
                {...field}
                {...rest}
                value={field.value}
                placeholder={label}
                ref={fieldRef}
                required
            />
            {
                helperText && showHelperText &&
                <FormHelperText>{helperText}</FormHelperText>
            }
        </FormControl>
    )
}

export default TextInput;