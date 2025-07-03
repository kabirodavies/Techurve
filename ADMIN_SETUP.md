# Admin Role Setup Guide

This guide will help you set up admin roles in Clerk so that admins can view all orders from every user.

## Prerequisites

- Clerk account with your app configured
- Access to Clerk Dashboard

## Step-by-Step Setup

### Step 1: Access Clerk Dashboard

1. Go to [clerk.com](https://clerk.com)
2. Sign in to your account
3. Select your Techurve application

### Step 2: Set Up User Roles

1. **Navigate to Users** in the left sidebar
2. **Find the user** you want to make an admin
3. **Click on the user** to open their profile
4. **Go to "Metadata" tab**
5. **Add custom metadata**:
   - Key: `role`
   - Value: `admin`
6. **Save the changes**

### Step 3: Alternative - Set Role via API

You can also set the role programmatically. Add this to your application:

```typescript
// Set admin role for a user
await clerkClient.users.updateUser(userId, {
  publicMetadata: {
    role: "admin"
  }
});
```

### Step 4: Test Admin Access

1. **Sign in** with the admin user account
2. **Go to the Orders page** (`/orders`)
3. **Verify** that you can see all orders from all users
4. **Check the title** - it should say "All Orders" instead of "My Orders"

## Admin Features

Once set up as admin, you can:

- ✅ **View all orders** from every user
- ✅ **Update order status** for any order
- ✅ **Send email notifications** to any customer
- ✅ **See customer details** for all orders
- ✅ **Manage the entire order system**

## Security Notes

- **Admin roles are powerful** - only give to trusted users
- **Monitor admin actions** - consider adding audit logs
- **Use environment variables** for sensitive admin operations
- **Regularly review** who has admin access

## Troubleshooting

### Can't see all orders?
- Check that the user has `role: "admin"` in their public metadata
- Verify you're signed in with the correct account
- Check the browser console for any errors

### Role not updating?
- Clear browser cache and cookies
- Sign out and sign back in
- Check Clerk dashboard for metadata changes

### Still seeing "My Orders"?
- Ensure the role is set to exactly `"admin"` (case sensitive)
- Check that the metadata is saved in Clerk dashboard
- Restart your development server

## Multiple Admin Levels

You can create different admin levels by using different role values:

```typescript
// Super admin
role: "super_admin"

// Regular admin
role: "admin"

// Order manager
role: "order_manager"
```

Then update the check in your code:

```typescript
const isAdmin = user?.publicMetadata?.role === "admin" || 
                user?.publicMetadata?.role === "super_admin" ||
                user?.publicMetadata?.role === "order_manager";
``` 