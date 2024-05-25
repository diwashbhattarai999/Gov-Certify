import { Status } from "@prisma/client";

export const NAV_LINKS = [
  {
    label: "Your Certificates",
    path: "/your-certificates",
  },
  {
    label: "About",
    path: "/about",
  },
  {
    label: "Contact",
    path: "/contact",
  },
  {
    label: "FAQ",
    path: "/faq",
  },
];

export const selectOptions = [
  {
    label: "Pending",
    value: Status.PENDING,
  },
  {
    label: "Approved",
    value: Status.APPROVED,
  },
  {
    label: "Rejected",
    value: Status.REJECTED,
  },
];
