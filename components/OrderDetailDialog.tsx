import { MY_ORDERS_QUERYResult } from "@/sanity.types";
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import Link from "next/link";
import OrderStatusUpdate from "./OrderStatusUpdate";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import PriceFormatter from "./PriceFormatter";
import jsPDF from "jspdf";
import toast from "react-hot-toast";

interface OrderDetailsDialogProps {
  order: MY_ORDERS_QUERYResult[number] | null;
  isOpen: boolean;
  onClose: () => void;
}

const OrderDetailDialog: React.FC<OrderDetailsDialogProps> = ({
  order,
  isOpen,
  onClose,
}) => {
  const [currentOrder, setCurrentOrder] = useState(order);
  const [isGeneratingInvoice, setIsGeneratingInvoice] = useState(false);
  const canGenerateInvoice =
    currentOrder && currentOrder.status === "processing" &&
    !currentOrder.invoice?.number;
  
  useEffect(() => {
    setCurrentOrder(order);
  }, [order]);
  
  if (!currentOrder) return null;

  const generateInvoicePDF = (orderData: MY_ORDERS_QUERYResult[number]) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Invoice", 10, 10);
    doc.setFontSize(12);
    doc.text(`Order Number: ${orderData.orderNumber}`, 10, 20);
    doc.text(`Customer: ${orderData.customerName}`, 10, 30);
    doc.text(`Email: ${orderData.email}`, 10, 40);
    doc.text(`Date: ${orderData.orderDate && new Date(orderData.orderDate).toLocaleDateString()}`, 10, 50);
    doc.text(`Status: ${orderData.status}`, 10, 60);
    let y = 70;
    doc.text("Products:", 10, y);
    y += 10;
    orderData.products?.forEach((product: unknown, idx: number) => {
      const p = product as {
        product: {
          name?: string;
          price?: number;
        } | null;
        quantity?: number;
      };
      doc.text(
        `${idx + 1}. ${p.product?.name || "Unknown"} x ${p.quantity} - ${orderData.status !== "pending" ? (p.product?.price || 0) : "-"}`,
        10,
        y
      );
      y += 10;
    });
    if (orderData.status !== "pending") {
      y += 10;
      doc.text(`Total: ${orderData.totalPrice}`, 10, y);
    }
    doc.save(`Invoice-${orderData.orderNumber}.pdf`);
  };

  const handleGenerateInvoice = async () => {
    if (!currentOrder) return;
    setIsGeneratingInvoice(true);
    try {
      const response = await fetch(`/api/orders/${currentOrder._id}`, {
        method: "POST",
      });
      const result = await response.json();
      if (result.success && result.invoiceNumber) {
        setCurrentOrder({ ...currentOrder, invoice: { ...currentOrder.invoice, number: result.invoiceNumber } });
        toast.success("Invoice number generated successfully");
      } else {
        toast.error(result.error || "Failed to generate invoice number");
      }
    } catch {
      toast.error("Failed to generate invoice number");
    } finally {
      setIsGeneratingInvoice(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="!max-w-4xl max-h-[90vh] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Order Number - {currentOrder?.orderNumber}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <p>
            <strong>Customer:</strong> {currentOrder.customerName}
          </p>
          <p>
            <strong>Email:</strong> {currentOrder.email}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {currentOrder.orderDate && new Date(currentOrder.orderDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span className="capitalize text-green-600 font-medium">
              {currentOrder.status}
            </span>
          </p>
          <div className="mt-4">
            <strong>Update Status:</strong>
            <div className="mt-2">
              <OrderStatusUpdate 
                order={currentOrder} 
                onStatusUpdate={(newStatus: string) => {
                  setCurrentOrder({ ...currentOrder, status: newStatus as typeof currentOrder.status });
                }}
              />
            </div>
          </div>
          <p>
            <strong>Invoice Number:</strong> {currentOrder?.invoice?.number || "-"}
          </p>
          {canGenerateInvoice && (
            <Button
              className="mt-2 mb-2 bg-green-600 hover:bg-green-700 text-white"
              onClick={handleGenerateInvoice}
              disabled={isGeneratingInvoice}
            >
              {isGeneratingInvoice ? "Generating..." : "Generate Invoice Number"}
            </Button>
          )}
          {currentOrder?.invoice && (
            <Button className="bg-transparent border text-darkColor/80 mt-2 hover:text-darkColor hover:border-darkColor hover:bg-darkColor/10 hoverEffect ">
              {currentOrder?.invoice?.hosted_invoice_url && (
                <Link href={currentOrder?.invoice?.hosted_invoice_url} target="_blank">
                  Download Invoice
                </Link>
              )}
            </Button>
          )}
          {currentOrder?.status !== "pending" && (
            <Button className="mt-5" onClick={() => generateInvoicePDF(currentOrder)}>
              Download Invoice (PDF)
            </Button>
          )}
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentOrder.products?.map((product, index) => (
              <TableRow key={index}>
                <TableCell className="flex items-center gap-2">
                  {product?.product?.images && (
                    <Image
                      src={urlFor(product?.product?.images[0]).url()}
                      alt="productImage"
                      width={50}
                      height={50}
                      className="border rounded-sm"
                    />
                  )}

                  {product?.product && product?.product?.name}
                </TableCell>
                <TableCell>{product?.quantity}</TableCell>
                <TableCell>
                  {currentOrder?.status !== "pending" ? (
                    <PriceFormatter
                      amount={product?.product?.price}
                      className="text-black font-medium"
                    />
                  ) : (
                    <span>-</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 text-right flex items-center justify-end">
          <div className="w-44 flex flex-col gap-1">
            {currentOrder?.status !== "pending" && currentOrder?.amountDiscount !== 0 && (
              <div className="w-full flex items-center justify-between">
                <strong>Subtotal: </strong>
                <PriceFormatter
                  amount={(currentOrder?.totalPrice as number) + (currentOrder?.amountDiscount as number)}
                  className="text-black font-bold"
                />
              </div>
            )}
            {currentOrder?.status !== "pending" && currentOrder?.amountDiscount !== 0 && (
              <div className="w-full flex items-center justify-between">
                <strong>Discount: </strong>
                <PriceFormatter
                  amount={-(currentOrder?.amountDiscount as number)}
                  className="text-black font-bold"
                />
              </div>
            )}
            <div className="w-full flex items-center justify-between">
              <strong>Total: </strong>
              {currentOrder?.status !== "pending" ? (
                <PriceFormatter
                  amount={currentOrder?.totalPrice}
                  className="text-black font-bold"
                />
              ) : (
                <span>-</span>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailDialog;
