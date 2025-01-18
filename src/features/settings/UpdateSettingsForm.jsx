/* eslint-disable no-unused-vars */
import Form from "../../ui/Form";

import Input from "../../ui/Input";
import { useSettings } from "./useSettings";
import StyledFormRow from "../../ui/FormRow";
import Spinner from "../../ui/Spinner";
import { useUpdatingSettings } from "./useUpdatingSettings";

function UpdateSettingsForm() {
  const {
    isLoading,
    error,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakFastPrice,
    } = {},
  } = useSettings();

  const { isUpdating, updateSetting } = useUpdatingSettings();

  if (isLoading) return <Spinner />;

  const updateField = (e, inputField) => {
    if (!e.target.value) return;
    updateSetting({ [inputField]: e.target.value });
  };

  return (
    <Form>
      <StyledFormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          disabled={isUpdating}
          defaultValue={minBookingLength}
          onBlur={(e) => updateField(e, "minBookingLength")}
        />
      </StyledFormRow>
      <StyledFormRow label="Maximum nights/booking">
        <Input
          disabled={isUpdating}
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          onBlur={(e) => updateField(e, "maxBookingLength")}
        />
      </StyledFormRow>
      <StyledFormRow label="Maximum guests/booking">
        <Input
          disabled={isUpdating}
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          onBlur={(e) => updateField(e, "maxGuestsPerBooking")}
        />
      </StyledFormRow>
      <StyledFormRow label="Breakfast price">
        <Input
          disabled={isUpdating}
          type="number"
          id="breakfast-price"
          defaultValue={breakFastPrice}
          onBlur={(e) => updateField(e, "breakFastPrice")}
        />
      </StyledFormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
