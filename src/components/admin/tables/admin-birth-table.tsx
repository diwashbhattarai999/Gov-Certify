"use client";

import Link from "next/link";

import { Status, UserRole } from "@prisma/client";

import { IBirthCertificates } from "@/types";

import { cn } from "@/lib/utils";

import { useCurrentRole } from "@/hooks/use-current-role";

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
import Button from "@/components/ui/Button";

interface IAdminBirthTableProps {
  birthCertificates: IBirthCertificates[] | null;
}

const AdminBirthTable = ({ birthCertificates }: IAdminBirthTableProps) => {
  const userRole = useCurrentRole();

  const handleView = (id: string) => {
    console.log("View certificate with ID:", id);
  };

  const handleDelete = () => {
    console.log("Delete selected certificates");
  };

  return (
    <Table>
      <TableCaption>A list of recent applied certificates.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">S.No.</TableHead>
          <TableHead>Application Number</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Certificate Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {birthCertificates?.map((certificate, index) => {
          return (
            <TableRow key={certificate.id} className="cursor-pointer">
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{certificate.applicationNumber}</TableCell>
              <TableCell>{`${certificate.firstName} ${
                certificate.middleName || ""
              } ${certificate.lastName}`}</TableCell>
              <TableCell className="capitalize">Birth</TableCell>
              <TableCell
                className={cn(
                  "font-semibold",
                  certificate.status === Status.APPROVED && "text-emerald-500",
                  certificate.status === Status.REJECTED && "text-red-500",
                  certificate.status === Status.PENDING && "text-amber-500"
                )}
              >
                {certificate.status}
              </TableCell>
              <TableCell className="flex gap-4">
                <Link href={`/admin/certificates/birth?id=${certificate.id}`}>
                  <Button
                    onClick={() => handleView(certificate.id)}
                    className="w-20"
                  >
                    View
                  </Button>
                </Link>
                <Button
                  onClick={() => handleDelete()}
                  destructive
                  className="w-20"
                  disabled={userRole === UserRole.USER}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={7}>
            Showing {birthCertificates?.length} of {birthCertificates?.length}{" "}
            rows
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default AdminBirthTable;
