"use client"
import { Avatar } from "../Avatar/Avatar";
import { useInput } from "../../hooks/useInput";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import cn from "classnames";
import Link from "next/link";
import styles from "./UpdateProfile.module.css";
import UserService from "../../services/UserService";


export default function RegistrationFrom(): JSX.Element {
	const { user } = useAppSelector(state => state.userAuthReducer); 
	const firstname = useInput(user.firstname, {isEmpty: true, minLength: 1, maxLength: 20});
	const lastname = useInput(user.lastname, {isEmpty: true, minLength:1, maxLength: 40});
	const currentPassword = useInput("", {isEmpty: true, minLength: 5, maxLength: 20});
	const newPassword = useInput("", {isEmpty: true, minLength: 5, maxLength: 20});
	const phone = useInput(user.phone, {isEmpty: true, isPhone: true});
	const city = useInput(user.city, {isEmpty: true, minLength: 2, maxLength: 50});
	const [isValidForm, setIsValidForm] = useState(false);
	const [selectedFile, setSelectedFile] = useState({} as File);
	const [firstnameError, setFirstnameError] = useState(false);
	const [lastnameError, setLastnameError] = useState(false);
	const [phoneError, setPhoneError] = useState(false);
	const [cityError, setCityError] = useState(false);
	const [currentPasswordError, setCurrentPasswordError] = useState(false);
	const [newPasswordError, setNewPasswordError] = useState(false);
	const [selectedAvatar, setSelectedAvatar] = useState("");
	const [currentAvatar, setCurrentAvatar] = useState(user.avatarPath);
	const [avatarPath, setAvatarPath] = useState("");
	const router = useRouter();

	useEffect(() => {
		if (currentPassword.value && !newPassword.value) {
			setCurrentPasswordError(false)
			setNewPasswordError(true)
		} else if (!currentPassword.value && newPassword.value) {
			setCurrentPasswordError(true)
			setNewPasswordError(false)
		} else if (currentPassword.value && newPassword.value) {
			if (currentPassword.minLengthError || currentPassword.maxLengthError) {
				setCurrentPasswordError(true)
			} else {
				setCurrentPasswordError(false)
			}

			if (newPassword.minLengthError || newPassword.maxLengthError) {
				setNewPasswordError(true)
			} else {
				setNewPasswordError(false)
			}
		} else {
			setCurrentPasswordError(false)
			setNewPasswordError(false)
		}

		if (firstname.value && (firstname.minLengthError || firstname.maxLengthError)) {
			setFirstnameError(true);
		} else if (!firstname.value || (!firstname.minLengthError && !firstname.maxLengthError)){
			setFirstnameError(false)
		}

		if (lastname.value && (lastname.minLengthError || lastname.maxLengthError)) {
			setLastnameError(true);
		} else if (!lastname.value || (!lastname.minLengthError && !lastname.maxLengthError)){
			setLastnameError(false)
		}

		if (phone.value && phone.phoneError) {
			setPhoneError(true);
		} else if (!phone.value || !phone.phoneError) {
			setPhoneError(false)
		}

		if (city.value && (city.minLengthError || city.maxLengthError)) {
			setCityError(true);
		} else if (!city.value || (!city.minLengthError || !city.maxLengthError)){
			setCityError(false)
		}

		if (
				(
					firstname.value 
					|| lastname.value 
					|| phone.value 
					|| city.value 
					|| currentPassword.value
					|| newPassword.value
				) 
					&& 
				(
					!firstnameError
					&& !lastnameError
					&& !phoneError
					&& !cityError
					&& !currentPasswordError
					&& !newPasswordError
				)) {	
				setIsValidForm(true);
		} else {
			setIsValidForm(false)
		}
		
	}, [firstname, lastname, currentPassword, newPassword, phone, city, currentPasswordError, newPasswordError, firstnameError, lastnameError, phoneError, cityError, user])
	
	const dispatch = useAppDispatch();
    const { isProcessing, error } = useAppSelector(state => state.userAuthReducer); 

	const onUpdateProfile = async (event: MouseEvent): Promise<void> => {
		event.preventDefault();
		try {
			await dispatch(
				UserService.updateUser({
				firstname: firstname.value,
				lastname: lastname.value,
				phone: phone.value,
				newPassword: newPassword.value,
				currentPassword: currentPassword.value,
				city: city.value,
				avatar: selectedFile,
				avatarPath,
			}))
			router.push("../profile");		
        } catch (error) {
			console.log(error);
        }
	} 

	const selectFile = (event: ChangeEvent<HTMLInputElement>) => {
		const { target: { files } } = event;
		if (files && files[0]) {
			setSelectedFile(files[0]);
			setSelectedAvatar(URL.createObjectURL(files[0]));
			setCurrentAvatar("");
			event.target.files = null;
		}
	}

	const deleteFile = () => {
		setSelectedFile({} as File);
		setSelectedAvatar("");
		setCurrentAvatar("");
		setAvatarPath(user.avatarPath || "");
	}


	return (
				<form className={cn(styles.form)}>
 					<h1 className={cn(styles.formTitle)}>Update Profile</h1>
 					<h6 className={cn(styles.regestrationError)}>
 						{error && error}
 						{isProcessing && "Processing..."}
 					</h6>
					<div className={cn(styles.upload)}>
						{
							currentAvatar && <Avatar size="medium" path={user.avatarPath} />
						}
						{
							selectedAvatar && <Avatar size="medium" path={selectedAvatar} />
						}
						{
							!currentAvatar && !selectedAvatar && <Avatar size="medium" path={null}/>
						}
				
						<div className={styles.round}>
							{
								currentAvatar || selectedAvatar ? 
								<button className={cn(styles.deleteButton)}onClick={() => deleteFile()}>-</button>
								:
								<>
									<input type="file" onChange={(e) => selectFile(e)}/>
									<i>+</i>
								</>
							}
						</div>
					</div>
 					<div className={styles.formGroups}>
 						<div className={styles.formGroup}>
 							<input 
								className={cn(styles.formInput)} 
								placeholder=""
								type="firstname"
								value={firstname.value}
								onBlur={(e) => firstname.onBlur(e)}
								onChange={(e) => firstname.onChange(e)}/>
							<label className={cn(styles.formLabel)}>Firstname</label>
							<div className={cn(styles.errorMessages)}>
								{ 
									(firstname.value && ((firstname.minLengthError || firstname.maxLengthError))) &&
									<>
										{(firstname.isDirty && firstname.minLengthError) && <div className={cn(styles.error)}>{firstname.minLengthError}</div>}
										{(firstname.isDirty && firstname.maxLengthError) && <div className={cn(styles.error)}>{firstname.maxLengthError}</div>}
									</>
								}
							</div>
						</div>
						<div className={styles.formGroup}>
							<input 
								className={cn(styles.formInput)} 
								placeholder=""
								type="lastname"
								value={lastname.value}
								onBlur={(e) => lastname.onBlur(e)}
								onChange={(e) => lastname.onChange(e)}/>
							<label className={cn(styles.formLabel)}>Lastname</label>
							<div className={cn(styles.errorMessages)}>
								{ 
									(lastname.value && ((lastname.minLengthError || lastname.maxLengthError))) &&
									<>
										{(lastname.isDirty && lastname.minLengthError) && <div className={cn(styles.error)}>{lastname.minLengthError}</div>}
										{(lastname.isDirty && lastname.maxLengthError) && <div className={cn(styles.error)}>{lastname.maxLengthError}</div>}
									</>
								}
							</div>
						</div>
					</div>
					<div className={styles.formGroups}>
						<div className={styles.formGroup}>
							<input 
								className={cn(styles.formInput)} 
								placeholder=""
								type="phone"
								value={phone.value}
								onBlur={(e) => phone.onBlur(e)}
								onChange={(e) => phone.onChange(e)}/>
							<label className={cn(styles.formLabel)}>Phone</label>
								{ 
									phone.value && phone.phoneError &&
									<>
										{(phone.isDirty && phone.phoneError) && <div className={cn(styles.error)}>{phone.phoneError}</div>}
									</>
								}
							<div className={cn(styles.errorMessages)}>
								{(phone.isDirty && phone.isEmptyError) && <div className={cn(styles.error)}>{phone.isEmptyError}</div>}		
							</div>
						</div>
						<div className={styles.formGroup}>
							<input 
								className={cn(styles.formInput)} 
								placeholder=""
								type="city"
								value={city.value}
								onBlur={(e) => city.onBlur(e)}
								onChange={(e) => city.onChange(e)}/>
							<label className={cn(styles.formLabel)}>City</label>
							<div className={cn(styles.errorMessages)}>
								{ 
									(city.value && ((city.minLengthError || city.maxLengthError))) &&
									<>
										{(city.isDirty && city.minLengthError) && <div className={cn(styles.error)}>{city.minLengthError}</div>}
										{(city.isDirty && city.maxLengthError) && <div className={cn(styles.error)}>{city.maxLengthError}</div>}
									</>
								}
							</div>
							<div className={cn(styles.errorMessages)}>
								{(city.isDirty && city.isEmptyError) && <div className={cn(styles.error)}>{city.isEmptyError}</div>}
							</div>
						</div>
					</div>
					<div className={styles.formGroups}>
						<div className={styles.formGroup}>
							<input 
								className={cn(styles.formInput)} 
								placeholder=""
								type="password"
								value={currentPassword.value}
								onBlur={(e) => currentPassword.onBlur(e)}
								onChange={(e) => currentPassword.onChange(e)}/>
							<label className={cn(styles.formLabel)}>Current Password</label>
								{ currentPasswordError && <div className={cn(styles.error)}>This field cannot be empty</div>}
								{ 
									(currentPassword.value && ((currentPassword.minLengthError || currentPassword.maxLengthError))) &&
									<>
										{(currentPassword.isDirty && currentPassword.minLengthError) && <div className={cn(styles.error)}>{currentPassword.minLengthError}</div>}
										{(currentPassword.isDirty && currentPassword.maxLengthError) && <div className={cn(styles.error)}>{currentPassword.maxLengthError}</div>}
									</>
								}
						</div>
						<div className={styles.formGroup}>
							<input 
								className={cn(styles.formInput)} 
								placeholder=""
								type="password"
								value={newPassword.value}
								onBlur={(e) => newPassword.onBlur(e)}
								onChange={(e) => newPassword.onChange(e)}/>
							<label className={cn(styles.formLabel)}>New Password</label>
								{ newPasswordError && <div className={cn(styles.error)}>This field cannot be empty</div>}
								{ 
									(newPassword.value && ((newPassword.minLengthError || newPassword.maxLengthError))) &&
									<>
										{(newPassword.isDirty && newPassword.minLengthError) && <div className={cn(styles.error)}>{newPassword.minLengthError}</div>}
										{(newPassword.isDirty && newPassword.maxLengthError) && <div className={cn(styles.error)}>{newPassword.maxLengthError}</div>}
									</>
								}
						</div>
					</div>
					<button 
						className={cn(styles.formButton)}
						onClick={(e) => onUpdateProfile(e)}
						disabled={!isValidForm}>Edit</button>
					<h5 className={cn(styles.backTitle)}><Link className={cn(styles.backLink)} href="../profile">Back</Link></h5>
				</form>
					
	)
}