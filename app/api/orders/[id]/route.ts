import { NextRequest, NextResponse } from "next/server";
import { backendClient } from "@/sanity/lib/backendClient";
import { sendOrderStatusEmail, OrderStatusEmailData } from "@/lib/email";

export async function PATCH(
  req: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;
    const { status } = await req.json();

    // Get the current order to check if status is actually changing
    const currentOrder = await backendClient.getDocument(id);
    if (!currentOrder) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }

    // Update the order status
    const updatedOrder = await backendClient
      .patch(id)
      .set({ status })
      .commit();

    // If status changed, send email notification
    if (currentOrder.status !== status) {
      try {
        // Fetch order with product details for email
        const orderWithProducts = await backendClient.fetch(`
          *[_type == "order" && _id == $id]{
            ...,
            products[]{
              ...,
              product->{
                name,
                price
              }
            }
          }[0]
        `, { id });

        if (orderWithProducts) {
          const emailData: OrderStatusEmailData = {
            customerName: orderWithProducts.customerName || "Customer",
            customerEmail: orderWithProducts.email || "",
            orderNumber: orderWithProducts.orderNumber || "",
            orderDate: orderWithProducts.orderDate || "",
            status: status,
            totalPrice: orderWithProducts.totalPrice || 0,
            currency: orderWithProducts.currency || "USD",
            products: orderWithProducts.products?.map((item: { product?: { name?: string; price?: number }; quantity?: number }) => ({
              name: item.product?.name || "Unknown Product",
              quantity: item.quantity || 0,
              price: item.product?.price || 0,
            })) || [],
          };

          // Send email notification
          await sendOrderStatusEmail(emailData);
          console.log(`Email notification sent for order ${orderWithProducts.orderNumber} status change to ${status}`);
        }
      } catch (emailError) {
        console.error("Failed to send email notification:", emailError);
        // Don't fail the entire request if email fails
      }
    }

    return NextResponse.json({ success: true, order: updatedOrder });
  } catch (error: unknown) {
    console.error("Error updating order status:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function GET(
  req: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;
    const order = await backendClient.getDocument(id);
    
    if (!order) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, order });
  } catch (error: unknown) {
    console.error("Error fetching order:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function POST(
  req: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;
    // Fetch the order
    const order = await backendClient.getDocument(id);
    if (!order) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }
    if (order.status !== "processing") {
      return NextResponse.json(
        { success: false, error: "Order is not processing" },
        { status: 400 }
      );
    }
    if (order.invoice && order.invoice.number) {
      return NextResponse.json(
        { success: false, error: "Invoice number already generated" },
        { status: 400 }
      );
    }
    // Generate a unique invoice number (timestamp-based)
    const invoiceNumber = `INV-${Date.now()}`;
    // Update the order in Sanity
    const updatedOrder = await backendClient
      .patch(id)
      .set({ invoice: { ...order.invoice, number: invoiceNumber } })
      .commit();
    return NextResponse.json({ success: true, invoiceNumber, order: updatedOrder });
  } catch (error: unknown) {
    console.error("Error generating invoice number:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
} 