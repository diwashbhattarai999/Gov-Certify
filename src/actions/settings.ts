"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { SettingsSchema } from "@/schemas";

import { getUserByEmail, getUserById } from "@/data/user";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { revalidatePath } from "next/cache";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized!" };
  }

  const dbUser = await getUserById(user.id as string);

  if (!dbUser) {
    return { error: "Unauthorized!" };
  }

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);

    if (existingUser && existingUser.id !== user.id) {
      return { error: "Email already in use!" };
    }

    const verificationToken = await generateVerificationToken(values.email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: "Verification email sent!" };
  }

  if (
    values.password &&
    values.password.length > 0 &&
    values.newPassword &&
    values.password.length > 0 &&
    dbUser.password
  ) {
    const passwordsMatch = await bcrypt.compare(
      values.password,
      dbUser.password
    );

    if (!passwordsMatch) {
      return { error: "Incorrect password!" };
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);

    values.password = hashedPassword;
    values.newPassword = undefined;
  } else {
    values.password = undefined;
  }

  if (values.phone && (values.phone.length < 10 || values.phone.length > 10)) {
    return { error: "Phone Number should be of 10 digits!" };
  }

  await db.user.update({
    where: { id: dbUser.id },
    data: {
      image: values.image,
      role: values.role,
      name: values.name,
      isTwoFactorEnabled: values.isTwoFactorEnabled,
      email: values.email,
      phoneNo: values.phone,
      password: values.password,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/users");

  return { success: "Settings Updated!" };
};
