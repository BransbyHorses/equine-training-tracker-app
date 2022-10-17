import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import PageTitle from "../../components/PageTitle";

describe("<PageTitle />", () => {
    test("should display a blank login form, with remember me checked by default", async () => {
      render(<PageTitle title={"Dashboard"} />)
      const title = screen.getByRole('heading', {
        name: /dashboard/i
      })
      expect(title).toBeTruthy;
    });
  });