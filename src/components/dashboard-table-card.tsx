import { Card } from "@/components/ui/card";

type TableColumn = {
  key: string;
  label: string;
  align?: "left" | "right";
};

type TableRow = Record<string, string>;

type DashboardTableCardProps = {
  title: string;
  subtitle: string;
  tabs: string[];
  rows: TableRow[];
  columns: TableColumn[];
};

export function DashboardTableCard({
  title,
  subtitle,
  tabs,
  rows,
  columns,
}: DashboardTableCardProps) {
  return (
    <Card className="rounded-[2rem] border-[#edf0df] bg-white/92 p-6 shadow-[0_18px_44px_-34px_rgba(108,136,92,0.38)]">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h3 className="text-[1.5rem] font-semibold tracking-tight text-[#23342f]">{title}</h3>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab, index) => (
            <span
              key={tab}
              className={
                index === 0
                  ? "rounded-full bg-[#a9cd63] px-4 py-2 text-sm font-medium text-white"
                  : "rounded-full border border-[#e7eadc] bg-white px-4 py-2 text-sm text-foreground/80"
              }
            >
              {tab}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-[#eef1e3]">
        <table className="w-full text-sm">
          <thead className="bg-[#fbfcf7] text-muted-foreground">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-4 py-3 font-medium ${column.align === "right" ? "text-right" : "text-left"}`}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index} className="border-t border-[#eef1e3]">
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`px-4 py-3 ${column.align === "right" ? "text-right" : "text-left"}`}
                  >
                    {row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
