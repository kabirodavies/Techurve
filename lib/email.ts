import { Resend } from 'resend';

// Only initialize Resend if API key is available
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export interface OrderStatusEmailData {
  customerName: string;
  customerEmail: string;
  orderNumber: string;
  orderDate: string;
  status: string;
  totalPrice: number;
  currency: string;
  products: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
}

const getStatusMessage = (status: string): { subject: string; message: string } => {
  switch (status) {
    case 'processing':
      return {
        subject: 'Your Order is Being Processed',
        message: 'Great news! Your order is now being processed and prepared for shipment.'
      };
    case 'paid':
      return {
        subject: 'Payment Confirmed - Order Processing',
        message: 'Your payment has been confirmed! Your order is now being processed.'
      };
    case 'shipped':
      return {
        subject: 'Your Order Has Been Shipped!',
        message: 'Exciting news! Your order has been shipped and is on its way to you.'
      };
    case 'out_for_delivery':
      return {
        subject: 'Your Order is Out for Delivery',
        message: 'Your order is out for delivery and should arrive soon!'
      };
    case 'delivered':
      return {
        subject: 'Your Order Has Been Delivered',
        message: 'Your order has been successfully delivered! Thank you for choosing us.'
      };
    case 'cancelled':
      return {
        subject: 'Order Cancellation Confirmation',
        message: 'Your order has been cancelled as requested.'
      };
    default:
      return {
        subject: 'Order Status Update',
        message: 'Your order status has been updated.'
      };
  }
};

export const sendOrderStatusEmail = async (orderData: OrderStatusEmailData) => {
  try {
    // Check if Resend is configured
    if (!resend) {
      console.warn('Resend API key not configured. Skipping email notification.');
      return null;
    }

    const { subject, message } = getStatusMessage(orderData.status);
    
    const emailContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Order Status Update</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #f8f9fa; padding: 20px; text-align: center; border-radius: 8px; }
            .content { padding: 20px; }
            .order-details { background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0; }
            .status-badge { 
              display: inline-block; 
              padding: 8px 16px; 
              background-color: #28a745; 
              color: white; 
              border-radius: 20px; 
              font-weight: bold; 
              text-transform: capitalize;
            }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
            .product-item { margin: 10px 0; padding: 10px; background-color: white; border-radius: 4px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Techurve Solutions</h1>
              <p>Order Status Update</p>
            </div>
            
            <div class="content">
              <h2>Hello ${orderData.customerName},</h2>
              
              <p>${message}</p>
              
              <div class="order-details">
                <h3>Order Details:</h3>
                <p><strong>Order Number:</strong> ${orderData.orderNumber}</p>
                <p><strong>Order Date:</strong> ${new Date(orderData.orderDate).toLocaleDateString()}</p>
                <p><strong>Status:</strong> <span class="status-badge">${orderData.status}</span></p>
                <p><strong>Total Amount:</strong> $${orderData.totalPrice} ${orderData.currency}</p>
              </div>
              
              <h3>Order Items:</h3>
              ${orderData.products.map(product => `
                <div class="product-item">
                  <strong>${product.name}</strong><br>
                  Quantity: ${product.quantity} | Price: $${product.price}
                </div>
              `).join('')}
              
              <p>If you have any questions about your order, please don't hesitate to contact us.</p>
              
              <p>Thank you for choosing Techurve Solutions!</p>
            </div>
            
            <div class="footer">
              <p>This email was sent to ${orderData.customerEmail}</p>
              <p>© 2024 Techurve Solutions. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const { data, error } = await resend.emails.send({
      from: 'Techurve Solutions <noreply@techurvesolutions.co.ke>',
      to: [orderData.customerEmail],
      subject: `${subject} - Order #${orderData.orderNumber}`,
      html: emailContent,
    });

    if (error) {
      console.error('Error sending email:', error);
      throw error;
    }

    console.log('Order status email sent successfully:', data);
    return data;
  } catch (error) {
    console.error('Failed to send order status email:', error);
    throw error;
  }
}; 