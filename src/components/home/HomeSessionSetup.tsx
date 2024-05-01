import React from "react";
import { ComboBox, Heading, Item, NumberField, View } from "@adobe/react-spectrum";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { SessionSelectors } from "store/session/session.selectors";
import { SessionSlice } from "store/session/session.slice";
import { SessionPreset } from "store/session/session.state";
import { HomeSessionRound } from "./HomeSessionRound";

export const HomeSessionSetup = () => {
  // Hooks //

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const preset = useSelector(SessionSelectors.preset);
  const rounds = useSelector(SessionSelectors.rounds);

  // Callbacks //

  function onPresetChange(value: SessionPreset) {
    dispatch(SessionSlice.actions.setPreset(value));
  }

  function onRoundsChange(rounds: number) {
    dispatch(SessionSlice.actions.setRoundNumber(rounds));
  }

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
      <Heading level={2}>Session Preparation</Heading>

      <ComboBox
        label="Session preset"
        inputValue={preset}
        selectedKey={preset}
        onSelectionChange={onPresetChange}
      >
        <Item key="SHORT">Short</Item>
        <Item key="MEDIUM">Medium</Item>
        <Item key="LONG">Long</Item>
        <Item key="CUSTOM">Custom</Item>
      </ComboBox>

      <NumberField
        label="#Rounds"
        minValue={1}
        maxValue={10}
        value={rounds.length}
        onChange={onRoundsChange}
      />

      {rounds.map((round, index) => (
        <HomeSessionRound key={index} roundIndex={index} />
      ))}
    </View>
  );
};