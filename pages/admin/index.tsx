import React, { FC } from "react";
import { withRouter, NextRouter } from "next/router";
import { Container } from "@mui/material";
import options from "../../properties/properties";
import PageTitle from "../../components/PageTitle";
import InfoGrid from "../../components/InfoGrid";

interface WithRouterProps {
	router: NextRouter;
}

const adminActions = options.adminActions;

interface MyComponentProps extends WithRouterProps {}

const AdminDashboard: FC<MyComponentProps> = (props) => {
	return (
		<Container
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<PageTitle title="Manage"/>
			<InfoGrid listItems={adminActions} />
		</Container>
	);
};

export default withRouter(AdminDashboard);
