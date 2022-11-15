import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
import { fireEvent, render, screen } from "@testing-library/react";
import NavMenu, { NavMenuProps } from "./NavMenu";
import { useSession } from "next-auth/react";
import { createMockRouter } from "../utils/test-utils/mockNextRouter";
import { RouterContext } from "next/dist/shared/lib/router-context";

jest.mock("next-auth/react", () => ({
	__esModule: true,
	...jest.requireActual("next-auth/react"),
	useSession: jest.fn(),
}));

const props: NavMenuProps = {
	drawerWidth: 255,
	open: true,
	collapse: jest.fn(),
	signOut: jest.fn(),
};

const mockSession = {
	expires: new Date(Date.now() + 2 * 86400).toISOString(),
	user: { name: "Test", email: undefined, image: undefined },
};

describe("NavMenu", () => {
	it("renders with minimum props for admin user", () => {
		(useSession as jest.Mock).mockImplementation(() => {
			return {
				data: {
					...mockSession,
					role: "ADMIN",
				},
			};
		});
		const tree = renderer.create(<NavMenu {...props} />);
		expect(tree).toMatchSnapshot();
	});

	it("renders with minimum props for non-admin user", () => {
		(useSession as jest.Mock).mockImplementation(() => {
			return {
				data: {
					...mockSession,
					role: "",
				},
			};
		});
		const tree = renderer.create(<NavMenu {...props} />);
		expect(tree).toMatchSnapshot();
	});

	it("displays link to admin dashboard when user is an admin", () => {
		(useSession as jest.Mock).mockImplementation(() => {
			return {
				data: {
					...mockSession,
					role: "ADMIN",
				},
			};
		});
		render(<NavMenu {...props} />);
		expect(screen.getByText("Admin")).toBeInTheDocument();
	});

	it("hides link to admin dashboard when user is not an admin", () => {
		(useSession as jest.Mock).mockImplementation(() => {
			return {
				data: {
					...mockSession,
					role: "",
				},
			};
		});
		render(<NavMenu {...props} />);
		expect(screen.queryByText("Admin")).toBeNull();
	});

	it("displays sign out button when a user is logged in", () => {
		(useSession as jest.Mock).mockImplementation(() => {
			return {
				data: {
					...mockSession,
					role: "",
				},
			};
		});
		render(<NavMenu {...props} />);
		expect(
			screen.getByRole("button", { name: "Sign Out" })
		).toBeInTheDocument();
	});

	it("will collapse when user clicks close icon", () => {
		(useSession as jest.Mock).mockImplementation(() => {
			return {
				data: {
					...mockSession,
					role: "",
				},
			};
		});
		render(<NavMenu {...props} />);
		fireEvent.click(screen.getByTestId("ChevronRightIcon"));
		expect(props.collapse).toHaveBeenCalled();
	});

	it("will navigate to admin dashboard", () => {
		(useSession as jest.Mock).mockImplementation(() => {
			return {
				data: {
					...mockSession,
					role: "",
				},
			};
		});
		const router = createMockRouter({});
		render(
			<RouterContext.Provider value={router}>
				<NavMenu {...props} />
			</RouterContext.Provider>
		);
		fireEvent.click(screen.getByText("Home"));
		expect(router.push).toHaveBeenCalledWith("/");
	});

	it("will navigate to index page", () => {
		(useSession as jest.Mock).mockImplementation(() => {
			return {
				data: {
					...mockSession,
					role: "ADMIN",
				},
			};
		});
		const router = createMockRouter({});
		render(
			<RouterContext.Provider value={router}>
				<NavMenu {...props} />
			</RouterContext.Provider>
		);
		fireEvent.click(screen.getByText("Admin"));
		expect(router.push).toHaveBeenCalledWith("/admin");
	});
});
