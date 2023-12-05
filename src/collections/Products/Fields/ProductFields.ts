import { Field } from "payload/types";
import DynamicInput from "../../../components/ui/DynamicInput";

const VariantValues: Field = {
  name: "variantValues",
  type: "json",
  hooks: {
    beforeChange: [
      async (args) => {
        const value = args.value;
        const valueArray = value.split(",");
        return valueArray;
      },
    ],
  },
  admin: {
    components: {
      Field: (props) =>
        DynamicInput({
          variant: "flat",
          radius: "sm",
          label: "Variant Value",
          size: "sm",
          props,
        }),
    },
  },
};

export const ProductsVariants: Field = {
  name: "productVariants", // required
  type: "array", // required
  label: "Product Variants",
  required: false,
  interfaceName: "productVariants", // optional
  labels: {
    singular: "Variant",
    plural: "Variants",
  },
  fields: [VariantValues],
  admin: {
    components: {
      RowLabel: ({ data, index }: any) => {
        return data?.title || `Variant ${String(index).padStart(2, "0")}`;
      },
    },
  },
};
