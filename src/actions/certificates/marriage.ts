"use server";

import { revalidatePath } from "next/cache";

import { Relationship, Status } from "@prisma/client";

import { IMarriageFormData } from "@/types";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

import { getUserById } from "@/data/user";
import { getRequesterByEmail } from "@/data/certificates/requester";

export const marriage = async (formData: IMarriageFormData) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized!" };
  }

  const dbUser = await getUserById(user.id as string);

  if (!dbUser) {
    return { error: "Unauthorized!" };
  }

  const {
    husbandFirstName,
    husbandMiddleName,
    husbandLastName,
    WifeFirstName,
    wifeMiddleName,
    wifeLastName,
    dateOfMarriage,
    placeOfMarriageCity,
    placeOfMarriageCountry,
    placeOfMarriageProvince,
    placeOfMarriageDistrict,
    relationshipToRequestor,
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

  const relationship =
    relationshipToRequestor !== undefined
      ? relationshipToRequestor
      : Relationship.OTHERS;

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

    await db.marriageCertificate.create({
      data: {
        husbandFirstName,
        husbandMiddleName,
        husbandLastName,
        WifeFirstName,
        wifeMiddleName,
        wifeLastName,
        dateOfMarriage,
        placeOfMarriageCity,
        placeOfMarriageCountry,
        placeOfMarriageProvince,
        placeOfMarriageDistrict,
        relationshipToRequestor: relationship,
        applicationNumber,
        status: Status.PENDING,
        requesterId: existingRequester.id,
        deliveryDetailsId: newDeliveryDetails.id,
        userId: dbUser.id,
      },
    });
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

    await db.marriageCertificate.create({
      data: {
        husbandFirstName,
        husbandMiddleName,
        husbandLastName,
        WifeFirstName,
        wifeMiddleName,
        wifeLastName,
        dateOfMarriage,
        placeOfMarriageCity,
        placeOfMarriageCountry,
        placeOfMarriageProvince,
        placeOfMarriageDistrict,
        relationshipToRequestor: relationship,
        applicationNumber,
        status: Status.PENDING,
        requesterId: newRequester.id,
        deliveryDetailsId: newDeliveryDetails.id,
        userId: dbUser.id,
      },
    });
  }

  revalidatePath("/your-certificates");
  return { success: "Form Submitted" };
};

async function generateApplicationNumber() {
  const lastApplication = await db.marriageCertificate.findFirst({
    orderBy: { createdAt: "desc" },
  });

  if (lastApplication) {
    const lastApplicationNumber = lastApplication.applicationNumber;
    const lastNumber = parseInt(lastApplicationNumber.replace("APM", ""));
    const nextNumber = lastNumber + 1;
    return `APM${nextNumber.toString().padStart(3, "0")}`;
  } else {
    return "APM001";
  }
}
