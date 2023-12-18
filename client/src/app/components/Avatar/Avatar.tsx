import { AvatarProps } from "./Avatar.props";
import Image, { StaticImageData } from "next/image"
import noProfileAvatar from "../../images/noprofil.jpg";
import cn from "classnames";
import styles from "./Avatar.module.css";

const API_IMAGES_URL = "http://localhost:5000/images/"
export const Avatar = ({size, path}: AvatarProps): JSX.Element => {
	let avatarPath: string | StaticImageData;

	if (path && path.includes("blob")) {
		avatarPath = path;
	} else {
		avatarPath = path ? API_IMAGES_URL + path : noProfileAvatar;
	}

	
	return (
		<Image
			className={cn(styles[size])}
			src={avatarPath}
			alt="img"
			width={100}
			height={100} />
	);
}