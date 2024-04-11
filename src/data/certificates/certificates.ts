import {
  IBirthCertificates,
  IDeathCertificates,
  IMarriageCertificates,
} from "@/types";

import { db } from "@/lib/db";

export const getBirthCertificatesByUserId = async (userId: string) => {
  try {
    const birthCertificates: IBirthCertificates[] =
      await db.birthCertificate.findMany({
        where: { userId },
        select: {
          id: true,
          requesterId: true,
          deliveryDetailsId: true,
          applicationNumber: true,
          status: true,
          firstName: true,
          middleName: true,
          lastName: true,
          placeOfBirthCountry: true,
          placeOfBirthDistrict: true,
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
          relationshipToRequestor: true,
          requester: true,
          deliveryDetails: true,
        },
      });

    return birthCertificates;
  } catch (error) {
    return null;
  }
};

export const getDeathCertificatesByUserId = async (userId: string) => {
  try {
    const deathCertificates: IDeathCertificates[] =
      await db.deathCertificate.findMany({
        where: { userId },
        select: {
          id: true,
          requesterId: true,
          deliveryDetailsId: true,
          applicationNumber: true,
          status: true,
          firstName: true,
          middleName: true,
          lastName: true,
          placeOfDeathCountry: true,
          placeOfDeathProvince: true,
          placeOfDeathDistrict: true,
          placeOfDeathCity: true,
          dateOfDeath: true,
          relationshipToRequestor: true,
          gender: true,
          causeOfDeath: true,
          requester: true,
          deliveryDetails: true,
        },
      });

    return deathCertificates;
  } catch (error) {
    return null;
  }
};

export const getMarriageCertificatesByUserId = async (userId: string) => {
  try {
    const marriageCertificates: IMarriageCertificates[] =
      await db.marriageCertificate.findMany({
        where: { userId },
        select: {
          id: true,
          requesterId: true,
          deliveryDetailsId: true,
          applicationNumber: true,
          status: true,
          husbandFirstName: true,
          husbandMiddleName: true,
          husbandLastName: true,
          WifeFirstName: true,
          wifeMiddleName: true,
          wifeLastName: true,
          placeOfMarriageCountry: true,
          placeOfMarriageProvince: true,
          placeOfMarriageDistrict: true,
          placeOfMarriageCity: true,
          dateOfMarriage: true,
          relationshipToRequestor: true,
          requester: true,
          deliveryDetails: true,
        },
      });

    return marriageCertificates;
  } catch (error) {
    return null;
  }
};
