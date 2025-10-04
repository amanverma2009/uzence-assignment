import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import DataTable, { Column } from "./DataTable";

type Person = { id: number; name: string; age: number; city?: string };

const meta: Meta<typeof DataTable> = {
  title: "Components/DataTable",
  component: DataTable,
};
export default meta;

const sample: Person[] = [
  { id: 1, name: "Aman", age: 16, city: "Lucknow" },
  { id: 2, name: "Maya", age: 21, city: "Delhi" },
  { id: 3, name: "Zed", age: 28, city: "Bengaluru" },
];

const columns: Column<Person>[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "age", title: "Age", dataIndex: "age", sortable: true, width: "80px" },
  { key: "city", title: "City", dataIndex: "city" },
];

export const Default: StoryObj = {
  render: () => <DataTable data={sample} columns={columns} loading={false} />,
};

export const Selectable: StoryObj = {
  render: () => {
    const [selected, setSelected] = useState<Person[]>([]);
    return (
      <div>
        <DataTable
          data={sample}
          columns={columns}
          selectable
          multiple
          onRowSelect={(rows) => setSelected(rows)}
        />
        <div className="mt-4">Selected: {selected.map(s => s.name).join(", ") || "None"}</div>
      </div>
    );
  }
};
