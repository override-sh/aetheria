import { InputWrapper } from "./input-wrapper";
import { InputTextProps } from "@open-press/interfaces";
import { input_classes } from "./style";
import { HTMLAttributes } from "react";
import classNames from "classnames";

export const InputEmail = (
	{
		label,
		placeholder,
		id,
		className,
		label_class_name,
		input_class_name,
		...others
	}: InputTextProps & HTMLAttributes<HTMLInputElement>,
): JSX.Element => {
	return (
		<InputWrapper
			direction={"column"}
			className={className}
		>
			<label
				htmlFor={id}
				className={classNames(input_classes.input_label, label_class_name)}
			>
				{label}
			</label>
			<input
				type={"email"}
				name={id}
				id={id}
				placeholder={placeholder}
				className={classNames(input_classes.text_input, input_class_name)}
				{...others}
			/>
		</InputWrapper>
	);
};