export function sortBy<T>(arr: T[], key: keyof T, direction: "asc" | "desc") {
  const copy = [...arr];
  copy.sort((a, b) => {
    const av = a[key] as unknown as any;
    const bv = b[key] as unknown as any;
    if (av == null) return 1;
    if (bv == null) return -1;
    if (typeof av === "number" && typeof bv === "number") return direction === "asc" ? av - bv : bv - av;
    const sa = String(av).toLowerCase();
    const sb = String(bv).toLowerCase();
    if (sa < sb) return direction === "asc" ? -1 : 1;
    if (sa > sb) return direction === "asc" ? 1 : -1;
    return 0;
  });
  return copy;
}
