"use server";

import { revalidatePath } from "next/cache";

import { getUserById } from "@/data/user";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function deleteBirthCertificate(id: string) {
  // check if user exists
  const user = await currentUser();
  if (!user) return { error: "Unauthorized!" };

  // check if user exists in database
  const dbUser = await getUserById(user.id as string);
  if (!dbUser) return { error: "Unauthorized!" };

  // check if user is an admin
  if (dbUser.role !== "ADMIN") return { error: "Unauthorized!" };

  await db.birthCertificate.delete({
    where: { id },
  });

  revalidatePath("/amdin/certificates");

  return { success: "Death Certificated deleted successfully" };
}

export async function deleteDeathCertificate(id: string) {
  // check if user exists
  const user = await currentUser();
  if (!user) return { error: "Unauthorized!" };

  // check if user exists in database
  const dbUser = await getUserById(user.id as string);
  if (!dbUser) return { error: "Unauthorized!" };

  // check if user is an admin
  if (dbUser.role !== "ADMIN") return { error: "Unauthorized!" };

  await db.deathCertificate.delete({
    where: { id },
  });

  revalidatePath("/amdin/certificates");

  return { success: "Death Certificated deleted successfully" };
}

export async function deleteMarriageCertificate(id: string) {
  // check if user exists
  const user = await currentUser();
  if (!user) return { error: "Unauthorized!" };

  // check if user exists in database
  const dbUser = await getUserById(user.id as string);
  if (!dbUser) return { error: "Unauthorized!" };

  // check if user is an admin
  if (dbUser.role !== "ADMIN") return { error: "Unauthorized!" };

  await db.marriageCertificate.delete({
    where: { id },
  });

  revalidatePath("/amdin/certificates");

  return { success: "Death Certificated deleted successfully" };
}

export async function deleteResidentialCertificate(id: string) {
  // check if user exists
  const user = await currentUser();
  if (!user) return { error: "Unauthorized!" };

  // check if user exists in database
  const dbUser = await getUserById(user.id as string);
  if (!dbUser) return { error: "Unauthorized!" };

  // check if user is an admin
  if (dbUser.role !== "ADMIN") return { error: "Unauthorized!" };

  await db.residentialCertificate.delete({
    where: { id },
  });

  revalidatePath("/amdin/certificates");

  return { success: "Death Certificated deleted successfully" };
}
