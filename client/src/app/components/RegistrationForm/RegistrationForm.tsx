"use client"
import Link from "next/link";
import styles from "./RegistrationForm.module.css";
import cn from "classnames";
import { useInput } from "../../hooks/useInput";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthService from "../../services/AuthService";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import Image from "next/image";
import noProfile from "../../images/noprofil.jpg"


export default function RegistrationFrom(): JSX.Element {
	const firstname = useInput("", {isEmpty: false, minLength: 1, maxLength: 20});
	const lastname = useInput("", {isEmpty: false, minLength:1, maxLength: 40});
	const password = useInput("", {isEmpty: false, minLength: 5, maxLength: 20});
	const phone = useInput("", {isEmpty: false, isPhone: true});
	const email = useInput("", {isEmpty: false, isEmail: true});
	const city = useInput("", {isEmpty: false, minLength: 2, maxLength: 50});
	const [isValidForm, setIsValidForm] = useState(false);
	const [selectedFile, setSelectedFile] = useState({} as File);
	const [selectedAvatar, setSelectedAvatar] = useState("");

	const router = useRouter();

	useEffect(() => {
		if (!firstname.minLengthError 
			&& !firstname.maxLengthError
			&& !lastname.minLengthError
			&& !lastname.maxLengthError
			&& !email.emailError
			&& !password.minLengthError
			&& !password.maxLengthError
			&& !phone.phoneError
			&& !city.minLengthError
			&& !city.maxLengthError) {
				setIsValidForm(true);
		} else {
			setIsValidForm(false);
		}
	}, [firstname, lastname, email, password, phone, city])
	
	const dispatch = useAppDispatch();
    const { isProcessing, error } = useAppSelector(state => state.userAuthReducer); 

	const selectFile = (event: ChangeEvent<HTMLInputElement>) => {
		const { target: { files } } = event;
		if (files && files[0]) {
			setSelectedFile(files[0]);
			setSelectedAvatar(URL.createObjectURL(files[0]));
			event.target.files = null;
		}
	}

	const deleteFile = () => {
		setSelectedFile({} as File);
		setSelectedAvatar("");
	}

	const onRegistration = async (event: MouseEvent): Promise<void> => {
		event.preventDefault();
		try {
			await dispatch(
				AuthService.registration({
				firstname: firstname.value,
				lastname: lastname.value,
				email: email.value,
				password: password.value,
				phone: phone.value,
				city: city.value,
				avatar: selectedFile
			}))
			router.push("login");
        } catch (error: unknown) {
			console.log(error);
        }
	} 


	return (
		<form className={cn(styles.form)}>
			<h1 className={cn(styles.formTitle)}>Registration</h1>
			<h6 className={cn(styles.regestrationError)}>
				{error && error}
				{isProcessing && "Processing..."}
			</h6>
			<div className={cn(styles.upload)}>
				{
				selectedAvatar ?
				<Image src={selectedAvatar} width={100} height={100} alt=" " />
				:
				<Image src={noProfile} width={100} height={100} alt=" " />
				}
				<div className={styles.round}>
					{
					selectedAvatar ? 
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
						{(firstname.isDirty && firstname.minLengthError) && 
						<div className={cn(styles.error)}>{firstname.minLengthError}</div>
						}
						{(firstname.isDirty && firstname.maxLengthError) && 
						<div className={cn(styles.error)}>{firstname.maxLengthError}</div>
						}
						{(firstname.isDirty && firstname.isEmptyError) && 
						<div className={cn(styles.error)}>{firstname.isEmptyError}</div>
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
						{(lastname.isDirty && lastname.minLengthError) && 
						<div className={cn(styles.error)}>{lastname.minLengthError}</div>
						}
						{(lastname.isDirty && lastname.maxLengthError) && 
						<div className={cn(styles.error)}>{lastname.maxLengthError}</div>
						}
						{(lastname.isDirty && lastname.isEmptyError) && 
						<div className={cn(styles.error)}>{lastname.isEmptyError}</div>
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
					<div className={cn(styles.errorMessages)}>
						{(phone.isDirty && phone.isEmptyError) && 
						<div className={cn(styles.error)}>{phone.isEmptyError}</div>
						}		
						{(phone.isDirty && phone.phoneError) && 
						<div className={cn(styles.error)}>{phone.phoneError}</div>
						}
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
						{(city.isDirty && city.minLengthError) && 
						<div className={cn(styles.error)}>{city.minLengthError}</div>
						}
						{(city.isDirty && city.maxLengthError) && 
						<div className={cn(styles.error)}>{city.maxLengthError}</div>
						}
						{(city.isDirty && city.isEmptyError) && 
						<div className={cn(styles.error)}>{city.isEmptyError}</div>
						}
					</div>
				</div>
			</div>
			<div className={styles.formGroups}>
				<div className={styles.formGroup}>
					<input 
						className={cn(styles.formInput)} 
						placeholder=""
						type="email"
						value={email.value}
						onBlur={(e) => email.onBlur(e)}
						onChange={(e) => email.onChange(e)}/>
					<label className={cn(styles.formLabel)}>Email</label>
					<div className={cn(styles.errorMessages)}>
						{(email.isDirty && email.isEmptyError) && 
						<div className={cn(styles.error)}>{email.isEmptyError}</div>
						}
						{(email.isDirty && email.emailError) && 
						<div className={cn(styles.error)}>{email.emailError}</div>
						}	
					</div>
				</div>
				<div className={styles.formGroup}>
					<input 
						className={cn(styles.formInput)} 
						placeholder=""
						type="password"
						value={password.value}
						onBlur={(e) => password.onBlur(e)}
					onChange={(e) => password.onChange(e)}/>
					<label className={cn(styles.formLabel)}>Password</label>
					<div className={cn(styles.errorMessages)}>
						{(password.isDirty && password.minLengthError) && 
						<div className={cn(styles.error)}>{password.minLengthError}</div>
						}
						{(password.isDirty && password.maxLengthError) && 
						<div className={cn(styles.error)}>{password.maxLengthError}</div>
						}
						{(password.isDirty && password.isEmptyError) && 
						<div className={cn(styles.error)}>{password.isEmptyError}</div>
						}
					</div>
				</div>
			</div>
			<button 
				className={cn(styles.formButton)}
				onClick={(e) => onRegistration(e)}
				disabled={!isValidForm}>Sign Up</button>
			<h5 className={cn(styles.loginTitle)}>
				<Link className={cn(styles.loginLink)} href="/auth/login">Login</Link>
			</h5>
		</form>
	)
}
