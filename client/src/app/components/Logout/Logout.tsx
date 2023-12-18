"use client"
import cn from "classnames";
import styles from "./Logout.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthService from "../../services/AuthService";
import { useAppDispatch } from "../../hooks/redux";
import { MouseEvent } from "react";

export default function LogoutForm(): JSX.Element {
	const router = useRouter();
	const dispatch = useAppDispatch();

	const onLogout = async (event: MouseEvent): Promise<void> => {
		try {
			event.preventDefault();
			await dispatch(AuthService.logout());
			router.push("/");
        } catch (error: any) {
			console.log(error);
        }
	}

	return (
			<div className={cn(styles.logout)}>
				<div>
					<h1 className={cn(styles.logoutTitle)}>Do you wish to  log out of the <span>SALE OF CARS</span>?</h1>
				</div>
				<div className={cn(styles.logoutButtons)}>
					<button 
						className={cn(styles.logoutButton)}
						onClick={(e) => onLogout(e)}>Yes
					</button>
					<Link className={cn(styles.backLink)} href="/">No</Link>
				</div>
			</div>
	)
}