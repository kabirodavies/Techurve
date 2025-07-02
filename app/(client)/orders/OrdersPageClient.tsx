"use client";
import { useState } from "react";
import OrdersComponent, { FilterByStatus } from "@/components/OrdersComponent";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileX } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function OrdersPageClient({ orders, isAdmin }: { orders: any[]; isAdmin: boolean }) {
  const [statusFilter, setStatusFilter] = useState("all");
  const filteredOrders = statusFilter === "all"
    ? orders
    : orders.filter((order) => order.status === statusFilter);

  return (
    <div>
      {orders?.length ? (
        <Card className="w-full">
          <CardHeader>
            <div className="flex items-center gap-4">
              <CardTitle>
                {isAdmin ? "All Orders" : "My Orders"}
              </CardTitle>
              {/* Filter UI is outside the table */}
              <FilterByStatus
                orders={orders}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
              />
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea>
              {/* Filter UI should NOT be inside the Table */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">No.</TableHead>
                    <TableHead className="w-[100px] md:w-auto">
                      Order Number
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Date
                    </TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead className="hidden md:table-cell">Country</TableHead>
                    <TableHead className="hidden md:table-cell">City</TableHead>
                    <TableHead className="hidden sm:table-cell">Email</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Invoice Number
                    </TableHead>
                    <TableHead className="text-center">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <OrdersComponent orders={filteredOrders} />
              </Table>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </CardContent>
        </Card>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <FileX className="h-24 w-24 text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900">
            No orders found
          </h2>
          <p className="mt-2 text-sm text-gray-600 text-center max-w-md">
            {isAdmin 
              ? "No orders found in the system yet."
              : "It looks like you haven't placed any orders yet. Start shopping to see your orders here!"
            }
          </p>
          <Button asChild className="mt-6">
            <Link href="/">Browse Products</Link>
          </Button>
        </div>
      )}
    </div>
  );
} 