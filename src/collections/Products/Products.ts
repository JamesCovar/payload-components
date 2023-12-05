import { CollectionConfig } from "payload/types";
import { ProductsVariants } from "./Fields/ProductFields";

const Products: CollectionConfig = {
  slug: "products",
  fields: [ProductsVariants],
};

export default Products;
