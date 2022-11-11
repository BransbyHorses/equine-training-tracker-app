import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import ResponsiveButton from "./ResponsiveButton";

describe("responsive button", () => {
	it("renders with no props", () => {
		render(<ResponsiveButton>Save</ResponsiveButton>);
		const saveButton = screen.getByRole("button");
        expect(saveButton).toBeInTheDocument();
        expect(saveButton).toMatchSnapshot();
	});
});
