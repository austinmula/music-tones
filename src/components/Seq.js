import React, { useState, useEffect, useContext } from "react";
import * as Tone from "tone";
import "./Seq.css";

import D1 from "../assets/drums/drums1.mp3";
import D2 from "../assets/drums/drums1.mp3";
import D3 from "../assets/drums/drums1.mp3";
import D4 from "../assets/drums/drums1.mp3";
import D5 from "../assets/drums/drums1.mp3";
import D6 from "../assets/drums/drums1.mp3";
import D7 from "../assets/drums/drums1.mp3";

import F1 from "../assets/french-horn/A1.mp3";
import F2 from "../assets/french-horn/A3.mp3";
import F3 from "../assets/french-horn/C2.mp3";
import F4 from "../assets/french-horn/C4.mp3";
import F5 from "../assets/french-horn/D3.mp3";
import F6 from "../assets/french-horn/D5.mp3";
import F7 from "../assets/french-horn/Ds2.mp3";

import A1 from "../assets/piano/A1.mp3";
import A2 from "../assets/piano/A2.mp3";
import A3 from "../assets/piano/A3.mp3";
import A4 from "../assets/piano/A4.mp3";
import A5 from "../assets/piano/A5.mp3";
import A6 from "../assets/piano/A6.mp3";
import A7 from "../assets/piano/A7.mp3";

import B1 from "../assets/guitar-acoustic/B2.mp3";
import B2 from "../assets/guitar-acoustic/A2.mp3";
import B3 from "../assets/guitar-acoustic/A3.mp3";
import B4 from "../assets/guitar-acoustic/A4.mp3";
import B5 from "../assets/guitar-acoustic/B3.mp3";
import B6 from "../assets/guitar-acoustic/B4.mp3";
import B7 from "../assets/guitar-acoustic/C3.mp3";

const drums = ["D1", "D2", "D3", "D4", "D5", "D6", "D7"];
const french_horns = ["F1", "F2", "F3", "F4", "F5", "F6", "F7"];
const pianos = ["A1", "A2", "A3", "A4", "A5", "A6", "A7"];
const guitars = ["B1", "B2", "B3", "B4", "B5", "B6", "B7"];

// Tone.Transport.state

const seq = new Tone.Sampler({
  D1,
  D2,
  D3,
  D4,
  D5,
  D6,
  D7,
}).toDestination();

const seqq = new Tone.Sampler({
  F1,
  F2,
  F3,
  F4,
  F5,
  F6,
  F7,
}).toDestination();

const seqqq = new Tone.Sampler({
  A1,
  A2,
  A3,
  A4,
  A5,
  A6,
  A7,
}).toDestination();

const seqqqq = new Tone.Sampler({
  B1,
  B2,
  B3,
  B4,
  B5,
  B6,
  B7,
}).toDestination();

const Sequencer = (props) => {
  const [activeColumn, setColumn] = useState(0);
  // const [pattern, props.] = useState(props.initial_pattern);

  // console.log(pattern);

  // console.log("props.sample type is ", props.initial_pattern);

  function hello(type, array_type, sq) {
    console.log(array_type);
    console.log(sq);
    const loop = new Tone.Sequence(
      (time, col) => {
        // Update active column for animation
        setColumn(col);

        // Loop current pattern
        props.pattern.map((row, noteIndex) => {
          // If active
          if (Object.values(row)[0][col]) {
            // Play based on which row
            sq.triggerAttackRelease(array_type[noteIndex], "4n", time);
          }
        });
      },
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      "16n"
    ).start(0);
    return () => loop.dispose();
  }

  switch (props.sample_type) {
    case "drums":
      hello("drums", drums, seq);

      break;

    case "french_horn":
      hello("french_horn", french_horns, seqq);
      break;

    case "piano":
      hello("piano", pianos, seqqq);
      break;

    case "guitar":
      hello("guitar", guitars, seqqqq);
      break;

    default:
      hello("Sample...not found");
  }

  // Update props.pattern by making a copy and inverting the value
  function updatePattern({ x, y, value }) {
    console.log(x, y, value);
    // console.log(Object.values(patternCopy[y])[0][x]);
    const patternCopy = [...props.pattern];
    // setPatettern(())
    // console.log(patternCopy);

    Object.values(patternCopy[y])[0][x] = !Object.values(patternCopy[y])[0][x];
    props.setPattern(patternCopy);
  }

  useEffect(() => {
    console.log("sample type changed");
  }, []);

  return (
    <>
      <div className="backseq">
        <div className="seqBorder">
          {props.pattern?.map((row, y) => (
            <div className="outter" key={y}>
              <div
                key={y}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <div className="label">
                  <h5>{Object.keys(row)}</h5>
                </div>
                {Object.entries(row).map(([key, value]) => (
                  <div className="flex-parent" key={key}>
                    {value?.map((val, x) => {
                      return (
                        <Square
                          key={x}
                          col={x}
                          row={y}
                          active={activeColumn === x}
                          selected={val}
                          onClick={() => updatePattern({ x, y, val })}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const getColor = (row) => {
  switch (row) {
    case 0:
      return "#a374d5";
    case 1:
      return "#be97dc";
    case 2:
      return "rgb(186,225,255)";
    case 3:
      return "rgb(186,255,201)";
    case 4:
      return "rgb(255,255,186)";
    case 5:
      return "rgba(255,223,186)";
    default:
      return "rgba(255,179,186)";
  }
};
const getColumnColor = (key) => {
  switch (key) {
    case 0:
      return "rgba(133, 65, 243, 0.2)";
    case 4:
      return "rgba(133, 65, 243, 0.2)";
    case 8:
      return "rgba(133, 65, 243, 0.2)";
    case 12:
      return "rgba(133, 65, 243, 0.2)";
    default:
      return "";
  }
};

const Square = ({ active, row, selected, onClick, col }) => {
  return (
    <div
      className="square"
      style={{
        borderRadius: active ? "10%" : "10%",
        border: active
          ? "2px solid rgb(167, 167, 167)"
          : "2px solid rgba(167, 167, 167, 0.4)", //`2px solid ${getColumnColor(key)}`,   //"2px solid #eee"
        //background: active ? "rgba(133, 65, 243, 0.9)" : "",
        background: selected ? getColor(row) : getColumnColor(col),
        // backgroundColor: getColumnColor(col),
      }}
      onClick={onClick}
    />
  );
};

// Tone.Transport.swing = 0.5;
// Tone.Transport.swingSubdivision = '16n';

export default Sequencer;

// synth.harmonicity.value = 0.2;
//         const synth = new Tone.AMSynth().toDestination();
// synth.triggerAttackRelease("C2", "16n");
