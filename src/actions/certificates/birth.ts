"use server";

import { IBirthFormData } from "@/types";

import { getUserById } from "@/data/user";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { getRequesterByEmail } from "@/data/certificates/birth";
import { Status } from "@prisma/client";

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
    requesterFirstName,
    requesterMiddleName,
    requesterLastName,
    requesterEmail,
    requesterMobileNumber,
    requesterRelationshipToOwner,
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
        requesterRelationshipToOwner,
      },
    });

    const applicationNumber = await generateApplicationNumber();

    const newBirthCertificate = await db.birthCertificate.create({
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
        requesterId: existingRequester.id,
        userId: dbUser.id,
        status: Status.PENDING,
        applicationNumber,
      },
    });

    await db.deliveryDetails.create({
      data: {
        deliveryOption: DeliveryOption,
        deliveryProvince,
        deliveryDistrict,
        deliveryAddress,
        deliveryMunicipality,
        deliveryWard,
        deliveryPostalCode,
        birthCertificateId: newBirthCertificate.id,
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
        requesterRelationshipToOwner,
      },
    });

    const applicationNumber = await generateApplicationNumber();

    const newBirthCertificate = await db.birthCertificate.create({
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
        requesterId: newRequester.id,
        userId: dbUser.id,
        status: Status.PENDING,
        applicationNumber,
      },
    });

    await db.deliveryDetails.create({
      data: {
        deliveryOption: DeliveryOption,
        deliveryProvince,
        deliveryDistrict,
        deliveryAddress,
        deliveryMunicipality,
        deliveryWard,
        deliveryPostalCode,
        birthCertificateId: newBirthCertificate.id,
      },
    });
  }

  return { success: "Form Submitted" };
};

async function generateApplicationNumber() {
  const lastApplication = await db.birthCertificate.findFirst({
    orderBy: { createdAt: "desc" },
  });

  if (lastApplication) {
    const lastApplicationNumber = lastApplication.applicationNumber;
    const lastNumber = parseInt(lastApplicationNumber.replace("AP", ""));
    const nextNumber = lastNumber + 1;
    return `AP${nextNumber.toString().padStart(3, "0")}`;
  } else {
    return "AP001";
  }
}
