import { useState } from "react";
import InputField from "./components/InputField/InputField";
import DataTable, { type Column } from "./components/DataTable/DataTable";

type Person = { id: number; name: string; age: number; city: string };

const sampleData: Person[] = [
  { id: 1, name: "Rahul", age: 22, city: "Goa" },
  { id: 2, name: "Maya", age: 21, city: "Delhi" },
  { id: 3, name: "Zed", age: 28, city: "Bengaluru" },
  { id: 4, name: "Steve", age: 32, city: "New York" },
];

function App() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Person[]>([]);

  const filtered = sampleData.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  const columns: Column<Person>[] = [
    { key: "name", title: "Name", dataIndex: "name", sortable: true },
    { key: "age", title: "Age", dataIndex: "age", sortable: true, width: "80px" },
    { key: "city", title: "City", dataIndex: "city" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-8">
      <h1 className="text-2xl font-bold">Uzence Front-End Assignment</h1>

      <div className="max-w-md">
        <InputField
          label="Search by name"
          placeholder="Type a name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          helperText="Try typing 'Aman' or 'Zed'"
          clearable
        />
      </div>

      <DataTable
        data={filtered}
        columns={columns}
        selectable
        multiple
        onRowSelect={(rows) => setSelected(rows)}
      />

      <div className="text-gray-700">
        <strong>Selected Rows:</strong>{" "}
        {selected.map((s) => s.name).join(", ") || "None"}
      </div>
    </div>
  );
}

export default App;
