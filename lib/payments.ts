import Stripe from "stripe";
import { getDBConnection } from "./db";

export async function handleCheckoutSessionCompleted({
  session,
  stripe,
}: {
  session: Stripe.Checkout.Session;
  stripe: Stripe;
}) {
  console.log("Checkout session completed", session);
  const customerId = session.customer as string;
  const customer = await stripe.customers.retrieve(customerId);
  const priceId = session.line_items?.data[0].price?.id as string;

  if ("email" in customer && priceId) {
    const { email, name } = customer;

    const sql = await getDBConnection();

    await createOrUpdateUser({
      sql,
      email: email as string,
      full_name: name as string,
      customer_id: customerId,
      price_id: priceId as string,
      status: "active",
    });
    await createPayment({
      sql,
      session,
      priceId: priceId as string,
      userEmail: email as string,
    });
  }
}
export async function createOrUpdateUser({
  sql,
  email,
  full_name,
  customer_id,
  price_id,
  status,
}: {
  sql: any;
  email: string;
  full_name: string;
  customer_id: string;
  price_id: string;
  status: string;
}) {
  try {
    // const sql = await getDBConnection();
    // const email = ''
    console.log("hi from createOrUpdateUser")
    const user = await sql`SELECT * FROM users WHERE email = ${email}`;
    console.log(user, "user");
    if (user?.length === 0) {
      await sql`INSERT INTO users (email, full_name, customer_id, price_id, status) VALUES (${email}, ${full_name}, ${customer_id}, ${price_id}, ${status})`;
    }
  } catch (error) {
    console.error("Error creating or updating user", error);
  }
}

// async function createPayment({
//   sql,
//   session,
//   priceId,
//   userEmail,
// }: {
//   sql: any;
//   session: Stripe.Checkout.Session;
//   priceId: string;
//   userEmail: string;
// }) {
//   try {
//     // const sql = await getDBConnection();
//     const { amount_total, status, id } = session;
//     await sql`INSERT INTO payments (amount, status, stripe_payment_id, price_id, user_email) VALUES (${amount_total}, ${status}, ${id}, ${priceId}, ${userEmail})`;
//   } catch (error) {
//     console.error("Error creating payment", error);
//   }
// }

async function createPayment({
    sql,
    session,
    priceId,
    userEmail,
  }: {
    sql: any;
    session: Stripe.Checkout.Session;
    priceId: string;
    userEmail: string;
  }) {
    console.log("hi from createPayment")
    try {
      const { amount_total, status, id } = session;
      await sql`INSERT INTO payments (amount, status, stripe_payment_id, price_id, user_email) VALUES (${amount_total}, ${status}, ${id}, ${priceId}, ${userEmail})`;
    } catch (error) {
      console.error("Error creating payment", error);
    }
  }