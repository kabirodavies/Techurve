# Email Notification Setup

This project now includes email notifications for order status changes. Here's how to set it up:

## Prerequisites

1. **Resend Account**: Sign up at [resend.com](https://resend.com)
2. **Domain Verification**: Verify your domain with Resend (or use their test domain)

## Environment Variables

Add the following environment variable to your `.env.local` file:

```env
RESEND_API_KEY=your_resend_api_key_here
```

## How to Get Your Resend API Key

1. Go to [resend.com](https://resend.com) and create an account
2. Navigate to the API Keys section
3. Create a new API key
4. Copy the API key and add it to your `.env.local` file

## Email Functionality

The system now sends email notifications in the following scenarios:

1. **New Order Creation**: When a customer creates an order from the cart
2. **Status Updates**: When an admin updates the order status

## Email Templates

The emails include:
- Customer name and email
- Order number and date
- Current status
- Product details
- Total amount
- Professional styling

## Status Types

The system supports the following order statuses:
- `pending` - Initial order status
- `processing` - Order is being processed
- `paid` - Payment confirmed
- `shipped` - Order has been shipped
- `out_for_delivery` - Order is out for delivery
- `delivered` - Order has been delivered
- `cancelled` - Order has been cancelled

## Admin Interface

Admins can update order status from the order detail dialog, which will automatically trigger email notifications to customers.

## Testing

To test the email functionality:
1. Create a new order from the cart
2. Check the order detail dialog
3. Update the order status
4. Verify that the customer receives an email notification

## Troubleshooting

If emails are not being sent:
1. Check that `RESEND_API_KEY` is set correctly
2. Verify your domain is verified with Resend
3. Check the console logs for any error messages
4. Ensure the customer email address is valid 