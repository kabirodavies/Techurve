"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import { MY_ORDERS_QUERYResult } from "@/sanity.types";

interface OrderStatusUpdateProps {
  order: MY_ORDERS_QUERYResult[number];
  onStatusUpdate?: (newStatus: string) => void;
}

const orderStatuses = [
  { value: "pending", label: "Pending" },
  { value: "processing", label: "Processing" },
  { value: "paid", label: "Paid" },
  { value: "shipped", label: "Shipped" },
  { value: "out_for_delivery", label: "Out for Delivery" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
];

const OrderStatusUpdate: React.FC<OrderStatusUpdateProps> = ({
  order,
  onStatusUpdate,
}) => {
  const [status, setStatus] = useState<string>(order.status || "pending");
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusUpdate = async () => {
    if (status === order.status) {
      toast.error("Status is already set to this value");
      return;
    }

    setIsUpdating(true);
    try {
      const response = await fetch(`/api/orders/${order._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(`Order status updated to ${status}`);
        onStatusUpdate?.(status);
      } else {
        toast.error(result.error || "Failed to update order status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="w-48 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {orderStatuses.map((statusOption) => (
          <option key={statusOption.value} value={statusOption.value}>
            {statusOption.label}
          </option>
        ))}
      </select>
      <Button
        onClick={handleStatusUpdate}
        disabled={isUpdating || status === order.status}
        className="bg-blue-600 hover:bg-blue-700"
      >
        {isUpdating ? "Updating..." : "Update Status"}
      </Button>
    </div>
  );
};

export default OrderStatusUpdate; 