import React, { FC } from "react";
import { withRouter, NextRouter } from "next/router";
import options from "../../properties/properties";
import PageTitle from "../../components/PageTitle";
import NavigationGrid from "../../components/NavigationGrid";
import NavigationCard from "../../components/NavigationCard";

interface WithRouterProps {
	router: NextRouter;
}

const adminActions = options.adminActions;

interface MyComponentProps extends WithRouterProps {}

const AdminDashboard: FC<MyComponentProps> = (props) => {
	return (
		<>
			<PageTitle title="Manage" />
			<NavigationGrid>
				{adminActions.map((listItem: any, index: number) => {
					return (
						<NavigationCard
							key={index}
							link={listItem.link}
							title={listItem.title}
						/>
					);
				})}
			</NavigationGrid>
		</>
	);
};

export default withRouter(AdminDashboard);
