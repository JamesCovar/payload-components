import { Input } from "@nextui-org/react";
import { useField } from "payload/components/forms";
import React from "react";
import { v4 } from "uuid";

export default function AddDynamicInput(customProps) {
  const { props } = customProps;
  const [inputObj, setInputObj] = React.useState<
    {
      value: string;
      name: string;
    }[]
  >([{ value: "", name: v4() }]);

  //Payload field hook
  const { value, setValue } = useField<string[]>({ ...props });

  //Automatically add new input field when the last input field is filled
  const onChangeInput = (event: any) => {
    const regex = /,/;
    if (regex.test(event.target.value)) return;

    const { value, name } = event.target;
    let inputs = [...inputObj];

    const inputTargetIndex = inputs.findIndex((input) => input.name === name);
    inputs[inputTargetIndex].value = value;

    if (inputTargetIndex === -1) {
      inputs.push({ value, name });
    }

    const inputsLength = inputs.length - 1;
    if (inputs[inputsLength].value !== "")
      inputs.push({ value: "", name: v4() });

    if (event.target.value === "")
      inputs = inputObj.filter((input) => input.name !== event.target.name);

    setInputObj(inputs);
  };

  //Set the value to input field hook
  React.useEffect(() => {
    const inputs = inputObj.filter((input) => input.value !== "");
    const inputsValue = inputs.map((input) => input.value);
    if (inputs.length === 0) return;

    //All values are send as string
    const inputString = inputsValue.join();
    setValue(inputString);
  }, [inputObj]);

  //Set the value from payload field hook
  React.useEffect(() => {
    if (!value || value.length === 0) return;
    const arrayValues = value.map((element) => {
      return { name: v4(), value: element };
    });

    if (arrayValues.length > 0) arrayValues.push({ name: v4(), value: "" });

    setInputObj(arrayValues);
  }, []);

  return inputObj.map((element) => {
    return (
      <Input
        key={element.name}
        className="my-2"
        onChange={onChangeInput}
        value={element.value}
        name={element.name}
        label="Add variant value"
      ></Input>
    );
  });
}
