import { db } from "@/lib/db";

export const getRequesterByEmail = async (requesterEmail: string) => {
  try {
    const requester = await db.requester.findUnique({
      where: { requesterEmail },
    });

    return requester;
  } catch (error) {
    return null;
  }
};
