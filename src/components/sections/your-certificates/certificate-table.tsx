"use client";

import { useState } from "react";
import {
  BirthCertificate,
  DeliveryDetails,
  Requester,
  Status,
  UserRole,
} from "@prisma/client";
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
import { useCurrentRole } from "@/hooks/use-current-role";
import { cn } from "@/lib/utils";

interface Certificate extends BirthCertificate {
  selected?: boolean;
}

interface ICertificateTableProps {
  birthCertificates:
    | (Certificate & {
        requester: Requester;
        deliveryDetails: DeliveryDetails | null;
      })[]
    | null;
}

const CertificateTable = ({ birthCertificates }: ICertificateTableProps) => {
  const [certificates, setCertificates] = useState(birthCertificates || []);

  const userRole = useCurrentRole();

  const handleCheckboxChange = (id: string) => {
    setCertificates((prevCertificates) =>
      prevCertificates.map((certificate) =>
        certificate.id === id
          ? { ...certificate, selected: !certificate.selected }
          : certificate
      )
    );
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setCertificates((prevCertificates) =>
      prevCertificates.map((certificate) => ({
        ...certificate,
        selected: isChecked,
      }))
    );
  };

  const handleView = (id: string) => {
    console.log("View certificate with ID:", id);
  };

  const handleDelete = () => {
    const selectedCertificates = certificates.filter(
      (certificate) => certificate.selected
    );
    console.log("Delete selected certificates:", selectedCertificates);
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableCaption>A list of recent applied certificates.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={certificates.every(
                  (certificate) => certificate.selected
                )}
              />
            </TableHead>
            <TableHead className="w-[100px]">S.No.</TableHead>
            <TableHead>Application Number</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Status</TableHead>
            <TableHead colSpan={2}>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {certificates.map((certificate, index) => (
            <TableRow
              key={certificate.id}
              onClick={() => handleCheckboxChange(certificate.id)}
              className="cursor-pointer"
            >
              <TableCell>
                <input
                  type="checkbox"
                  checked={certificate.selected || false}
                  onChange={() => {}}
                />
              </TableCell>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{certificate.applicationNumber}</TableCell>
              <TableCell>
                {`${certificate.firstName} ${
                  certificate.middleName ? certificate.middleName : ""
                } ${certificate.lastName}`}
              </TableCell>
              <TableCell>{certificate.gender}</TableCell>
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
              <TableCell colSpan={2} className="flex gap-4">
                <Button
                  onClick={() => handleView(certificate.id)}
                  className="w-20"
                >
                  View
                </Button>
                <Button
                  onClick={handleDelete}
                  destructive
                  className="w-20"
                  disabled={!certificate.selected || userRole === UserRole.USER}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={7}>
              Showing {certificates.length} of{" "}
              {birthCertificates ? birthCertificates.length : 0} rows
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default CertificateTable;
