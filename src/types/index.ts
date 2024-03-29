import * as z from "zod";

import {
  DeliveryDetailsSchema,
  PersonalDetailsSchema,
  RequesterDetailsSchema,
} from "@/schemas";

export type IBirthFormData = z.infer<
  typeof PersonalDetailsSchema &
    typeof RequesterDetailsSchema &
    typeof DeliveryDetailsSchema
>;
