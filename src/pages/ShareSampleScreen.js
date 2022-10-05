import React, { useState, useEffect, usState } from "react";
import { Routes, Route, useLocation, Link } from "react-router-dom";
import Card from "../components/Card";
import * as Tone from "tone";

export default function ShareSampleScreen({ match, history }) {
  const { state } = useLocation();
  const [playing, play] = useState(false);
  const [sample_name, setName] = useState(state.name);
  const [sample_date, setDate] = useState();
  const [sample_to_locations, updateSampleToLocations] = useState("");
  const [locations, updateLocations] = useState("");
  // const [similarlocations, updateSimilarLocations] = useState('')

  const sample_id = state.id;
  const synth = new Tone.PolySynth(Tone.Synth).toDestination();
  const now = Tone.now();
  useEffect(() => {
    fetchSampleToLocation();
    fetchLocations();
  }, []);

  const fetchSampleToLocation = () => {
    fetch(
      "http://wmp.interaction.courses/api/v1/?apiKey=2izT6jiZ&mode=read&endpoint=samples_to_locations"
    )
      .then((res) => res.json())
      .then((json) => {
        const samplelocation_array = json.samples_to_locations;
        console.log("sample_locations ", samplelocation_array.length);
        updateSampleToLocations(samplelocation_array);
      })
      .catch((error) => {
        // handle the error
      });
  };

  const fetchLocations = () => {
    fetch(
      "http://wmp.interaction.courses/api/v1/?apiKey=2izT6jiZ&mode=read&endpoint=locations"
    )
      .then((res) => res.json())
      .then((json) => {
        const samplelocation_array = json.locations;
        console.log("sample_locations ", samplelocation_array.length);
        updateLocations(samplelocation_array);
      })
      .catch((error) => {
        // handle the error
      });
  };

  const shareSample = (location_iddd) => {
    console.log("samole share");

    const url = `http://wmp.interaction.courses/api/v1/?apiKey=2izT6jiZ&mode=create&endpoint=samples_to_locations&sampleID=${sample_id}&locationID=${location_iddd}`;
    fetch(url, {
      method: "GET",
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
  };

  const deshareSample = (location_iddd) => {
    console.log("samole share");
    const url = `http://wmp.interaction.courses/api/v1/?apiKey=2izT6jiZ&mode=delete&endpoint=samples_to_locations&id=${location_iddd}`;
    fetch(url, {
      method: "GET",
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
  };

  const playHandler = () => {
    play(true);
    console.log("playing");
    synth.triggerAttack("D4", now);
    synth.triggerAttack("F4", now + 0.5);
    synth.triggerAttack("A4", now + 1);
    synth.triggerAttack("C5", now + 1.5);
    synth.triggerAttack("E5", now + 2);
    synth.triggerRelease(["D4", "F4", "A4", "C5", "E5"], now + 4);
    const del = setTimeout(play(false), 5000);
    play(false);
  };

  return (
    <>
      <div className="major-container">
        <div className="below-header">
          <h1>Share This Sample</h1>
        </div>

        <div className="container-cont">
          <div className="left-items">
            <h3>{sample_name}</h3>

            <p className="date-text">{sample_date}</p>
          </div>
          <div className="right-items" id="share-page-right">
            <button
              className="one-of-three"
              id="preview"
              type="button"
              onClick={playHandler}
              id="two1"
            >
              {playing ? "Stop Previewing" : "Preview"}
            </button>
          </div>
        </div>

        {locations.length > 0 &&
          locations.map((l) => (
            <>
              <div className="share-status">
                <div className="left-items" id="text-container">
                  <h5>{l.location}</h5>
                </div>
                {sample_to_locations &&
                  sample_to_locations.map((x) => (
                    <>
                      <div className="right-items" id="status-sub-cont">
                        <button
                          className="shared"
                          onClick={() => shareSample(l.id)}
                          disabled={
                            l.id === x.locations_id &&
                            x.samples_id === sample_id
                              ? true
                              : false
                          }
                          id={
                            l.id === x.locations_id &&
                            x.samples_id === sample_id
                              ? "checked-off"
                              : "checked-on"
                          }
                        >
                          <h5>Not Shared</h5>
                        </button>
                        <button
                          className="shared"
                          onClick={() => deshareSample(x.id)}
                          id={
                            l.id === x.locations_id &&
                            x.samples_id === sample_id
                              ? "checked-on"
                              : "checked-off"
                          }
                        >
                          <h5>Shared</h5>
                        </button>
                      </div>
                    </>
                  ))}

                <div className="right-items" id="status-sub-cont">
                  <button
                    className="shared"
                    onClick={() => shareSample(l.id)}
                    id="checked-on"
                  >
                    <h5>Not Shared</h5>
                  </button>
                  <button className="shared">
                    <h5>Shared</h5>
                  </button>
                </div>
              </div>
            </>
          ))}
      </div>
    </>
  );
}
