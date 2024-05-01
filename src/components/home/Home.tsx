import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Heading, View } from "@adobe/react-spectrum";
import { HomeSessionSetup } from "./HomeSessionSetup";
import { HomeSessionTiming } from "./HomeSessionTiming";

import "./Home.css";

export const Home = () => {
  // Hooks //

  const navigate = useNavigate();

  // Callbacks //

  function onStartSessionPress() {
    navigate(`/session`);
  }

  // Rendering //

  return (
    <div style={{ overflow: "auto" }}>
      <View padding="size-500">
        <Heading level={1}>AP Wimhof</Heading>

        <HomeSessionSetup />
        <HomeSessionTiming />

        <Button variant="accent" onPress={onStartSessionPress}>
          Start Session
        </Button>
      </View>
    </div>
  );
};
