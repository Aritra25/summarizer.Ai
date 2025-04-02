import { pricingPlans } from "@/components/home/pricing-section";
import { getDBConnection } from "./db";
import { getUserUploadCount } from "./summaries";
import { User } from "@clerk/nextjs/server";

export async function getPriceIdForActiveUser(email: string) {
  const sql = await getDBConnection();
  const query = await sql`
        SELECT price_id
        FROM users
        WHERE email = ${email}
        AND status = 'active'
    `;
  return query?.[0]?.price_id || null;
}

export async function hasActivePlan(email: string) {
    const sql = await getDBConnection();
    const query = await sql`
    SELECT price_id,
    status 
    FROM users
    WHERE email = ${email}
    AND status = 'active'
    AND price_id IS NOT NULL
    `
    return query && query.length > 0;
}

export async function hasReachedUploadLimit(userId: string) {
  const uploadCount = await getUserUploadCount(userId);
  const priceId = await getPriceIdForActiveUser(userId);
  const isPro =
    pricingPlans.find((plan) => plan.priceId === priceId)?.id === "pro";
  const uploadLimit = isPro ? 1000 : 5;

  return {
    hasReachedLimit: uploadCount >= uploadLimit,
    uploadLimit,
  };
}

export async function getSubscriptionStatus(user: User) {
  const hasSubscription = await hasActivePlan(
    user.emailAddresses[0].emailAddress
  );

  return hasSubscription;
}
