"use server";

import { revalidatePath } from "next/cache";

import { Relationship, Status } from "@prisma/client";

import { IBirthFormData } from "@/types";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

import { getUserById } from "@/data/user";
import { getRequesterByEmail } from "@/data/certificates/requester";

export const birth = async (formData: IBirthFormData) => {
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
    dateOfBirth,
    gender,
    placeOfBirthCountry,
    placeOfBirthProvince,
    placeOfBirthDistrict,
    placeOfBirthCity,
    fatherFirstName,
    fatherMiddleName,
    fatherLastName,
    motherFirstName,
    motherMiddleName,
    motherLastName,
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

    await db.birthCertificate.create({
      data: {
        firstName,
        middleName,
        lastName,
        DateOfBirth: dateOfBirth,
        gender,
        placeOfBirthCountry,
        placeOfBirthProvince,
        placeOfBirthDistrict,
        placeOfBirthCity,
        fatherFirstName,
        fatherMiddleName,
        fatherLastName,
        motherFirstName,
        motherMiddleName,
        motherLastName,
        applicationNumber,
        relationshipToRequestor: relationship,
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

    await db.birthCertificate.create({
      data: {
        firstName,
        middleName,
        lastName,
        DateOfBirth: dateOfBirth,
        gender,
        placeOfBirthCountry,
        placeOfBirthProvince,
        placeOfBirthDistrict,
        placeOfBirthCity,
        fatherFirstName,
        fatherMiddleName,
        fatherLastName,
        motherFirstName,
        motherMiddleName,
        motherLastName,
        applicationNumber,
        relationshipToRequestor: relationship,
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
  const lastApplication = await db.birthCertificate.findFirst({
    orderBy: { createdAt: "desc" },
  });

  if (lastApplication) {
    const lastApplicationNumber = lastApplication.applicationNumber;
    const lastNumber = parseInt(lastApplicationNumber.replace("APB", ""));
    const nextNumber = lastNumber + 1;
    return `APB${nextNumber.toString().padStart(3, "0")}`;
  } else {
    return "APB001";
  }
}
