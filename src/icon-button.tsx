import React, { FC, HTMLAttributes } from "react";
import "./icon-button.css";

interface IconButtonProps extends HTMLAttributes<HTMLButtonElement> {
	icon: FC;
}

export const IconButton = ({
	icon: IconComponent,
	...props
}: IconButtonProps): JSX.Element => (
	<button type="button" className="icon-button" {...props}>
		<IconComponent />
	</button>
);
