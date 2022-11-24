import React, { FC } from "react";
import PageTitle from "../../components/PageTitle";
import NavigationGrid from "../../components/NavigationGrid";
import NavigationCard from "../../components/NavigationCard";

const adminActions = [
	{
		title: "Equines",
		link: "/admin/equines",
	},
	{
		title: "Skills",
		link: "/admin/skills",
	},
	{
		title: "Yards",
		link: "/admin/yards",
	},
	{
		title: "Training Methods",
		link: "/admin/training-methods",
	},
	{
		title: "Training Environments",
		link: "/admin/training-environments",
	},
	{
		title: "Handling Statuses",
		link: "/admin/handling-statuses",
	},
	{
		title: "Training Categories",
		link: "/admin/training-categories",
	},
];

const AdminDashboard: FC = () => {
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

export default AdminDashboard;
