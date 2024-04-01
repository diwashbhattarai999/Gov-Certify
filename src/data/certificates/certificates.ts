import { db } from "@/lib/db";

export const getCertificatesByUserId = async (userId: string) => {
  try {
    const certificates = await db.birthCertificate.findMany({
      where: { userId },
      select: {
        id: true,
        userId: true,
        requesterId: true,
        applicationNumber: true,
        status: true,
        firstName: true,
        middleName: true,
        lastName: true,
        placeOfBirthCountry: true,
        placeOfBirthProvince: true,
        placeOfBirthCity: true,
        DateOfBirth: true,
        gender: true,
        fatherFirstName: true,
        fatherMiddleName: true,
        fatherLastName: true,
        motherFirstName: true,
        motherMiddleName: true,
        motherLastName: true,
        createdAt: true,
        updatedAt: true,
        requester: true,
        deliveryDetails: true,
      },
    });

    return certificates;
  } catch (error) {
    return null;
  }
};
