import { InputWrapper } from "./input-wrapper";
import { InputCheckableProps } from "@override/open-press-interfaces";
import { input_classes } from "./style";
import { HTMLAttributes } from "react";
import classNames from "classnames";

export const InputCheckbox = (
	{
		label,
		placeholder,
		id,
		align_label,
		className,
		label_class_name,
		input_class_name,
		...others
	}: InputCheckableProps & HTMLAttributes<HTMLInputElement>,
): JSX.Element => {
	return (
		<InputWrapper
			direction={"row"}
			className={className}
		>
			{
				align_label === "left" &&
				<label
					htmlFor={id}
					className={classNames(input_classes.input_label, label_class_name)}
				>
					{label}
				</label>
			}
			<input
				type={"checkbox"}
				name={id}
				id={id}
				className={classNames(input_classes.checkable_input, input_class_name)}
				{...others}
			/>
			{
				align_label === "right" &&
				<label
					htmlFor={id}
					className={classNames(input_classes.input_label, label_class_name)}
				>
					{label}
				</label>
			}
		</InputWrapper>
	);
};