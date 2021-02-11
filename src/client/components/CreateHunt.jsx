import React, { useState, Fragment } from "react";
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";

const CreateHunt = () => {
  const [inputFields, setInputFields] = useState([
    { eventName: "", eventLat: "", eventLon: "", eventDetail: "" },
  ]);

  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({ eventName: "", eventLat: "", eventLon: "", eventDetail: "" });
    setInputFields(values);
  };

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    if (event.target.name === "eventName") {
      values[index].eventName = event.target.value;
    } else if (event.target.name === "eventLat") {
      values[index].eventLat = event.target.value;
    } else if (event.target.name === "eventLon") {
      values[index].eventLon = event.target.value;
    } else {
      values[index].eventDetail = event.target.value;
    }

    setInputFields(values);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("inputFields", inputFields);
  };

  return (
    <>
      <Link to='/hunts'>Back to Hunts</Link>
      <h1>Create Hunt!</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          {inputFields.map((inputField, index) => (
            <Fragment key={`${inputField}~${index}`}>
              <div className="form-group col-sm-6">
                <label htmlFor="eventName">Event Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="eventName"
                  name="eventName"
                  value={inputField.eventName}
                  onChange={(event) => handleInputChange(index, event)}
                />
              </div>
              <div className="form-group col-sm-4">
                <label htmlFor="eventLat">Event Latitude</label>
                <input
                  type="text"
                  className="form-control"
                  id="eventLat"
                  name="eventLat"
                  value={inputField.eventLat}
                  onChange={(event) => handleInputChange(index, event)}
                />
              </div>
              <div className="form-group col-sm-4">
                <label htmlFor="eventLon">Event Longitude</label>
                <input
                  type="text"
                  className="form-control"
                  id="eventLon"
                  name="eventLon"
                  value={inputField.eventLon}
                  onChange={(event) => handleInputChange(index, event)}
                />
              </div>
              <div className="form-group col-sm-4">
                <label htmlFor="eventDetail">Event Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="eventDetail"
                  name="eventDetail"
                  value={inputField.eventDetail}
                  onChange={(event) => handleInputChange(index, event)}
                />
              </div>
              <div className="form-group col-sm-2">
                <button
                  className="btn btn-link"
                  type="button"
                  onClick={() => handleRemoveFields(index)}
                >
                  -
                </button>
                <button
                  className="btn btn-link"
                  type="button"
                  onClick={() => handleAddFields()}
                >
                  +
                </button>
              </div>
            </Fragment>
          ))}
        </div>
        <div className="submit-button">
          <button
            className="btn btn-primary mr-2"
            type="submit"
            onSubmit={handleSubmit}
          >
            Save
          </button>
        </div>
        <br />
        {/* <pre>{JSON.stringify(inputFields, null, 2)}</pre> */}
      </form>
    </>
  );
};

export default CreateHunt;
