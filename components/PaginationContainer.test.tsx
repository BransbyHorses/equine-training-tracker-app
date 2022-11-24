import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PaginationContainer from "./PaginationContainer";

describe("PaginationContainer", () => {
	it("renders with all props", () => {
		const allProps = {
			count: 0,
		};
		const tree = renderer.create(
			<PaginationContainer {...allProps}>
				{[
					1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
				].map((c) => {
					return (
						<div key={c} id={`${c.toString()}`}>
							Content {c}
						</div>
					);
				})}
			</PaginationContainer>
		);
		expect(tree).toMatchSnapshot();
	});

	it("displays 10 items per page", () => {
		render(
			<PaginationContainer count={20}>
				{[
					1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
				].map((c) => {
					return (
						<div key={c} id={`${c.toString()}`}>
							Content {c}
						</div>
					);
				})}
			</PaginationContainer>
		);
		expect(screen.getByText("Content 1")).toBeInTheDocument();
		expect(screen.getByText("Content 2")).toBeInTheDocument();
		expect(screen.getByText("Content 3")).toBeInTheDocument();
		expect(screen.getByText("Content 4")).toBeInTheDocument();
		expect(screen.getByText("Content 5")).toBeInTheDocument();
		expect(screen.getByText("Content 6")).toBeInTheDocument();
		expect(screen.getByText("Content 7")).toBeInTheDocument();
		expect(screen.getByText("Content 8")).toBeInTheDocument();
		expect(screen.getByText("Content 9")).toBeInTheDocument();
		expect(screen.getByText("Content 10")).toBeInTheDocument();
		expect(screen.queryByText("Content 11")).toBeNull();
		expect(screen.queryByText("Content 20")).toBeNull();
	});

	it("pagination menu not displayed when children length is 0", () => {
		const tree = renderer.create(
			<PaginationContainer count={0}>
				{[].map(() => {
					return <></>;
				})}
			</PaginationContainer>
		);
		expect(tree).toMatchSnapshot();
	});
});
