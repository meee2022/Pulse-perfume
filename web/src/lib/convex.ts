import { makeFunctionReference } from "convex/server";

// Untyped references so the app builds before `npx convex dev` generates types.
export const createOrderRef = makeFunctionReference<"mutation">("orders:createOrder");
export const listOrdersRef = makeFunctionReference<"query">("orders:listOrders");
export const updateOrderStatusRef = makeFunctionReference<"mutation">("orders:updateOrderStatus");

export const listProductsRef = makeFunctionReference<"query">("products:listProducts");
export const seedProductsRef = makeFunctionReference<"mutation">("products:seedProducts");
export const adminUpdateProductRef = makeFunctionReference<"mutation">("products:adminUpdateProduct");

export const generateUploadUrlRef = makeFunctionReference<"mutation">("files:generateUploadUrl");
export const getSettingsRef = makeFunctionReference<"query">("settings:getSettings");
export const updateSettingsRef = makeFunctionReference<"mutation">("settings:updateSettings");
