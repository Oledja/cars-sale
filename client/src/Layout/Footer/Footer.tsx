import { FooterProps } from "./Footer.props";
import styles from "./Footer.module.css";
import cn from "classnames";
import { format } from "date-fns";

export const Footer = ({className, ...props}: FooterProps): JSX.Element => {
	return (
		<footer className={cn(className, styles.footer)} {...props}>
			Copyright © 2010-{format(new Date(), "yyyy")} Company Все права защищены.
		</footer>
	)
}