import renderer from "react-test-renderer";
import "@testing-library/jest-dom";
import NavigationCard from "./NavigationCard";
import AddCircleIcon from "@mui/icons-material/AddCircle";

describe("NavigationCard", () => {
	it("renders with minimum props", () => {
		const tree = renderer.create(<NavigationCard link="/" title="Test" />);
		expect(tree).toMatchSnapshot();
	});
	it("renders with all props", () => {
		const tree = renderer.create(
			<NavigationCard link="/" title="Test" icon={<AddCircleIcon />} />
		);
		expect(tree).toMatchSnapshot();
	});
});
