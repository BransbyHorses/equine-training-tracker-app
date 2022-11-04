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
		<>
			<PageTitle title="Manage" />
			<InfoGrid listItems={adminActions} />
		</>
	);
};

export default withRouter(AdminDashboard);
