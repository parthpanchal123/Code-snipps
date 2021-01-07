import React from "react";
import { Container } from "react-bootstrap";
import "../index.css";
import Timeline, { TimelineStep } from "@kiwicom/orbit-components/lib/Timeline";
import RubberBand from "react-reveal/RubberBand";

const StepperComponent = () => {
  return (
    <RubberBand>
      <Container
        className="mt-3 mb-3 sm-12 text-center"
        style={{ width: "92%" }}
      >
        <Timeline>
          <TimelineStep label="#1 Visit" type="info">
            <a
              href="https://carbon.now.sh/"
              target="_blank"
              rel="noreferrer"
              className="i text-primary ml-2"
              style={{
                textDecoration: "none",
                color: "#252A31",
                fontSize: "14px",
                fontWeight: "400",
              }}
            >
              <u> Carbon.sh</u> 🔥
            </a>
          </TimelineStep>
          <TimelineStep
            label="#2 Copy & Paste"
            type="info"
            style={{ color: "white" }}
          >
            <span>Your code, theme and download it ⚡</span>
          </TimelineStep>
          <TimelineStep label="#3 Done" type="info">
            <span>Share it 🙌</span>
          </TimelineStep>
        </Timeline>
      </Container>
    </RubberBand>
  );
};

export default StepperComponent;
