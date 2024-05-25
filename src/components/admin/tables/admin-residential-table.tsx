"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

import { Status, UserRole } from "@prisma/client";

import { IResidentialCertificates } from "@/types";

import { deleteResidentialCertificate } from "@/actions/certificates/delete-certificate";
import { saveResidentialStatus } from "@/actions/certificates/save-statuses";

import { debounce } from "@/lib/utils";

import { useCurrentRole } from "@/hooks/use-current-role";

import { selectOptions } from "@/constants";

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

  const [statuses, setStatuses] = useState(
    residentialCertificates?.map((certificate) => ({
      id: certificate.id,
      status: certificate.status,
    })) || []
  );

  const debouncedSaveStatus = debounce((id: string, newStatus: Status) => {
    let loadingToast = toast.loading("Saving Status...");
    saveResidentialStatus(id, newStatus)
      .then((data) => {
        console.log(data);
        if (data?.error) {
          toast.error(data?.error);
        }
        if (data?.success) {
          toast.success(data?.success);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      })
      .finally(() => {
        toast.dismiss(loadingToast);
      });
  }, 500);

  const handleStatusChange = (id: string, newStatus: Status) => {
    setStatuses((prevStatuses) =>
      prevStatuses.map((status) =>
        status.id === id ? { ...status, status: newStatus } : status
      )
    );

    //call the debounced save status
    debouncedSaveStatus(id, newStatus);
  };

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
          const currentStatus = statuses.find(
            (status) => status.id === certificate.id
          )?.status;

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
              <TableCell className="font-semibold">
                <select
                  className="border-2 border-gray-400 py-2 pl-3 pr-10 rounded-md cursor-pointer focus:outline-none focus:border-blue-500 font-semibold"
                  value={currentStatus}
                  onChange={(e) =>
                    handleStatusChange(certificate.id, e.target.value as Status)
                  }
                >
                  {selectOptions.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                      className="bg-white text-gray-800 hover:bg-gray-100 font-medium"
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
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
