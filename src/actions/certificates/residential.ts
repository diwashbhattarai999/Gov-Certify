"use server";

import { revalidatePath } from "next/cache";

import { Status } from "@prisma/client";

import { IResidentialFormData } from "@/types";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

import { getUserById } from "@/data/user";
import { getRequesterByEmail } from "@/data/certificates/requester";

export const residential = async (formData: IResidentialFormData) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized!" };
  }

  const dbUser = await getUserById(user.id as string);

  if (!dbUser) {
    return { error: "Unauthorized!" };
  }

  const {
    currentCountry,
    currentProvince,
    currentDistrict,
    currentCity,
    destinationCountry,
    destinationProvince,
    destinationDistrict,
    destinationCity,
    dateOfResidentialMigration,
    familyMembers,
    requesterFirstName,
    requesterMiddleName,
    requesterLastName,
    requesterEmail,
    requesterMobileNumber,
    DeliveryOption,
    deliveryProvince,
    deliveryDistrict,
    deliveryAddress,
    deliveryMunicipality,
    deliveryWard,
    deliveryPostalCode,
  } = formData;

  const existingRequester = await getRequesterByEmail(requesterEmail);

  if (existingRequester) {
    await db.requester.update({
      where: { requesterEmail },
      data: {
        requesterFirstName,
        requesterMiddleName,
        requesterLastName,
        requesterEmail,
        requesterMobileNumber,
      },
    });

    const newDeliveryDetails = await db.deliveryDetails.create({
      data: {
        deliveryOption: DeliveryOption,
        deliveryProvince,
        deliveryDistrict,
        deliveryAddress,
        deliveryMunicipality,
        deliveryWard,
        deliveryPostalCode,
      },
    });

    const applicationNumber = await generateApplicationNumber();

    const newResidentialCertificate = await db.residentialCertificate.create({
      data: {
        currentCountry,
        currentProvince,
        currentDistrict,
        currentCity,
        destinationCountry,
        destinationProvince,
        destinationDistrict,
        destinationCity,
        dateOfResidentialMigration,
        applicationNumber,
        status: Status.PENDING,
        requesterId: existingRequester.id,
        deliveryDetailsId: newDeliveryDetails.id,
        userId: dbUser.id,
      },
    });

    familyMembers.forEach(
      async ({
        firstName,
        middleName,
        lastName,
        dateOfBirth,
        placeOfBirth,
        gender,
        relationshipToRequestor,
      }) => {
        await db.familyMember.create({
          data: {
            firstName,
            middleName,
            lastName,
            dateOfBirth,
            placeOfBirth,
            gender,
            relationshipToRequester: relationshipToRequestor,
            residentialCertificateId: newResidentialCertificate.id,
          },
        });
      }
    );
  } else {
    const newRequester = await db.requester.create({
      data: {
        requesterFirstName,
        requesterMiddleName,
        requesterLastName,
        requesterEmail,
        requesterMobileNumber,
      },
    });

    const newDeliveryDetails = await db.deliveryDetails.create({
      data: {
        deliveryOption: DeliveryOption,
        deliveryProvince,
        deliveryDistrict,
        deliveryAddress,
        deliveryMunicipality,
        deliveryWard,
        deliveryPostalCode,
      },
    });

    const applicationNumber = await generateApplicationNumber();

    const newResidentialCertificate = await db.residentialCertificate.create({
      data: {
        currentCountry,
        currentProvince,
        currentDistrict,
        currentCity,
        destinationCountry,
        destinationProvince,
        destinationDistrict,
        destinationCity,
        dateOfResidentialMigration,
        applicationNumber,
        status: Status.PENDING,
        requesterId: newRequester.id,
        deliveryDetailsId: newDeliveryDetails.id,
        userId: dbUser.id,
      },
    });

    familyMembers.forEach(
      async ({
        firstName,
        middleName,
        lastName,
        dateOfBirth,
        placeOfBirth,
        gender,
        relationshipToRequestor,
      }) => {
        await db.familyMember.create({
          data: {
            firstName,
            middleName,
            lastName,
            dateOfBirth,
            placeOfBirth,
            gender,
            relationshipToRequester: relationshipToRequestor,
            residentialCertificateId: newResidentialCertificate.id,
          },
        });
      }
    );
  }

  revalidatePath("/your-certificates");
  return { success: "Form Submitted" };
};

async function generateApplicationNumber() {
  const lastApplication = await db.residentialCertificate.findFirst({
    orderBy: { createdAt: "desc" },
  });

  if (lastApplication) {
    const lastApplicationNumber = lastApplication.applicationNumber;
    const lastNumber = parseInt(lastApplicationNumber.replace("APR", ""));
    const nextNumber = lastNumber + 1;
    return `APR${nextNumber.toString().padStart(3, "0")}`;
  } else {
    return "APR001";
  }
}
