import renderer from "react-test-renderer";
import "@testing-library/jest-dom";
import EquineListGrid from "./EquineListGrid";
import { Equine } from "../utils/types";
import { render, screen, fireEvent } from "@testing-library/react";
import { createMockRouter } from "../utils/test-utils/mockNextRouter";
import { RouterContext } from "next/dist/shared/lib/router-context";

const equines: Equine[] = [
	{
		id: 1,
		name: "Test Equine",
		yard: { id: 1, name: "Test Yard" },
		equineStatus: {
			string: "In Training",
			id: 1,
			categorisedAsTraining: true,
		},
		trainingProgrammes: [],
		learnerType: { id: 1, name: "Test Learner Type" },
		healthAndSafetyFlags: [],
		disruptions: [],
	},
];

describe("EquineListGrid", () => {
	it("renders with all props", () => {
		const tree = renderer.create(<EquineListGrid equines={equines} />);
		expect(tree).toMatchSnapshot();
	});

	it("displays non admin address when on index page", () => {
		const router = createMockRouter({});
		const expectedParams = [
			"/equines/1",
			"/equines/1",
			{ scroll: undefined, shallow: undefined, locale: undefined },
		];
		render(
			<RouterContext.Provider value={router}>
				<EquineListGrid equines={equines} />
			</RouterContext.Provider>
		);
		fireEvent.click(screen.getByTestId("KeyboardArrowRightIcon"));
		expect(router.push).toHaveBeenCalledWith(...expectedParams);
	});

	it("displays links to admin pages when at admin address", () => {
		const router = createMockRouter({ pathname: "/admin/equines" });
		const expectedParams = [
			"/admin/equines/1",
			"/admin/equines/1",
			{ scroll: undefined, shallow: undefined, locale: undefined },
		];
		render(
			<RouterContext.Provider value={router}>
				<EquineListGrid equines={equines} />
			</RouterContext.Provider>
		);
		fireEvent.click(screen.getByTestId("KeyboardArrowRightIcon"));
		expect(router.push).toHaveBeenCalledWith(...expectedParams);
	});
});
