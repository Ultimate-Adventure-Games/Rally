import React, { useContext, useState } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { AppContext } from './ContextProvider';

  /**
   * boilerplate component that holds the address input in local state, while parent component handles ultimate selection
   */
  const LocationSearchInput = ({handleSelect}) => {
    

    const [startingLocation, setStartingLocation] = useState('')

    const handleChange = address => {
      // console.log(address)
      setStartingLocation(address)
    };

    /**
     * Deconstruct user's location from global context
     * Set search options depending on user's location in order 
     * to bias autocomplete predictions to their location
     * @radius is in meters
     */

     const { userLat, userLng } = useContext(AppContext);

     const searchOptions = {
       location: new google.maps.LatLng(userLat, userLng),
       radius: 1000,
     }

    
    return (
      <PlacesAutocomplete
        value={startingLocation}
        onChange={handleChange}
        onSelect={() => handleSelect(startingLocation)}
        searchOptions={searchOptions}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="form-group col-sm-6">
            <input
              type="text"
                  className="form-control"
                  id="huntLocation"
                  name="huntLocation"
              {...getInputProps({
                // placeholder: 'Search Places ...',
                // className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }


export default LocationSearchInput;