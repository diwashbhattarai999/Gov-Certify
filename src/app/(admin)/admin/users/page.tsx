import { getAllUsers } from "@/data/user";

import Breadcrumbs from "@/components/ui/bread-crumbs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";

const UsersPage = async () => {
  const users = await getAllUsers();

  return (
    <>
      <Breadcrumbs
        activeClasses="text-accent"
        containerClasses="flex mt-0 mb-2"
        listClasses="hover:underline font-bold"
        capitalizeLinks
      />

      <div className="flex flex-col bg-stone-50 p-4 border border-border shadow-sm rounded-md mt-5">
        <div className="overflow-x-auto">
          <Table>
            <TableCaption>A list of all registered users.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">S.No.</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Verified?</TableHead>
                <TableHead>Profile</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users?.map((user, index) => {
                return (
                  <TableRow key={user.id} className="cursor-pointer">
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.gender}</TableCell>
                    <TableCell>{user.phoneNo}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      {user.emailVerified ? "Verified" : "Not Verified"}
                    </TableCell>
                    <TableCell>
                      <Image
                        src={user.image ?? "/images/default-profile.png"}
                        alt={user.name || "Profile"}
                        width={40}
                        height={40}
                        priority
                        className="rounded-full"
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={7}>
                  Showing {users?.length}
                  of {users?.length} users
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    </>
  );
};

export default UsersPage;
