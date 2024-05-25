"use server";

import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { Status } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function saveBirthStatus(id: string, status: Status) {
  // check if user exists
  const user = await currentUser();
  if (!user) return { error: "Unauthorized!" };

  // check if user exists in database
  const dbUser = await getUserById(user.id as string);
  if (!dbUser) return { error: "Unauthorized!" };

  // check if user is an admin
  if (dbUser.role !== "ADMIN") return { error: "Unauthorized!" };

  await db.birthCertificate.update({
    where: { id },
    data: {
      status,
      updatedAt: new Date(),
    },
  });

  console.log("User updated");

  revalidatePath("/amdin/certificates");
  revalidatePath("/your-certificates");

  return { success: "Status updated successfully" };
}

export async function saveDeathStatus(id: string, status: Status) {
  // check if user exists
  const user = await currentUser();
  if (!user) return { error: "Unauthorized!" };

  // check if user exists in database
  const dbUser = await getUserById(user.id as string);
  if (!dbUser) return { error: "Unauthorized!" };

  // check if user is an admin
  if (dbUser.role !== "ADMIN") return { error: "Unauthorized!" };

  await db.deathCertificate.update({
    where: { id },
    data: {
      status,
      updatedAt: new Date(),
    },
  });

  console.log("User updated");

  revalidatePath("/amdin/certificates");
  revalidatePath("/your-certificates");

  return { success: "Status updated successfully" };
}

export async function saveMarriageStatus(id: string, status: Status) {
  // check if user exists
  const user = await currentUser();
  if (!user) return { error: "Unauthorized!" };

  // check if user exists in database
  const dbUser = await getUserById(user.id as string);
  if (!dbUser) return { error: "Unauthorized!" };

  // check if user is an admin
  if (dbUser.role !== "ADMIN") return { error: "Unauthorized!" };

  await db.marriageCertificate.update({
    where: { id },
    data: {
      status,
      updatedAt: new Date(),
    },
  });

  console.log("User updated");

  revalidatePath("/amdin/certificates");
  revalidatePath("/your-certificates");

  return { success: "Status updated successfully" };
}

export async function saveResidentialStatus(id: string, status: Status) {
  // check if user exists
  const user = await currentUser();
  if (!user) return { error: "Unauthorized!" };

  // check if user exists in database
  const dbUser = await getUserById(user.id as string);
  if (!dbUser) return { error: "Unauthorized!" };

  // check if user is an admin
  if (dbUser.role !== "ADMIN") return { error: "Unauthorized!" };

  await db.residentialCertificate.update({
    where: { id },
    data: {
      status,
      updatedAt: new Date(),
    },
  });

  console.log("User updated");

  revalidatePath("/amdin/certificates");
  revalidatePath("/your-certificates");

  return { success: "Status updated successfully" };
}
