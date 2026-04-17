import Link from "next/link";
import { Bell, Settings } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/components/logout-button";
import { cn } from "@/lib/utils";

type AppShellProps = {
  title: string;
  description: string;
  role: "USER" | "ADMIN";
  currentPath: string;
  children: React.ReactNode;
};

const navByRole = {
  USER: [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/onboarding", label: "Onboarding" },
  ],
  ADMIN: [
    { href: "/admin/dashboard", label: "Admin dashboard" },
    { href: "/admin/users", label: "Users" },
  ],
};

export function AppShell({ title, description, role, currentPath, children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#dcebbd_0%,#edf3d3_16%,#f7f8ef_34%,#fffdf8_100%)] px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1500px] rounded-[2.5rem] border border-white/60 bg-[rgba(242,246,225,0.76)] p-4 shadow-[0_26px_80px_-54px_rgba(69,117,97,0.42)] backdrop-blur md:p-6">
        <div className="rounded-[2rem] border border-white/75 bg-white/72 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] md:p-6">
          <header className="mb-8 rounded-[1.8rem] border border-[#e6ebd4] bg-[linear-gradient(180deg,#eef5d9_0%,#e6efcb_100%)] px-5 py-4 shadow-[0_12px_30px_-24px_rgba(115,145,95,0.45)]">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex size-12 items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_30%,#7fd2be_0%,#2f9f88_58%,#2f6f62_100%)] text-white shadow-md">
                  <div className="size-5 rounded-full bg-white/30" />
                </div>
                <div>
                  <p className="text-2xl font-semibold tracking-tight text-primary">
                    Health<span className="text-[#9fbe58]">OS</span>
                  </p>
                  <p className="text-xs uppercase tracking-[0.24em] text-primary/60">
                    {role === "ADMIN" ? "Care operations" : "Personal wellness"}
                  </p>
                </div>
              </div>
              <nav className="flex flex-wrap items-center gap-2">
                {navByRole[role].map((item) => {
                  const active = currentPath === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "rounded-full px-5 py-2.5 text-sm font-medium transition",
                        active
                          ? "bg-[#a9cd63] text-white shadow-[0_10px_18px_-12px_rgba(90,125,48,0.7)]"
                          : "text-foreground/80 hover:bg-white/70"
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="rounded-full border-[#d8dfbf] bg-white/70 px-3 py-1 text-primary/80">
                  {role === "ADMIN" ? "Admin" : "User"} mode
                </Badge>
                <Button variant="outline" size="icon-sm" className="rounded-full border-[#d8dfbf] bg-white/80">
                  <Bell className="size-4" />
                </Button>
                <Button variant="outline" size="icon-sm" className="rounded-full border-[#d8dfbf] bg-white/80">
                  <Settings className="size-4" />
                </Button>
                <LogoutButton />
              </div>
            </div>
          </header>

          <div className="mb-6 px-1">
            <h1 className="text-3xl font-semibold tracking-tight text-[#23342f]">{title}</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">{description}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
