import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PageTitle from "./PageTitle";

describe("PageTitle", () => {
	it("renders with title", () => {
		render(<PageTitle title="Test Page Title" />);
		const pageTitle = screen.getByText("Test Page Title");
		expect(pageTitle).toBeInTheDocument();
		expect(pageTitle).toMatchSnapshot();
	});
});
