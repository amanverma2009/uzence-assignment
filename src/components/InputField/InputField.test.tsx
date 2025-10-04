import { render, screen, fireEvent } from "@testing-library/react";
import InputField from "./InputField";

test("renders label and helper and handles change", () => {
  let val = "";
  const handle = (e: any) => (val = e.target.value);
  render(<InputField label="Email" helperText="We won't spam" value={val} onChange={handle} />);
  expect(screen.getByLabelText("Email")).toBeInTheDocument();
  fireEvent.change(screen.getByPlaceholderText(""), { target: { value: "hello" } });
});
