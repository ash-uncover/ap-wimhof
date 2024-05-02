import React, { useEffect, useState } from "react";
import { View } from "@adobe/react-spectrum";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { SessionSelectors } from "store/session/session.selectors";
import { SessionPreshow } from "./SessionPreshow";

import "./Session.css";

type SessionState =
  | "WAITING"
  | "PRESHOW"
  | "INSPIRE"
  | "EXPIRE"
  | "HOLD"
  | "BREAK"
  | "END";

type TimelineBase = {
  id: number;
  start: number;
  end: number;
  state: SessionState;
};
type TimelineWaiting = TimelineBase & {
  state: "WAITING";
};
type TimelinePreshow = TimelineBase & {
  state: "PRESHOW";
  round: number;
};
type TimelineInspire = TimelineBase & {
  state: "INSPIRE";
  round: number;
  breath: number;
};
type TimelineExpire = TimelineBase & {
  state: "EXPIRE";
  round: number;
  breath: number;
};
type TimelineHold = TimelineBase & {
  state: "HOLD";
  round: number;
};
type TimelineBreak = TimelineBase & {
  state: "BREAK";
  round: number;
};
type TimelineEnd = TimelineBase & {
  state: "END";
};
type Timeline =
  | TimelineWaiting
  | TimelinePreshow
  | TimelineInspire
  | TimelineExpire
  | TimelineHold
  | TimelineBreak
  | TimelineEnd;

export const Session = () => {
  // Hooks //

  const dispatch = useDispatch();

  const [timeline, setTimeline] = useState<Timeline[]>([
    {
      id: -1,
      start: 0,
      end: 8640000000000000,
      state: "WAITING",
    },
  ]);
  const [timelineEntry, setTimelineEntry] = useState<Timeline>(timeline[0]);

  const { t } = useTranslation();

  const rounds = useSelector(SessionSelectors.rounds);
  const date = useSelector(SessionSelectors.date);

  useEffect(() => {
    let id = 0;
    const newTimeline: Timeline[] = [];
    const startTime = new Date().getTime();
    let currentTime = startTime;
    newTimeline.push({
      id: id++,
      start: 0,
      end: currentTime,
      state: "WAITING",
    });
    rounds.forEach((round, roundIndex) => {
      newTimeline.push({
        id: id++,
        start: currentTime,
        end: currentTime + 3000,
        state: "PRESHOW",
        round: roundIndex + 1,
      });
      currentTime += 3000;
      for (let i = 0; i < round.cycles - 1; i++) {
        newTimeline.push({
          id: id++,
          start: currentTime,
          end: currentTime + round.inspire * 1000,
          state: "INSPIRE",
          round: roundIndex + 1,
          breath: i + 1,
        });
        currentTime += round.inspire * 1000;
        newTimeline.push({
          id: id++,
          start: currentTime,
          end: currentTime + round.expire * 1000,
          state: "EXPIRE",
          round: roundIndex + 1,
          breath: i + 1,
        });
        currentTime += round.expire * 1000;
      }
      newTimeline.push({
        id: id++,
        start: currentTime,
        end: currentTime + round.inspire * 1000,
        state: "INSPIRE",
        round: roundIndex + 1,
        breath: round.cycles,
      });
      currentTime += round.inspire * 1000;
      newTimeline.push({
        id: id++,
        start: currentTime,
        end: currentTime + round.hold * 1000,
        state: "HOLD",
        round: roundIndex + 1,
      });
      currentTime += round.hold * 1000;
      if (roundIndex < rounds.length - 1) {
        newTimeline.push({
          id: id++,
          start: currentTime,
          end: currentTime + round.break * 1000,
          state: "BREAK",
          round: roundIndex + 2,
        });
        currentTime += round.break * 1000;
      }
    });
    newTimeline.push({
      id: id++,
      start: currentTime,
      end: 8640000000000000,
      state: "END",
    });
    setTimeline(newTimeline);
  }, [date, rounds]);

  useEffect(() => {
    const timelineInterval = setInterval(() => {
      const now = new Date().getTime();
      const timelineCurrent = timeline.find(
        (t) => t.start <= now && t.end >= now
      );
      if (timelineEntry.id !== timelineCurrent.id) {
        console.log("change", timelineEntry.id, timelineCurrent.id);
        setTimelineEntry(timelineCurrent);
      }
    }, 10);
    return () => clearInterval(timelineInterval);
  }, [timeline, timelineEntry]);

  // Callbacks //

  // Rendering //

  function renderContent() {
    switch (timelineEntry.state) {
      case "PRESHOW":
        return renderPreshow(timelineEntry);
      default:
        return (
          <>
            <div>{`Start: ${timelineEntry.start}`}</div>
            <div>{`End: ${timelineEntry.end}`}</div>
            <div>{`State: ${timelineEntry.state}`}</div>
          </>
        );
    }
  }

  function renderPreshow(timelineEntry: TimelinePreshow) {
    return (
      <SessionPreshow end={timelineEntry.end} round={timelineEntry.round} />
    );
  }

  return (
    <View backgroundColor="celery-600" width="100%">
      <div className="session">{renderContent()}</div>
    </View>
  );
};
