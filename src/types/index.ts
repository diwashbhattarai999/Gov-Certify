import * as z from "zod";

import {
  DeliveryDetailsSchema,
  BirthDetailsSchema,
  RequesterDetailsSchema,
  DeathDetailsSchema,
  MarriageDetailsSchema,
  ResidentialDetailsSchema,
  FamilyMemberSchema,
} from "@/schemas";
import {
  DeliveryDetails,
  FamilyMember,
  Gender,
  Requester,
  Status,
} from "@prisma/client";

export type IBirthFormData = z.infer<
  typeof BirthDetailsSchema &
    typeof RequesterDetailsSchema &
    typeof DeliveryDetailsSchema
>;

export type IDeathFormData = z.infer<
  typeof DeathDetailsSchema &
    typeof RequesterDetailsSchema &
    typeof DeliveryDetailsSchema
>;

export type IMarriageFormData = z.infer<
  typeof MarriageDetailsSchema &
    typeof RequesterDetailsSchema &
    typeof DeliveryDetailsSchema
>;

export type IResidentialFormData = z.infer<
  typeof ResidentialDetailsSchema &
    typeof RequesterDetailsSchema &
    typeof DeliveryDetailsSchema
>;

export interface IBirthCertificates {
  id: string;
  requesterId: string;
  deliveryDetailsId: string;
  applicationNumber: string;
  status: Status;
  firstName: string;
  middleName: string | null;
  lastName: string;
  placeOfBirthCountry: string;
  placeOfBirthDistrict: string;
  placeOfBirthProvince: string;
  placeOfBirthCity: string;
  DateOfBirth: string;
  gender: Gender;
  fatherFirstName: string;
  fatherMiddleName: string | null;
  fatherLastName: string;
  motherFirstName: string;
  motherMiddleName: string | null;
  motherLastName: string;
  relationshipToRequestor: string;
  requester: Requester;
  deliveryDetails: DeliveryDetails;
}

export interface IDeathCertificates {
  id: string;
  requesterId: string;
  deliveryDetailsId: string;
  applicationNumber: string;
  status: Status;
  firstName: string;
  middleName: string | null;
  lastName: string;
  placeOfDeathCountry: string;
  placeOfDeathProvince: string;
  placeOfDeathDistrict: string;
  placeOfDeathCity: string;
  dateOfDeath: string;
  gender: Gender;
  causeOfDeath: string;
  relationshipToRequestor: string;
  requester: Requester;
  deliveryDetails: DeliveryDetails;
}

export interface IMarriageCertificates {
  id: string;
  requesterId: string;
  deliveryDetailsId: string;
  applicationNumber: string;
  status: Status;
  husbandFirstName: string;
  husbandMiddleName: string | null;
  husbandLastName: string;
  WifeFirstName: string;
  wifeMiddleName: string | null;
  wifeLastName: string;
  placeOfMarriageCountry: string;
  placeOfMarriageProvince: string;
  placeOfMarriageDistrict: string;
  placeOfMarriageCity: string;
  dateOfMarriage: string;
  relationshipToRequestor: string;
  requester: Requester;
  deliveryDetails: DeliveryDetails;
}

export interface IResidentialCertificates {
  id: string;
  requesterId: string;
  deliveryDetailsId: string;
  applicationNumber: string;
  status: Status;
  currentCountry: string;
  currentProvince: string;
  currentDistrict: string;
  currentCity: string;
  destinationCountry: string;
  destinationDistrict: string;
  destinationProvince: string;
  destinationCity: string;
  dateOfResidentialMigration: string;
  requester: Requester;
  deliveryDetails: DeliveryDetails;
  familyMembers: FamilyMember[];
}

export type ICertificates =
  | IBirthCertificates
  | IDeathCertificates
  | IMarriageCertificates
  | IResidentialCertificates;
