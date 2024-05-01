import React from "react";
import { Heading, View } from "@adobe/react-spectrum";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

export const HomeSessionTiming = () => {
  // Hooks //

  const dispatch = useDispatch();

  const { t } = useTranslation();

  // Callbacks //

  // Rendering //

  return (
    <View
      borderWidth="thin"
      borderColor="dark"
      borderRadius="medium"
      paddingBottom="size-250"
      paddingStart="size-250"
      paddingEnd="size-250"
      margin="size-250"
    >
      <Heading level={2}>Session Timing</Heading>
    </View>
  );
}
