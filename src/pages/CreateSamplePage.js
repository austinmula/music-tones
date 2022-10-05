import React, { useState, useCallback, useEffect } from "react";
import * as Tone from "tone";
import Sequencer from "../components/Seq";
import { Initial_recording } from "../components/Resources";

export default function CreateScreen({ match, history }) {
  const initial = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  //states
  const [playing, setPlay] = useState(false);
  const [sample_name, setName] = useState("");
  const [sample_type, setType] = useState("Piano");
  const [checkeffect, setCheckEffect] = useState(true);
  const [playState, setPlayState] = useState(false);

  //instrument types
  const types = ["piano", "french_horn", "guitar", "drums"];

  const [recording_data, setRecordingdata] = useState(Initial_recording);
  const [pattern, setPattern] = useState(Initial_recording);

  const playHandler = () => {
    setPlay(true);

    setPlay(false);
  };

  function createGist() {
    console.log("sumitting ", sample_type);
    console.log("sumitting ", sample_name);

    // console.log(pattern);

    const url = `http://wmp.interaction.courses/api/v1/?apiKey=2izT6jiZ&mode=create&endpoint=samples&sampleType=${sample_type}&sampleName=${sample_name}`;
    fetch(url, {
      method: "POST",
      body: JSON.stringify(pattern),
    })
      .then(function (response) {
        alert("Success");
        history.push("/");
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch(console.error);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    createGist();
  };

  function handleStart() {
    setPlayState((prevPlayState) => !prevPlayState);
    //setSelectSpeaker(!playState ? speaker.speakerPlay : speaker.speakerStop)
  }

  const handleOnChange = (objectoo, indexoo) => {
    var our_array = [];
    var that_bj = {};
    var new_value = true;
    Initial_recording.forEach((element, i) => {
      // element is object

      if (Object.keys(element)[0] === objectoo) {
        our_array = Object.values(element)[0];
        that_bj = recording_data[i];
        console.log("before change ", our_array[indexoo]);
        new_value = !our_array[indexoo];
        console.log("after change", new_value);
      }
    });
    our_array[indexoo] = new_value;

    console.log("recoord ", recording_data);
    setRecordingdata(recording_data);
    setCheckEffect(!checkeffect);
  };

  useEffect(() => {
    console.log("updateing music sample");
  }, [checkeffect]);

  const toggle = useCallback(() => {
    Tone.Transport.toggle();
    Tone.start();
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit} className="major-container">
        <div className="below-header">
          <h1>Create Sample</h1>
        </div>

        <div className="container-cont">
          <div className="left-items">
            <h3 id="edit-cream">
              <input
                id="edit-cream-input"
                type="text"
                value={sample_name}
                onChange={(e) => setName(e.target.value)}
              />
            </h3>
          </div>
          <div className="right-items" id="share-page-right">
            <button
              className="one-of-three"
              type="button"
              onClick={() => {
                toggle();
                handleStart();
              }}
            >
              {playState ? "Stop Previewing" : "Preview"}
            </button>
            <button className="one-of-three" type="submit" id="three1">
              Save
            </button>
          </div>
        </div>

        <div className="type-overall-container">
          <div className="type">
            <div className="row" id="row-one">
              <div id="column1">
                <h5>Type</h5>
              </div>

              <div className="type-sub-cont">
                {types.map((type) => (
                  <button
                    key={type}
                    id="column2"
                    type="button"
                    onClick={(e) => setType(type)}
                    className={
                      sample_type === type ? "checked-on" : "checked-off"
                    }
                  >
                    <h5>{type}</h5>
                  </button>
                ))}
              </div>
            </div>
            <Sequencer
              sample_type={sample_type}
              initial_pattern={Initial_recording}
              pattern={pattern}
              setPattern={setPattern}
            />
          </div>
        </div>
      </form>
    </>
  );
}
