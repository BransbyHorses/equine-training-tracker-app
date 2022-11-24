import { TextField, Autocomplete } from "@mui/material";
import { useRouter } from "next/router";

interface Options {
	optionName: string;
	optionId: number;
}

interface AutoCompleteBoxProps {
	options: Options[];
	label: string;
	linkName: string;
}

const AutoCompleteBox = (props: AutoCompleteBoxProps) => {
	const router = useRouter();
	const goToArea = (e: any) => {
		if (e.target.id !== "") {
			props.options.find((option: any) => {
				if (option.optionName === e.target.innerText) {
					router.push(`${props.linkName}/${option.optionId}`);
				}
			});
		}
	};

	const selectOptions = props.options.map((option: any) => option.optionName);

	return (
		<Autocomplete
			disablePortal
			size="small"
			id="combo-box-demo"
			options={selectOptions}
			sx={{
				width: "100%",
			}}
			renderInput={(params: any) => (
				<TextField {...params} label={props.label} />
			)}
			onChange={goToArea}
		/>
	);
};

export default AutoCompleteBox;
