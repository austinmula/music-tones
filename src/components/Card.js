import React, { useState } from "react";

import { Routes, Route, Outlet, Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import * as Tone from "tone";

function Card(props) {
  const { name, datetime, id } = props.sample_details;

  const [playing, play] = useState(false);

  var myJSONString = props.sample_details.recording_data;
  var myObject = JSON.parse(myJSONString);

  console.log(myObject);

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

  const playHandler = () => {
    play((prev) => !prev);
    synth.triggerAttack("D4", now);
    synth.triggerAttack("F4", now + 0.5);
    synth.triggerAttack("A4", now + 1);
    synth.triggerAttack("C5", now + 1.5);
    synth.triggerAttack("E5", now + 2);
    synth.triggerRelease(["D4", "F4", "A4", "C5", "E5"], now + 4);
    // Tone.loaded().then(() => {
    //   sampler.triggerAttackRelease(["Eb4", "G4", "Bb4"], 0.5);
    // });
    // setTimeout(() => {
    //   play(false);
    // }, 5000);
    // play(false);
  };
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
        <button className="one-of-three" id="one1" onClick={playHandler}>
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
