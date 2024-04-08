import * as z from "zod";

import {
  DeliveryDetailsSchema,
  BirthDetailsSchema,
  RequesterDetailsSchema,
  DeathDetailsSchema,
  MarriageDetailsSchema,
  ResidentialDetailsSchema,
} from "@/schemas";
import { DeliveryDetails, Gender, Requester, Status } from "@prisma/client";

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
  requester: Requester;
  deliveryDetails: DeliveryDetails;
}

export type ICertificates = (IBirthCertificates | IDeathCertificates);
