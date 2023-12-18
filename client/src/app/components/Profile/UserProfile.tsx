"use client"
import cn from "classnames";
import styles from "./UserProfile.module.css";
import { useAppSelector } from "../../hooks/redux";
import { useRouter } from "next/navigation";
import { Avatar } from "../Avatar/Avatar";

export default function UserProfile(): JSX.Element {
	const { user } = useAppSelector(state => state.userAuthReducer); 
	const router = useRouter();

	return (
		<div className={styles.userProfile}>
			<h1 className={cn(styles.formTitle)}>Profile</h1>
				<Avatar size="large" path={user.avatarPath || null} />
			<div className={styles.fullname}>
				<h2>{user.firstname} {user.lastname}</h2>
			</div>
			<ul className={styles.profileFields}>
				<li><span>Email:</span> {user.email}</li>
				<li><span>Phone:</span> {user.phone}</li>
				<li><span>City:</span> {user.city}</li>
			</ul>
			<button className={cn(styles.editButton)} onClick={() => {router.push("profile/edit")}}>Edit</button>
		</div>
	)
}