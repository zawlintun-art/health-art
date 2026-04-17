import { AdminCreateUserForm } from "@/components/forms/admin-create-user-form";
import { AppShell } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { deleteUserAction, updateUserRoleAction } from "@/app/actions";
import { requireAdmin } from "@/lib/auth";
import { getAllUsers, type User } from "@/lib/data";

export default async function AdminUsersPage() {
  await requireAdmin();
  const users = await getAllUsers();

  return (
    <AppShell
      role="ADMIN"
      currentPath="/admin/users"
      title="User management"
      description="Create accounts, change roles, and remove users when needed."
    >
      <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
        <Card className="rounded-[2rem] border-[#edf0df] bg-white/92 shadow-[0_18px_44px_-34px_rgba(108,136,92,0.38)]">
          <AdminCreateUserForm />
        </Card>
        <Card className="rounded-[2rem] border-[#edf0df] bg-white/92 p-6 shadow-[0_18px_44px_-34px_rgba(108,136,92,0.38)]">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">All users</h2>
              <p className="text-sm text-muted-foreground">Role updates are applied immediately.</p>
            </div>
            <Badge variant="outline">{users.length} total</Badge>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Activity</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user: User) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <form action={updateUserRoleAction} className="flex items-center gap-2">
                      <input type="hidden" name="userId" value={user.id} />
                      <select
                        name="role"
                        defaultValue={user.role}
                        className="h-10 rounded-xl border border-input bg-background px-3 text-sm"
                      >
                        <option value="USER">User</option>
                        <option value="ADMIN">Admin</option>
                      </select>
                      <Button variant="outline" size="sm" type="submit">
                        Save
                      </Button>
                    </form>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.onboarded ? "default" : "secondary"}>
                      {user.onboarded ? "Onboarded" : "Pending"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <p>{user._count.healthLogs} logs</p>
                    <p className="text-xs text-muted-foreground">{user._count.ratings} ratings</p>
                  </TableCell>
                  <TableCell className="text-right">
                    <form action={deleteUserAction} className="inline-flex">
                      <input type="hidden" name="userId" value={user.id} />
                      <Button variant="outline" size="sm" type="submit">
                        Delete
                      </Button>
                    </form>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </AppShell>
  );
}
