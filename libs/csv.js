export function parseCsv(text) {
  const lines = text.replace(/\r/g, "").split("\n").filter(Boolean);
  if (lines.length < 2) return [];

  const split = (line) => {
    const out = [];
    let cur = "";
    let q = false;
    for (const ch of line) {
      if (ch === '"') {
        q = !q;
        continue;
      }
      if (ch === "," && !q) {
        out.push(cur.trim());
        cur = "";
        continue;
      }
      cur += ch;
    }
    out.push(cur.trim());
    return out;
  };

  const header = split(lines[0]).map((h) => h.toLowerCase());
  const iDate = header.findIndex((h) => h.includes("date") || h.includes("created"));
  const iDesc = header.findIndex((h) => h.includes("desc") || h.includes("narr") || h.includes("title"));
  const iAmt = header.findIndex((h) => h.includes("amount") || h.includes("amt"));
  const iType = header.findIndex((h) => h === "type");
  const iCat = header.findIndex((h) => h.includes("cat"));

  return lines.slice(1).flatMap((line) => {
    const c = split(line);
    const raw = Number(String(c[iAmt] ?? "0").replace(/[^0-9.-]/g, ""));
    if (Number.isNaN(raw) || raw === 0) return [];
    const typeFromCol = iType >= 0 ? c[iType] : "";
    let type = "Expense";
    if (/income|saving|investment/i.test(typeFromCol)) {
      type = typesMatch(typeFromCol);
    } else if (raw > 0 && iType < 0) {
      type = "Income";
    }
    return [
      {
        created_at: (c[iDate] || new Date().toISOString()).slice(0, 10),
        description: c[iDesc] || "Imported",
        amount: Math.abs(raw),
        type,
        category: iCat >= 0 && c[iCat] ? c[iCat] : "Other",
      },
    ];
  });
}

function typesMatch(value) {
  const v = value.toLowerCase();
  if (v.includes("invest")) return "Investment";
  if (v.includes("sav")) return "Savings";
  if (v.includes("inc")) return "Income";
  return "Expense";
}

export function toCsv(rows) {
  const head = "date,description,amount,type,category";
  const body = rows
    .map((r) => {
      const date = (r.created_at || "").slice(0, 10);
      const desc = `"${String(r.description || "").replace(/"/g, '""')}"`;
      return [date, desc, r.amount, r.type, r.category || ""].join(",");
    })
    .join("\n");
  return `${head}\n${body}\n`;
}

export function downloadCsv(filename, text) {
  const blob = new Blob([text], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
