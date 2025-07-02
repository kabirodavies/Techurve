import { NextRequest, NextResponse } from "next/server";
import { createOrder } from "@/sanity/lib/backendClient";
import { sendOrderStatusEmail, OrderStatusEmailData } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    // Call backend client to create order in Sanity
    const order = await createOrder(data);
    
    // Send email notification for new order
    try {
      const emailData: OrderStatusEmailData = {
        customerName: data.customerName || "Customer",
        customerEmail: data.email || "",
        orderNumber: data.orderNumber || "",
        orderDate: data.orderDate || new Date().toISOString(),
        status: data.status || "pending",
        totalPrice: data.totalPrice || 0,
        currency: data.currency || "USD",
        products: data.products?.map((item: unknown) => ({
          name: (item as any).product?.name || "Unknown Product",
          quantity: (item as any).quantity || 0,
          price: (item as any).product?.price || 0,
        })) || [],
      };

      await sendOrderStatusEmail(emailData);
      console.log(`Email notification sent for new order ${data.orderNumber}`);
    } catch (emailError) {
      console.error("Failed to send email notification for new order:", emailError);
      // Don't fail the entire request if email fails
    }
    
    return NextResponse.json({ success: true, order });
  } catch (error: unknown) {
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
} 