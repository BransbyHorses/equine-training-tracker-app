import React, { ReactNode, useState } from "react";
import { Box } from "@mui/material";
import Pagination from "@mui/material/Pagination";

const PaginationContainer = ({
	children,
	count,
}: {
	children: ReactNode;
	count: number;
}) => {
	const [page, setPage] = useState(1);
	const resultsPerpage = 10;
	const resultsFrom = (page - 1) * resultsPerpage + 1;
	const resultsTo = page * resultsPerpage;

	const handleNavigationChange = (event: any, value: any) => {
		setPage(parseInt(value));
	};

	return (
		<>
			{React.Children.map(children, (child, index) => {
				if (index + 1 >= resultsFrom && index + 1 <= resultsTo) return child;
			})}
			<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
				<Pagination
					sx={{ mt: 3 }}
					page={page}
					count={Math.ceil(count / 10)}
					onChange={handleNavigationChange}
				/>
			</Box>
		</>
	);
};

export default PaginationContainer;
