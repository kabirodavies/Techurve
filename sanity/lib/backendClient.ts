import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

export const backendClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
  //  revalidation
  token: process.env.SANITY_API_TOKEN,
});

export async function createOrder(orderData: any) {
  // Ensure each product has a unique _key property
  const productsWithKeys = (orderData.products || []).map((product: any) => ({
    _key: product._key || Math.random().toString(36).slice(2, 10),
    ...product,
  }));
  return backendClient.create({
    _type: "order",
    orderNumber: orderData.orderNumber || Math.random().toString(36).slice(2, 12),
    clerkUserId: orderData.clerkUserId || "",
    customerName: orderData.customerName,
    email: orderData.email,
    products: productsWithKeys,
    totalPrice: orderData.totalPrice,
    currency: orderData.currency,
    amountDiscount: orderData.amountDiscount || 0,
    address: orderData.address,
    status: orderData.status || "pending",
    orderDate: orderData.orderDate || new Date().toISOString(),
  });
}
