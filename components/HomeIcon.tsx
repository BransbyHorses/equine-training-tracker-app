import React from "react";
import Link from "next/link";
import Image from "next/image";

import NavLogoContainer from "./styles/navLogoContainer";
import bransbyLog from "../assets/svg/bransbyLogo.svg";

const HomeIcon = () => {
	return (
		<NavLogoContainer>
			<Image src={bransbyLog} layout="fill" priority />
		</NavLogoContainer>
	);
};

export default HomeIcon;
