import { HeaderProps } from "./Header.props";
import styles from "./Header.module.css";
import cn from "classnames";
import Menu from "@/src/components/Menu/Menu";

export const Header = ({className, ...props}: HeaderProps): JSX.Element => {
	return (
		<div {...props} className={cn(styles.header)}>
			<Menu />
		</div>
	)
}