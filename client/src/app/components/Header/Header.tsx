"use client"
import { useAppSelector } from "../../hooks/redux";
import { HeaderProps } from "./Header.props";
import { Avatar } from "../Avatar/Avatar";
import cn from "classnames";
import Link from "next/link";
import styles from "./Header.module.css";

export const Header = ({className, ...props}: HeaderProps): JSX.Element => {
	const { isAuth, user } = useAppSelector(state => state.userAuthReducer); 

	return (
		<header {...props} className={cn(styles.header)} key={"header"}>
			<div className={cn(styles.container)}>
				<nav className={cn(styles.nav)}>
					<div className={cn(styles.title)}>
						<Link href="/">SALE OF CARS</Link>
					</div>
					<ul className={cn(styles.menu)}>
						<li>
							<Link className={cn(styles.link)} href="/">Home</Link>
						</li>
							{
								isAuth ?
								<>
									<li>
										<Link className={cn(styles.link)} href="/favorite">Favorite</Link>
									</li>
									<li>
										<Link className={cn(styles.link)} href="/profile">
											{
												<Avatar size="small" path={user.avatarPath} />
											}
										</Link>
									</li>
									<li>
										<Link className={cn(styles.link)} href="/auth/logout">Logout</Link>
									</li>
								</>
								:
								<li>
									<Link className={cn(styles.link)} href="/auth/login">Login</Link>
								</li>
							}
					</ul>
				</nav>
			</div>
		</header>
	)
}