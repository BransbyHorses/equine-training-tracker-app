import renderer from "react-test-renderer";
import "@testing-library/jest-dom";
import BackBreadcrumb from "./BackBreadcrumb";
import { RouterContext } from "next/dist/shared/lib/router-context";

import { fireEvent, render, screen } from "@testing-library/react";
import { createMockRouter } from "../utils/test-utils/mockNextRouter";

describe("BackBreadcrumb", () => {
	it("renders", () => {
		const tree = renderer.create(<BackBreadcrumb />);
		expect(tree).toMatchSnapshot();
	});
	it("renders with all props", () => {
		const tree = renderer.create(<BackBreadcrumb link="/" />);
		expect(tree).toMatchSnapshot();
	});
	it("directs back on click", () => {
		const router = createMockRouter({});
		render(
			<RouterContext.Provider value={router}>
				<BackBreadcrumb />
			</RouterContext.Provider>
		);
		fireEvent.click(screen.getByTestId("ArrowLeftIcon"));
		expect(router.back).toHaveBeenCalled();
	});
	it("directs to link on click", () => {
		const router = createMockRouter({});
		render(
			<RouterContext.Provider value={router}>
				<BackBreadcrumb link="test" />
			</RouterContext.Provider>
		);
		fireEvent.click(screen.getByTestId("ArrowLeftIcon"));
		expect(router.push).toHaveBeenCalledWith("test");
	});
});
