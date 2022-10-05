import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import { Link } from "react-router-dom";

export default function HomepageScreen() {
  const [samples, updateSamples] = useState([]);
  const [sample_locations, updateSampleLocations] = useState("");

  const types = ["Piano", "French Horn", "Guitar", "Drums"];

  console.log();

  useEffect(() => {
    fetchSamples();
    fetchSampleLocation();
  }, []);

  const fetchSamples = () => {
    fetch(
      "http://wmp.interaction.courses/api/v1/?apiKey=2izT6jiZ&mode=read&endpoint=samples"
    )
      .then((res) => res.json())
      .then((json) => {
        const sample_array = json.samples;
        console.log(sample_array.length);
        // console.log(sample_array);
        updateSamples(sample_array);
        // sample_array.forEach(element => {
        //     updateSamples(samples => [...samples,element])

        // });
      })
      .catch((error) => {
        // handle the error
      });
  };

  const fetchSampleLocation = () => {
    fetch(
      "http://wmp.interaction.courses/api/v1/?apiKey=2izT6jiZ&mode=read&endpoint=samples_to_locations"
    )
      .then((res) => res.json())
      .then((json) => {
        const samplelocation_array = json.samples_to_locations;
        console.log("sample_locations ", samplelocation_array.length);
        updateSampleLocations(samplelocation_array);
      })
      .catch((error) => {
        // handle the error
      });
  };

  return (
    <>
      <div className="major-container">
        <div className="below-header">
          <h1>Samples you've created</h1>
          <div>
            {samples.length == 0 ? (
              <div className="container-cont">
                <p>No samples </p>
              </div>
            ) : (
              <>
                {samples.map((item, index) => (
                  <Card sample_details={item} key={index} />
                ))}
              </>
            )}

            <div className="container-cont">
              <Link to={`/create`}>
                <button className="one-of-three" id="create">
                  Create Sample
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
