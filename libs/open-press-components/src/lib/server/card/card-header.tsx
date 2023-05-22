import { CardHeaderProps, PartialReactChildren } from "@override/open-press-interfaces";
import { HTMLAttributes } from "react";
import { card_classes } from "./style";
import classNames from "classnames";

export const CardHeader = (
	{
		children,
		title,
		subtitle,
		separator,
		className,
		title_class_name,
		subtitle_class_name,
		separator_class_name,
		...others
	}: PartialReactChildren & HTMLAttributes<HTMLDivElement> & CardHeaderProps,
): JSX.Element => {
	return (
		<div
			className={classNames(card_classes.card_header, className)}
			{...others}
		>
			<h1 className={classNames(card_classes.card_title, title_class_name)}>{title}</h1>
			{
				separator
				? <hr className={classNames(card_classes.card_header_separator, separator_class_name)} />
				: null
			}
			{
				subtitle
				? <h2 className={classNames(card_classes.card_subtitle, subtitle_class_name)}>{subtitle}</h2>
				: null
			}
			{children}
		</div>
	);
};