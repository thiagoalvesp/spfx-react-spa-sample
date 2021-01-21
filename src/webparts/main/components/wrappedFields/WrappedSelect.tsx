import * as React from 'react';
import { FieldProps, getIn } from 'formik';
import { SelectProps, Select, FormControl, InputLabel, FormHelperText, MenuItem } from '@material-ui/core';
import { IWrappedSelectProp } from './IWrappedSelectProp';
import { IWrappedSelectItemMenu } from './IWrappedSelectItemMenu';

export const WrappedSelect: React.FC<FieldProps & SelectProps & IWrappedSelectProp> = props => {
    const isTouched = getIn(props.form.touched, props.field.name);
    const errorMessage = getIn(props.form.errors, props.field.name);

    const { error, field, form, ...rest } = props;

    return (
        <FormControl error={error ?? Boolean(isTouched && errorMessage)} fullWidth>
            <InputLabel id="demo-simple-select-error-label">{props.field.name}</InputLabel>
            <Select
                {...rest} // includes any Material-UI specific props
                {...field} // includes all props contributed by the Formik Field/FastField
            >
                {props.menuitens.map((i: IWrappedSelectItemMenu) =>
                    <MenuItem key={i.value} value={i.value}>{i.description}</MenuItem>
                )}
            </Select>
            <FormHelperText>{((isTouched && errorMessage) ? errorMessage : undefined)}</FormHelperText>
        </FormControl>
    )
}