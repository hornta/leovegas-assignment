import "./button.css";
import React, { HTMLAttributes } from "react";
import PropTypes from "prop-types";

export enum ButtonVariant {
	PRIMARY = "primary",
	SECONDARY = "secondary",
}

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
	variant: ButtonVariant;
}

export const Button = ({
	children,
	variant,
	className = "",
	...props
}: ButtonProps): JSX.Element => {
	const buttonClass = `button button-${variant}${
		className ? ` ${className}` : ""
	}`;
	return (
		<button type="button" {...props} className={buttonClass}>
			{children}
		</button>
	);
};

Button.propTypes = {
	variant: PropTypes.oneOf([ButtonVariant.PRIMARY, ButtonVariant.SECONDARY]),
};
