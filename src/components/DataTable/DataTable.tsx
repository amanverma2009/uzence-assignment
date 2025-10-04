import React, { useMemo, useState } from "react";
import { sortBy } from "../../utils/sort";

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
  width?: string;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  multiple?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
  emptyMessage?: string;
}

export default function DataTable<T extends { id?: string | number }>({
  data,
  columns,
  loading = false,
  selectable = false,
  multiple = true,
  onRowSelect,
  emptyMessage = "No records found",
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [selectedIds, setSelectedIds] = useState<Set<string | number>>(
    new Set()
  );

  const sorted = useMemo(() => {
    if (!sortKey) return data;
    return sortBy(data, sortKey, sortDir);
  }, [data, sortKey, sortDir]);

  function toggleSort(col: Column<T>) {
    if (!col.sortable) return;
    if (sortKey === col.dataIndex) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(col.dataIndex as keyof T);
      setSortDir("asc");
    }
  }

  function toggleSelect(row: T) {
    const id = row.id ?? (JSON.stringify(row) as any);
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else {
      if (!multiple) newSet.clear();
      newSet.add(id);
    }
    setSelectedIds(newSet);
    onRowSelect?.(
      data.filter((r) => newSet.has(r.id ?? (JSON.stringify(r) as any)))
    );
  }

  function toggleSelectAll() {
    if (selectedIds.size === data.length) {
      setSelectedIds(new Set());
      onRowSelect?.([]);
      return;
    }
    const all = new Set(data.map((d) => d.id ?? (JSON.stringify(d) as any)));
    setSelectedIds(all);
    onRowSelect?.(data);
  }

  if (loading) {
    return (
      <div role="status" aria-live="polite" className="p-6 text-center">
        <div className="inline-flex items-center space-x-2">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
          </svg>
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return <div className="p-6 text-center text-gray-500">{emptyMessage}</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr className="bg-gray-50">
            {selectable && (
              <th className="px-4 py-2">
                <input
                  aria-label="Select all rows"
                  type="checkbox"
                  checked={selectedIds.size === data.length}
                  onChange={toggleSelectAll}
                />
              </th>
            )}
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-2 text-left select-none"
                style={{ width: col.width ?? "auto" }}
              >
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleSort(col)}
                    disabled={!col.sortable}
                    className="flex items-center gap-2"
                    aria-sort={
                      sortKey === col.dataIndex
                        ? sortDir === "asc"
                          ? "ascending"
                          : "descending"
                        : "none"
                    }
                  >
                    <span>{col.title}</span>
                    {col.sortable && (
                      <svg
                        className="h-3 w-3 opacity-60"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M6 9l6-6 6 6M6 15l6 6 6-6"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {sorted.map((row, idx) => {
            const rowId = row.id ?? (JSON.stringify(row) as any);
            const isSelected = selectedIds.has(rowId);
            return (
              <tr key={idx} className={`${isSelected ? "bg-blue-50" : ""}`}>
                {selectable && (
                  <td className="px-4 py-2">
                    <input
                      aria-label={`Select row ${idx + 1}`}
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSelect(row)}
                    />
                  </td>
                )}
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3 align-top">
                    {col.render
                      ? col.render(row[col.dataIndex], row)
                      : String(row[col.dataIndex] ?? "")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
