import { render, screen } from "@testing-library/react";
import DataTable from "./DataTable";

test("shows empty state", () => {
  render(<DataTable data={[]} columns={[]} loading={false} />);
  expect(screen.getByText(/no records found/i)).toBeInTheDocument();
});
