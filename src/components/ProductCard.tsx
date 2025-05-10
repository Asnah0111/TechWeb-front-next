import React from "react";
import { Product } from "../types/product";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
      <img
        src={"/img/" + product.brand + ".png"}
        alt={product.name}
        className="object-cover rounded"
        style={{ width: "200px", height: "200px" }}
      />
      <div className="mt-2 text-center">
        <h3 className="font-semibold">{product.brand}</h3>
        <p className="text-gray-700 text-sm">{product.name}</p>
        <p className="text-gray-700 text-sm">{product.description}</p>
        <p className="text-black font-bold">${product.price}</p>
      </div>
    </div>
  );
}
