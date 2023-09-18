import LogoIcon from "./logo.svg"
import styles from "./Menu.module.css"
import cn from "classnames";

export default function Menu():JSX.Element {
	return (
		<div className={cn(styles.menu)}>
			<LogoIcon className={cn(styles.logo)}/>
		</div>
	)
}