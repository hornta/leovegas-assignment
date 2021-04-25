import React, { ReactNode } from "react";
import PropTypes from "prop-types";
import "./page-wrapper.css";

type PageWrapperProps = {
	children: ReactNode;
	className?: string;
};

export const PageWrapper = ({ children, className }: PageWrapperProps) => (
	<div className={`page-wrapper${className ? ` ${className}` : ""}`}>
		{children}
	</div>
);

PageWrapper.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
};
