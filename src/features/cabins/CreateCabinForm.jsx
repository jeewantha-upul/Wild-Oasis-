/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import StyledFormRow from "../../ui/FormRow";
import Spinner from "../../ui/Spinner";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function CreateCabinForm({ cabinToEdit = {} }) {
  const { id: editId, ...cabinToedit } = cabinToEdit;

  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? cabinToEdit : {},
  });

  const { errors } = formState;

  // creating a cabin
  const { isCreating, createCabin } = useCreateCabin();
  // deleting a cabin
  const { isEditing, editCabin } = useEditCabin();

  const isWorking = isEditing || isCreating;

  const onSubmit = (data) => {
    // if the form image is of type string, it already have a image uploaded previously,

    // if it is notifyManager, the image is uploaded just now
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession)
      editCabin(
        { newCabindata: { ...data, image }, id: editId },
        {
          onSuccess: () => reset(),
        }
      );
    else
      createCabin(
        { ...data, image: image },
        {
          onSuccess: () => reset(),
        }
      );
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <StyledFormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          disabled={isWorking}
          type="text"
          id="name"
          {...register("name", {
            required: "This field is required",
          })}
        />
      </StyledFormRow>

      <StyledFormRow
        label="Maximum capacity"
        error={errors?.maxCapacity?.message}
      >
        <Input
          disabled={isWorking}
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
          })}
        />
      </StyledFormRow>

      <StyledFormRow
        label="Regular price"
        error={errors?.regularPrice?.message}
      >
        <Input
          disabled={isWorking}
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
          })}
        />
      </StyledFormRow>

      <StyledFormRow label="Discount" error={errors?.discount?.message}>
        <Input
          disabled={isWorking}
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1.",
            },
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount should be less than regular price",
          })}
        />
      </StyledFormRow>

      <StyledFormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          disabled={isWorking}
          type="number"
          id="Description for website"
          defaultValue=""
          {...register("description", { required: "This field is required" })}
        />
      </StyledFormRow>

      <StyledFormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          type="file"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </StyledFormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" disabled={isCreating}>
          Cancel
        </Button>
        {isWorking && <Spinner />}
        <Button disabled={isWorking}>
          {isEditSession ? "Edit Cabin" : "Add cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
