"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { LuInfo } from "react-icons/lu";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { StatusSchema } from "@/schemas";

import { Status, UserRole } from "@prisma/client";

import { useCurrentRole } from "@/hooks/use-current-role";

import { cn } from "@/lib/utils";

import {
  IBirthCertificates,
  IDeathCertificates,
  IMarriageCertificates,
  IResidentialCertificates,
} from "@/types";

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
import Select from "@/components/ui/select";

interface ICertificateTableProps {
  allCertificates: {
    birth: IBirthCertificates[];
    death: IDeathCertificates[];
    marriage: IMarriageCertificates[];
    residential: IResidentialCertificates[];
  };
  isAdmin?: boolean;
}

const adminStatusOptions = [
  {
    value: Status.APPROVED,
    label: "APPROVED",
  },
  {
    value: Status.REJECTED,
    label: "REJECTED",
  },
  {
    value: Status.PENDING,
    label: "PENDING",
  },
];

const defaultValues = {
  status: Status.PENDING,
};

const CertificateTable = ({
  allCertificates,
  isAdmin,
}: ICertificateTableProps) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [selectStatus, setSelectStatus] = useState("Select status...");

  const userRole = useCurrentRole();
  let serialNumber = 1;

  const handleView = (id: string) => {
    console.log("View certificate with ID:", id);
  };

  const handleDelete = (
    type: "birth" | "death" | "marriage" | "residential"
  ) => {
    console.log("Delete selected certificates of type", type);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof StatusSchema>>({
    resolver: zodResolver(StatusSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<typeof defaultValues> = (values) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      // register(values).then((data) => {
      //   setError(data.error);
      //   setSuccess(data.sucess);
      // });
      console.log(values);
    });
  };

  const renderTableBody = (
    certificates: (
      | IBirthCertificates
      | IDeathCertificates
      | IMarriageCertificates
      | IResidentialCertificates
    )[],
    type: "birth" | "death" | "marriage" | "residential"
  ) => {
    return certificates.map((certificate, index) => {
      // Type guard to check if it's a marriage certificate
      if (type === "marriage") {
        const marriageCertificate = certificate as IMarriageCertificates;
        return (
          <TableRow key={marriageCertificate.id} className="cursor-pointer">
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
              {isAdmin ? (
                <>
                  <Select
                    name="status"
                    value={selectStatus}
                    setSelectValue={setSelectStatus}
                    Icon={LuInfo}
                    error={errors.status?.message}
                    disabled={isPending}
                    options={adminStatusOptions}
                    register={register("status")}
                  />
                </>
              ) : (
                <>{marriageCertificate.status}</>
              )}
            </TableCell>
            <TableCell className="flex gap-4">
              <Link
                href={`/your-certificates/${type}?id=${marriageCertificate.id}`}
              >
                <Button
                  onClick={() => handleView(marriageCertificate.id)}
                  className="w-20"
                >
                  View
                </Button>
              </Link>
              <Button
                onClick={() => handleDelete(type)}
                destructive
                className="w-20"
                disabled={userRole === UserRole.USER}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        );
      }

      // For residential certificate
      if (type === "residential") {
        const residentialCertificate = certificate as IResidentialCertificates;
        return (
          <TableRow key={residentialCertificate.id} className="cursor-pointer">
            <TableCell className="font-medium">{serialNumber++}</TableCell>
            <TableCell>{residentialCertificate.applicationNumber}</TableCell>
            <TableCell>
              {`${residentialCertificate.requester.requesterFirstName} ${
                residentialCertificate.requester.requesterMiddleName || ""
              } ${residentialCertificate.requester.requesterLastName} `}
            </TableCell>
            <TableCell className="capitalize">{type}</TableCell>
            <TableCell
              className={cn(
                "font-semibold",
                residentialCertificate.status === Status.APPROVED &&
                  "text-emerald-500",
                residentialCertificate.status === Status.REJECTED &&
                  "text-red-500",
                residentialCertificate.status === Status.PENDING &&
                  "text-amber-500"
              )}
            >
              {isAdmin ? (
                <>
                  <Select
                    name="status"
                    value={selectStatus}
                    setSelectValue={setSelectStatus}
                    Icon={LuInfo}
                    error={errors.status?.message}
                    disabled={isPending}
                    options={adminStatusOptions}
                    register={register("status")}
                  />
                </>
              ) : (
                <> {residentialCertificate.status}</>
              )}
            </TableCell>
            <TableCell className="flex gap-4">
              <Link
                href={`/your-certificates/${type}?id=${residentialCertificate.id}`}
              >
                <Button
                  onClick={() => handleView(residentialCertificate.id)}
                  className="w-20"
                >
                  View
                </Button>
              </Link>
              <Button
                onClick={() => handleDelete(type)}
                destructive
                className="w-20"
                disabled={userRole === UserRole.USER}
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
        <TableRow key={id} className="cursor-pointer">
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
            {isAdmin ? (
              <>
                <Select
                  name="status"
                  value={selectStatus}
                  setSelectValue={setSelectStatus}
                  Icon={LuInfo}
                  error={errors.status?.message}
                  disabled={isPending}
                  options={adminStatusOptions}
                  register={register("status")}
                />
              </>
            ) : (
              <> {status}</>
            )}
          </TableCell>
          <TableCell className="flex gap-4">
            <Link href={`/your-certificates/${type}?id=${id}`}>
              <Button onClick={() => handleView(id)} className="w-20">
                View
              </Button>
            </Link>
            <Button
              onClick={() => handleDelete(type)}
              destructive
              className="w-20"
              disabled={userRole === UserRole.USER}
            >
              Delete
            </Button>
          </TableCell>
        </TableRow>
      );
    });
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
        {renderTableBody(allCertificates.birth, "birth")}
        {renderTableBody(allCertificates.death, "death")}
        {renderTableBody(allCertificates.marriage, "marriage")}
        {renderTableBody(allCertificates.residential, "residential")}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={7}>
            Showing{" "}
            {(allCertificates.birth.length +
              allCertificates.death.length +
              allCertificates.marriage.length) |
              allCertificates.residential.length}{" "}
            of{" "}
            {allCertificates.birth.length +
              allCertificates.death.length +
              allCertificates.marriage.length +
              allCertificates.residential.length}{" "}
            rows
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default CertificateTable;
