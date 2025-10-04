import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import InputField from "./InputField";

const meta: Meta<typeof InputField> = {
  title: "Components/InputField",
  component: InputField,
  args: {
    placeholder: "Type here...",
    size: "md",
    variant: "outlined",
  },
};
export default meta;

type Story = StoryObj<typeof InputField>;

export const Playground: Story = {
  render: (args) => {
    const [val, setVal] = useState("");
    return <InputField {...args} value={val} onChange={(e) => setVal(e.target.value)} />;
  },
};

export const Password: Story = {
  render: () => {
    const [v, setV] = useState("");
    return (
      <InputField
        label="Password"
        placeholder="Enter password"
        type="password"
        showPasswordToggle
        value={v}
        onChange={(e) => setV(e.target.value)}
      />
    );
  }
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <InputField label="Filled" variant="filled" placeholder="filled" />
      <InputField label="Outlined" variant="outlined" placeholder="outlined" />
      <InputField label="Ghost" variant="ghost" placeholder="ghost" />
    </div>
  ),
};
