import { TextField, Autocomplete } from "@mui/material";
import { withRouter, NextRouter } from "next/router";

interface Options {
	optionName: string;
	optionId: number;
}
interface MyOptions extends Array<Options> {}

interface WithRouterProps {
	router: NextRouter;
	options: MyOptions;
	label: string;
	linkName: string;
}

interface MyComponentProps extends WithRouterProps {}

const AutoCompleteBox: React.FC<MyComponentProps> = (props: any) => {
	const goToArea = (e: any) => {
		if (e.target.id !== "") {
			props.options.find((option: any) => {
				if (option.optionName === e.target.innerText) {
					props.router.push(`${props.linkName}/${option.optionId}`);
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
				marginBottom: 2,
			}}
			renderInput={(params: any) => (
				<TextField {...params} label={props.label} />
			)}
			onChange={goToArea}
		/>
	);
};

export default withRouter(AutoCompleteBox);
