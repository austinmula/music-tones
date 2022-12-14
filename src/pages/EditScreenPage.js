import React, { useState, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import * as Tone from "tone";
import Sequencer from "../components/Seq";

export default function EditpageScreen({ match, history }) {
  const { state } = useLocation();
  const [sample_name, setName] = useState(state.name);
  const [sample_type, setType] = useState(state.type);
  const [play, setPlay] = useState(false);
  const [playState, setPlayState] = useState(false);

  // const [keysOnly,setKeysonly] = useState([])

  const synth = new Tone.Synth().toDestination();
  // use an array of objects as long as the object has a "time" attribute

  const typess = ["piano", "french_horn", "guitar", "drums"];

  var myJSONString = state.recording_data;
  var myObject = JSON.parse(myJSONString);

  const [pattern, setPattern] = useState(myObject);

  const [checkeffect, setCheckEffect] = useState(true);
  const [checkeffectType, setCheckEffecttype] = useState(true);

  const sample_id = match.params.id;

  function createGist() {
    const url = `http://wmp.interaction.courses/api/v1/?apiKey=2izT6jiZ&mode=update&endpoint=samples&sampleType=${sample_type}&sampleName=${sample_name}&id=${sample_id}`;
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
    setCheckEffecttype(!checkeffectType);
    //setSelectSpeaker(!playState ? speaker.speakerPlay : speaker.speakerStop)
  }

  useEffect(() => {
    console.log("updating music sample");
  }, [checkeffect, play, sample_type, checkeffectType]);

  const keys_only = [];
  var container = [];
  // recording_data.map((array_element) => {
  //   Object.values(array_element)[0].map((array_key, i) => {
  //     if (array_key) {
  //       keys_only.push(`${Object.keys(array_element)[0]}${i}`);
  //     }
  //   });
  // });

  // for (let index = 0; index < keys_only.length; index++) {
  //   const element = keys_only[index];
  //   container.push({
  //     time: 1 + index - 0.5,
  //     note: element,
  //     velocity: 0.9,
  //   });
  // }

  const sampler = new Tone.Sampler({
    urls: {
      C4: "C4.mp3",
      "D#4": "Ds4.mp3",
      "F#4": "Fs4.mp3",
      A4: "A4.mp3",
    },
    release: 1,
    baseUrl: "./data/samples/piano/",
  }).toDestination();

  const part = new Tone.Part((time, value) => {
    // the value is an object which contains both the note and the velocity
    synth.triggerAttackRelease(value.note, "8n", time, value.velocity);
  }, container).start(0);

  const playHandler = (e) => {
    e.preventDefault();
    setPlay(true);
    console.log(keys_only);
    // Tone.loaded().then(() => {
    //     keys_only.forEach((key,i) => {
    //         sampler.triggerAttackRelease(key,"8n", 1+i-0.5,0.9)
    //     });
    // 	;
    // })

    setPlay(false);
  };

  const toggle = useCallback(() => {
    Tone.start();
    Tone.Transport.toggle();
    setCheckEffect(!checkeffect);
  }, []);

  return (
    <form onSubmit={handleSubmit} className="major-container">
      <div className="below-header">
        <h1>Samples you've created</h1>
      </div>

      {/* COntainer form */}
      <div className="container-cont">
        <div className="left-items">
          <input
            className="w-100"
            type="text"
            value={sample_name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="right-items">
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

          <button className="one-of-three" id="three1" type="submit">
            {" "}
            Save{" "}
          </button>
        </div>
      </div>
      {/* end container form */}

      {/* Sequencer container */}
      <div className="type-overall-container">
        <div className="type">
          <div className="row" id="row-one">
            <div id="column1">
              <h5>Type</h5>
            </div>

            <div className="type-sub-cont">
              {typess.map((type) => (
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
            initial_pattern={pattern}
            pattern={pattern}
            setPattern={setPattern}
            sample_type={sample_type}
          />
        </div>
      </div>
    </form>
  );
}
