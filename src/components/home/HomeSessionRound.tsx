import React from "react";
import { Heading, LabeledValue, NumberField, View } from "@adobe/react-spectrum";
import { useDispatch, useSelector } from "react-redux";
import { SessionSelectors } from "store/session/session.selectors";
import { SessionSlice } from "store/session/session.slice";

export interface HomeSessionRoundProps {
  roundIndex: number;
}
export const HomeSessionRound = (props: HomeSessionRoundProps) => {
  // Hooks //

  const dispatch = useDispatch();

  const round = useSelector(SessionSelectors.round(props.roundIndex));

  // Callbacks //

  function onRoundCycleChange(cycles: number) {
    dispatch(
      SessionSlice.actions.updateRound({
        index: props.roundIndex,
        round: {
          ...round,
          cycles,
        },
      })
    );
  }

  function onRoundInspireChange(inspire: number) {
    dispatch(
      SessionSlice.actions.updateRound({
        index: props.roundIndex,
        round: {
          ...round,
          inspire,
        },
      })
    );
  }

  function onRoundExpireChange(expire: number) {
    dispatch(
      SessionSlice.actions.updateRound({
        index: props.roundIndex,
        round: {
          ...round,
          expire,
        },
      })
    );
  }

  function onRoundHoldChange(hold: number) {
    dispatch(
      SessionSlice.actions.updateRound({
        index: props.roundIndex,
        round: {
          ...round,
          hold,
        },
      })
    );
  }

  function onRoundBreakChange(breaks: number) {
    dispatch(
      SessionSlice.actions.updateRound({
        index: props.roundIndex,
        round: {
          ...round,
          break: breaks,
        },
      })
    );
  }

  // Rendering //

  const duration = round.cycles * (round.inspire + round.expire) + round.hold;
  return (
    <View
      borderWidth="thin"
      borderColor="dark"
      borderRadius="medium"
      paddingBottom="size-250"
      paddingStart="size-250"
      paddingEnd="size-250"
      marginTop="size-250"
    >
      <Heading level={4}>{`Round #${props.roundIndex}`}</Heading>

      <NumberField
        label="#Cycles"
        value={round.cycles}
        minValue={0}
        maxValue={60}
        onChange={onRoundCycleChange}
      />
      <NumberField
        label="Inspire duration"
        value={round.inspire}
        minValue={0}
        maxValue={10}
        onChange={onRoundInspireChange}
      />
      <NumberField
        label="Expire duration"
        value={round.expire}
        minValue={0}
        maxValue={10}
        onChange={onRoundExpireChange}
      />
      <NumberField
        label="Hold time"
        value={round.hold}
        minValue={30}
        maxValue={240}
        onChange={onRoundHoldChange}
      />
      <NumberField
        label="Break duration"
        value={round.break}
        minValue={5}
        maxValue={30}
        onChange={onRoundBreakChange}
      />
      <LabeledValue
        label="Duration"
        value={`${duration}s (+${round.break}s break)`}
      />
    </View>
  );
};