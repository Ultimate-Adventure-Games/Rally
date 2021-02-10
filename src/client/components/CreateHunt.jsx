import React, { useState, Fragment } from "react";
import "bootstrap/dist/css/bootstrap.css";

const CreateHunt = () => {
  const [inputFields, setInputFields] = useState([
    { eventName: "", eventLocation: "" },
  ]);

  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({ eventName: "", eventLocation: "" });
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
    } else {
      values[index].eventLocation = event.target.value;
    }

    setInputFields(values);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("inputFields", inputFields);
  };

  return (
    <>
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
                <label htmlFor="eventLocation">Event Location</label>
                <input
                  type="text"
                  className="form-control"
                  id="eventLocation"
                  name="eventLocation"
                  value={inputField.eventLocation}
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
        <pre>{JSON.stringify(inputFields, null, 2)}</pre>
      </form>
    </>
  );
};

export default CreateHunt;
