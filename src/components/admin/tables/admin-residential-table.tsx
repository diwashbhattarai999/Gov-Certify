"use client";

import Link from "next/link";
import toast from "react-hot-toast";

import { Status, UserRole } from "@prisma/client";

import { IResidentialCertificates } from "@/types";

import { deleteResidentialCertificate } from "@/actions/certificates/delete-certificate";

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

interface IAdminResidentialTableProps {
  residentialCertificates: IResidentialCertificates[] | null;
}

const AdminResidentialTable = ({
  residentialCertificates,
}: IAdminResidentialTableProps) => {
  const userRole = useCurrentRole();

  const handleDelete = (id: string) => {
    let loadingToast = toast.loading("Deleting certificate...");
    deleteResidentialCertificate(id)
      .then((data) => {
        if (data?.error) {
          toast.dismiss(loadingToast);
          toast.error(data?.error);
        }
        if (data?.success) {
          toast.dismiss(loadingToast);
          toast.success(data?.success);
        }
      })
      .catch(() => toast.success("Something went wrong"));
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
        {residentialCertificates?.map((certificate, index) => {
          return (
            <TableRow key={certificate.id} className="cursor-pointer">
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{certificate.applicationNumber}</TableCell>
              <TableCell>
                {`${certificate.requester.requesterFirstName} ${
                  certificate.requester.requesterMiddleName || ""
                } ${certificate.requester.requesterLastName} `}
              </TableCell>
              <TableCell className="capitalize">Residential</TableCell>
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
                <Link
                  href={`/admin/certificates/residential/${certificate.id}`}
                >
                  <Button className="w-20">View</Button>
                </Link>
                <Button
                  onClick={() => handleDelete(certificate.id)}
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
            Showing {residentialCertificates?.length} of{" "}
            {residentialCertificates?.length} rows
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default AdminResidentialTable;
