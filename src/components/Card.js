import React, { useCallback, useState } from "react";

import { Routes, Route, Outlet, Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import * as Tone from "tone";

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

function Card(props) {
  const { name, datetime, id } = props.sample_details;

  // var myJSONString = props.sample_details.recording_data;
  // var myObject = JSON.parse(myJSONString);

  const [playingNow, setPlayingNow] = useState();

  const [playing, play] = useState(false);

  // console.log(myObject);

  const synth = new Tone.PolySynth(Tone.Synth).toDestination();
  const now = Tone.now();

  const sampler = new Tone.Sampler({
    urls: {
      C4: "C4.mp3",
      "D#4": "Ds4.mp3",
      "F#4": "Fs4.mp3",
      A4: "A4.mp3",
    },
    baseUrl: "https://tonejs.github.io/audio/salamander/",
  }).toDestination();

  function hello(type, array_type, sq) {
    // console.log(array_type);
    // console.log(sq);
    const loop = new Tone.Sequence(
      (time, col) => {
        // Update active column for animation
        // setColumn(col);
        console.log(playingNow);
        console.log(typeof playingNow);
        console.log(col);
        // Loop current pattern

        playingNow?.map((row, noteIndex) => {
          // If active
          if (Object.values(row)[0][col]) {
            // Play based on which row
            sq?.triggerAttackRelease(
              props.sample_details.type[noteIndex],
              "4n",
              time
            );
          }
        });
      },
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      "16n"
    ).start(0);
    return () => loop.dispose();
  }

  const playHandler = (id) => {
    // console.log(id);
    props.sample_details.id == id &&
      setPlayingNow(JSON.parse(props.sample_details.recording_data));

    // playingNow = playingNow.replace(/'/g, '"'); //replacing all ' with "
    // playingNow = JSON.parse(playingNow);
    // console.log(playingNow);
    toggle();
    switch (props.sample_details.type) {
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

    console.log(playingNow);
  };

  const toggle = useCallback(() => {
    Tone.start();
    Tone.Transport.toggle();
  }, []);

  return (
    <div className="container-cont">
      <div className="left-items">
        <h3>{name}</h3>
        <p className="date-text">{datetime}</p>
      </div>

      <div className="right-items">
        <button className="one-of-three" id="one1">
          <Link to={{ pathname: `/share/${id}`, state: props.sample_details }}>
            Share{" "}
          </Link>
        </button>
        <button
          className="one-of-three"
          id="one1"
          onClick={() => playHandler(props.sample_details.id)}
        >
          <>{playing ? "Stop Previewing" : "Preview"}</>
        </button>
        <button className="one-of-three" id="three1">
          <Link
            to={{
              pathname: `/edit/${id}`,
              state: props.sample_details,
            }}
          >
            {" "}
            Edit{" "}
          </Link>
        </button>
      </div>
    </div>
  );
}
export default Card;
