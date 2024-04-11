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
import {
  IBirthCertificates,
  IDeathCertificates,
  IMarriageCertificates,
} from "@/types";

interface ICertificateTableProps {
  allCertificates: {
    birth: IBirthCertificates[];
    death: IDeathCertificates[];
    marriage: IMarriageCertificates[];
  };
}

const CertificateTable = ({ allCertificates }: ICertificateTableProps) => {
  const [selectedCertificates, setSelectedCertificates] = useState<{
    birth: string[];
    death: string[];
    marriage: string[];
  }>({
    birth: [],
    death: [],
    marriage: [],
  });
  const userRole = useCurrentRole();
  let serialNumber = 1;

  const handleCheckboxChange = (
    type: "birth" | "death" | "marriage",
    id: string
  ) => {
    setSelectedCertificates((prev) => ({
      ...prev,
      [type]: prev[type].includes(id)
        ? prev[type].filter((item) => item !== id)
        : [...prev[type], id],
    }));
  };

  const handleSelectAll = (
    type: "birth" | "death" | "marriage",
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const isChecked = event.target.checked;
    setSelectedCertificates((prev) => ({
      ...prev,
      [type]: isChecked ? allCertificates[type].map((cert) => cert.id) : [],
    }));
  };

  const handleView = (id: string) => {
    console.log("View certificate with ID:", id);
  };

  const handleDelete = (type: "birth" | "death" | "marriage") => {
    console.log(
      "Delete selected certificates of type",
      type,
      ":",
      selectedCertificates[type]
    );
  };

  const renderTableBody = (
    certificates: (
      | IBirthCertificates
      | IDeathCertificates
      | IMarriageCertificates
    )[],
    type: "birth" | "death" | "marriage"
  ) => {
    return certificates.map((certificate, index) => {
      // Type guard to check if it's a marriage certificate
      if (type === "marriage") {
        const marriageCertificate = certificate as IMarriageCertificates;
        return (
          <TableRow
            key={marriageCertificate.id}
            onClick={() => handleCheckboxChange(type, marriageCertificate.id)}
            className="cursor-pointer"
          >
            <TableCell>
              <input
                type="checkbox"
                checked={selectedCertificates[type].includes(
                  marriageCertificate.id
                )}
                onChange={() =>
                  handleCheckboxChange(type, marriageCertificate.id)
                }
              />
            </TableCell>
            <TableCell className="font-medium">{serialNumber++}</TableCell>
            <TableCell>{marriageCertificate.applicationNumber}</TableCell>
            <TableCell>
              {`${marriageCertificate.husbandFirstName} ${
                marriageCertificate.husbandMiddleName || ""
              } ${marriageCertificate.husbandLastName} & ${
                marriageCertificate.WifeFirstName
              } ${marriageCertificate.wifeMiddleName || ""} ${
                marriageCertificate.wifeLastName
              }`}
            </TableCell>
            <TableCell className="capitalize">{type}</TableCell>
            <TableCell
              className={cn(
                "font-semibold",
                marriageCertificate.status === Status.APPROVED &&
                  "text-emerald-500",
                marriageCertificate.status === Status.REJECTED &&
                  "text-red-500",
                marriageCertificate.status === Status.PENDING &&
                  "text-amber-500"
              )}
            >
              {marriageCertificate.status}
            </TableCell>
            <TableCell colSpan={2} className="flex gap-4">
              <Button
                onClick={() => handleView(marriageCertificate.id)}
                className="w-20"
              >
                View
              </Button>
              <Button
                onClick={() => handleDelete(type)}
                destructive
                className="w-20"
                disabled={
                  !selectedCertificates[type].includes(
                    marriageCertificate.id
                  ) || userRole === UserRole.USER
                }
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        );
      }
      // For birth and death certificates
      const { id, applicationNumber, firstName, middleName, lastName, status } =
        certificate as IBirthCertificates | IDeathCertificates;
      return (
        <TableRow
          key={id}
          onClick={() => handleCheckboxChange(type, id)}
          className="cursor-pointer"
        >
          <TableCell>
            <input
              type="checkbox"
              checked={selectedCertificates[type].includes(id)}
              onChange={() => handleCheckboxChange(type, id)}
            />
          </TableCell>
          <TableCell className="font-medium">{serialNumber++}</TableCell>
          <TableCell>{applicationNumber}</TableCell>
          <TableCell>{`${firstName} ${
            middleName || ""
          } ${lastName}`}</TableCell>
          <TableCell className="capitalize">{type}</TableCell>
          <TableCell
            className={cn(
              "font-semibold",
              status === Status.APPROVED && "text-emerald-500",
              status === Status.REJECTED && "text-red-500",
              status === Status.PENDING && "text-amber-500"
            )}
          >
            {status}
          </TableCell>
          <TableCell colSpan={2} className="flex gap-4">
            <Button onClick={() => handleView(id)} className="w-20">
              View
            </Button>
            <Button
              onClick={() => handleDelete(type)}
              destructive
              className="w-20"
              disabled={
                !selectedCertificates[type].includes(id) ||
                userRole === UserRole.USER
              }
            >
              Delete
            </Button>
          </TableCell>
        </TableRow>
      );
    });
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
                onChange={(e) => handleSelectAll("birth", e)}
                checked={
                  allCertificates.birth.length > 0 &&
                  allCertificates.birth.every((cert) =>
                    selectedCertificates.birth.includes(cert.id)
                  )
                }
              />
            </TableHead>
            <TableHead className="w-[100px]">S.No.</TableHead>
            <TableHead>Application Number</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Certificate Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead colSpan={2}>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {renderTableBody(allCertificates.birth, "birth")}
          {renderTableBody(allCertificates.death, "death")}
          {renderTableBody(allCertificates.marriage, "marriage")}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={7}>
              Showing{" "}
              {allCertificates.birth.length +
                allCertificates.death.length +
                allCertificates.marriage.length}{" "}
              of{" "}
              {allCertificates.birth.length +
                allCertificates.death.length +
                allCertificates.marriage.length}{" "}
              rows
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default CertificateTable;
