import { LayoutProps } from "./Layout.props";
import styles from "./Layout.module.css";
import cn from "classnames";
import { Header } from "./Header/Header";
import { Footer } from "./Footer/Footer";
import { FunctionComponent } from "react";

const Layout = ({children}: LayoutProps): JSX.Element => {
	return (
		<div className={cn(styles.wrapper)}>
			<Header className={cn(styles.header)} />
			<div className={cn(styles.body)}>
				{children}
			</div>
			<Footer className={cn(styles.footer)}/>
		</div>
	)
}

export const withLayout = <T extends Record<string, unknown>>(Component: FunctionComponent<T>) => {
	return function withLayoutComponent(props: T): JSX.Element {
		return (
			<Layout>
				<Component {...props} />
			</Layout>
		)
	}
}