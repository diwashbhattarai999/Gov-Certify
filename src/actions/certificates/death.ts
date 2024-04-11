"use server";

import { revalidatePath } from "next/cache";

import { Status } from "@prisma/client";

import { IDeathFormData } from "@/types";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

import { getUserById } from "@/data/user";
import { getRequesterByEmail } from "@/data/certificates/requester";

export const death = async (formData: IDeathFormData) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized!" };
  }

  const dbUser = await getUserById(user.id as string);

  if (!dbUser) {
    return { error: "Unauthorized!" };
  }

  const {
    firstName,
    middleName,
    lastName,
    causeOfDeath,
    dateOfDeath,
    gender,
    placeOfDeathCity,
    placeOfDeathCountry,
    placeOfDeathDistrict,
    placeOfDeathProvince,
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

    await db.deathCertificate.create({
      data: {
        firstName,
        middleName,
        lastName,
        causeOfDeath,
        dateOfDeath,
        gender,
        placeOfDeathCity,
        placeOfDeathCountry,
        placeOfDeathDistrict,
        placeOfDeathProvince,
        applicationNumber,
        relationshipToRequestor,
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

    const newDeathCertificate = await db.deathCertificate.create({
      data: {
        firstName,
        middleName,
        lastName,
        causeOfDeath,
        dateOfDeath: dateOfDeath,
        gender,
        placeOfDeathCity,
        placeOfDeathCountry,
        placeOfDeathDistrict,
        placeOfDeathProvince,
        applicationNumber,
        relationshipToRequestor,
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
  const lastApplication = await db.deathCertificate.findFirst({
    orderBy: { createdAt: "desc" },
  });

  if (lastApplication) {
    const lastApplicationNumber = lastApplication.applicationNumber;
    const lastNumber = parseInt(lastApplicationNumber.replace("APD", ""));
    const nextNumber = lastNumber + 1;
    return `APD${nextNumber.toString().padStart(3, "0")}`;
  } else {
    return "APD001";
  }
}
