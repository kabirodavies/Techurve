"use client";

import Container from "@/components/Container";
import EmptyCart from "@/components/EmptyCart";
// import FloatingPopup from "@/components/FloatngPopup";
import NoAccess from "@/components/NoAccess";
// import PriceFormatter from "@/components/PriceFormatter";
import ProductSideMenu from "@/components/ProductSideMenu";
import QuantityButtons from "@/components/QuantityButtons";
import Title from "@/components/Title";
import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { urlFor } from "@/sanity/lib/image";
import useStore from "@/store";
import { useAuth, useUser } from "@clerk/nextjs";
import { ShoppingBag, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const countryCities = {
  Kenya: ["Nairobi", "Mombasa", "Kisumu"],
  Uganda: ["Kampala", "Entebbe", "Gulu"],
  Tanzania: ["Dar es Salaam", "Dodoma", "Arusha"],
};

const CartPage = () => {
  const {
    deleteCartProduct,
    getTotalPrice,
    getItemCount,
    getSubTotalPrice,
    resetCart,
  } = useStore();
  // const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(false);
  const groupedItems = useStore((state) => state.getGroupedItems());
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const router = useRouter();

  const selectedCountry = watch("country") as keyof typeof countryCities | undefined;

  const handleResetCart = () => {
    const confirmed = window.confirm(
      "Are you sure you want to reset your cart?"
    );
    if (confirmed) {
      resetCart();
      toast.success("Cart reset successfully!");
    }
  };

  const handleGetQuote = async (formData: Record<string, unknown>) => {
    setLoading(true);
    try {
      // Generate a date-based order number: ORD-YYYYMMDD-XXXX
      const datePart = new Date().toISOString().slice(0,10).replace(/-/g, ''); // e.g. 20240501
      const randomPart = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
      const orderNumber = `ORD-${datePart}-${randomPart}`;
      const orderData = {
        orderNumber,
        customerName: user?.fullName ?? "Unknown",
        email: user?.emailAddresses?.[0]?.emailAddress ?? "Unknown",
        clerkUserId: user?.id ?? "",
        address: formData, // Use form data for address
        products: groupedItems.map(({ product }) => ({
          product: { _type: "reference", _ref: product._id },
          quantity: getItemCount(product._id),
        })),
        totalPrice: getTotalPrice(),
        currency: "USD",
        amountDiscount: getSubTotalPrice() - getTotalPrice(),
        status: "pending",
        orderDate: new Date().toISOString(),
      };
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
      const result = await res.json();
      if (result.success) {
        toast.success("Quote request sent! We'll contact you soon.");
        resetCart();
        router.push(`/success?orderNumber=${orderData.orderNumber}`);
      } else {
        toast.error("Failed to send quote request.");
      }
    } catch (_) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-gray-50 pb-52 md:pb-10">
      {isSignedIn ? (
        <Container>
          {groupedItems?.length ? (
            <>
              <div className="flex items-center gap-2 py-5">
                {/* <FloatingPopup /> */}
                <ShoppingBag className="text-darkColor" />
                <Title>Shopping Cart</Title>
              </div>
              <div className="grid lg:grid-cols-3 md:gap-8">
                <div className="lg:col-span-2 rounded-lg">
                  <div className="border bg-white rounded-md">
                    {groupedItems?.map(({ product }) => {
                      return (
                        <div
                          key={product?._id}
                          className="border-b p-2.5 last:border-b-0 flex items-center justify-between gap-5"
                        >
                          <div className="flex flex-1 items-start gap-2 h-36 md:h-44">
                            {product?.images && (
                              <Link
                                href={`/product/${product?.slug?.current}`}
                                className="border p-0.5 md:p-1 mr-2 rounded-md
                                 overflow-hidden group"
                              >
                                <Image
                                  src={urlFor(product?.images[0]).url()}
                                  alt="productImage"
                                  width={500}
                                  height={500}
                                  loading="lazy"
                                  className="w-32 md:w-40 h-32 md:h-40 object-cover group-hover:scale-105 hoverEffect"
                                />
                              </Link>
                            )}
                            <div className="h-full flex flex-1 flex-col justify-between py-1">
                              <div className="flex flex-col gap-0.5 md:gap-1.5">
                                <h2 className="text-base font-semibold line-clamp-1">
                                  {product?.name}
                                </h2>
                                <p className="text-sm capitalize">
                                  Variant:{" "}
                                  <span className="font-semibold">
                                    {product?.variant}
                                  </span>
                                </p>
                                <p className="text-sm capitalize">
                                  Status:{" "}
                                  <span className="font-semibold">
                                    {product?.status}
                                  </span>
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <ProductSideMenu
                                        product={product}
                                        className="relative top-0 right-0"
                                      />
                                    </TooltipTrigger>
                                    <TooltipContent className="font-bold">
                                      Add to Favorite
                                    </TooltipContent>
                                  </Tooltip>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <Trash
                                        onClick={() => {
                                          deleteCartProduct(product?._id);
                                          toast.success(
                                            "Product deleted successfully!"
                                          );
                                        }}
                                        className="w-4 h-4 md:w-5 md:h-5 mr-1 text-gray-500 hover:text-red-600 hoverEffect"
                                      />
                                    </TooltipTrigger>
                                    <TooltipContent className="font-bold bg-red-600">
                                      Delete product
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-start justify-between h-36 md:h-44 p-0.5 md:p-1">
                            <QuantityButtons product={product} />
                          </div>
                        </div>
                      );
                    })}
                    <Button
                      onClick={handleResetCart}
                      className="m-5 font-semibold"
                      variant="destructive"
                    >
                      Reset Cart
                    </Button>
                  </div>
                </div>
                <div>
                  <div className="lg:col-span-1">
                    <div className="hidden md:inline-block w-full bg-white p-6 rounded-lg border">
                      <h2 className="text-xl font-semibold mb-4">
                        Get a Quote
                      </h2>
                      <form onSubmit={handleSubmit(handleGetQuote)} className="space-y-4">
                        <div>
                          <label className="block font-medium">Country</label>
                          <select {...register("country", { required: true })} className="w-full border rounded p-2">
                            <option value="">Select Country</option>
                            <option value="Kenya">Kenya</option>
                            <option value="Uganda">Uganda</option>
                            <option value="Tanzania">Tanzania</option>
                          </select>
                          {errors.country && <span className="text-red-500 text-xs">Country is required</span>}
                        </div>
                        <div>
                          <label className="block font-medium">Name</label>
                          <input {...register("name", { required: true })} className="w-full border rounded p-2" />
                          {errors.name && <span className="text-red-500 text-xs">Name is required</span>}
                        </div>
                        <div>
                          <label className="block font-medium">Phone Number</label>
                          <input
                            {...register("phone", {
                              required: "Phone number is required",
                              pattern: {
                                value: /^\d{10}$/,
                                message: "Phone number must be exactly 10 digits",
                              },
                            })}
                            className="w-full border rounded p-2"
                          />
                          {errors.phone &&
                            typeof errors.phone.message === "string" && (
                              <span className="text-red-500 text-xs">{errors.phone.message}</span>
                            )}
                        </div>
                        <div>
                          <label className="block font-medium">City</label>
                          <input
                            {...register("city", {
                              required: "City is required",
                              validate: (value) =>
                                selectedCountry && countryCities[selectedCountry]
                                  ? countryCities[selectedCountry].includes(value)
                                    ? true
                                    : `City must be a valid city in ${selectedCountry}`
                                  : true,
                            })}
                            className="w-full border rounded p-2"
                          />
                          {errors.city &&
                            typeof errors.city.message === "string" && (
                              <span className="text-red-500 text-xs">{errors.city.message}</span>
                            )}
                        </div>
                        <div>
                          <label className="block font-medium">Physical Address</label>
                          <input {...register("address", { required: true })} className="w-full border rounded p-2" />
                          {errors.address && <span className="text-red-500 text-xs">Address is required</span>}
                        </div>
                        <Separator />
                        <Button
                          className="w-full rounded-full font-semibold tracking-wide hoverEffect"
                          size="lg"
                          disabled={loading}
                          type="submit"
                        >
                          {loading ? "Please wait..." : "Get a Quote"}
                        </Button>
                      </form>
                    </div>
                  </div>
                </div>
                {/* Order summary for mobile view */}
                <div className="md:hidden fixed bottom-0 left-0 w-full bg-white pt-2">
                  <div className="bg-white p-4 rounded-lg border mx-4">
                    <h2>Order Summary</h2>
                    <div className="space-y-4">
                      {/* <div className="flex items-center justify-between">
                        <span>Discount</span>
                        <PriceFormatter
                          amount={getSubTotalPrice() - getTotalPrice()}
                        />
                      </div> */}
                      <Separator />
                      {/* <div className="flex items-center justify-between font-semibold text-lg">
                        <span>Total</span>
                        <PriceFormatter
                          amount={getTotalPrice()}
                          className="text-lg font-bold text-black"
                        />
                      </div> */}
                      <form onSubmit={handleSubmit(handleGetQuote)}>
                        <Button
                          className="w-full rounded-full font-semibold tracking-wide hoverEffect"
                          size="lg"
                          disabled={loading}
                          type="submit"
                        >
                          {loading ? "Please wait..." : "Get a Quote"}
                        </Button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <EmptyCart />
          )}
        </Container>
      ) : (
        <NoAccess />
      )}
    </div>
  );
};

export default CartPage;