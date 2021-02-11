import React, {useContext} from 'react';
import ImageUpload from './ImageUpload';

import { AppContext } from './ContextProvider';

const EventListItem = ({ title, description, onSelect, uploadPhotoHandler, id }) => {
    const { user } = useContext(AppContext);

    
const uploadImage = e => {
    const files = Array.from(e.target.files)
  
    const formData = new FormData()
  
    files.forEach((file, i) => {
      formData.append(i, file)
    })
  
    fetch(`http://localhost:3000/api/photos/image-upload/` + id + '/' + user.user_id, {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(images => {
        console.log(images)
      //refresh state
    })
  }

    return (
        <div className="list-item-container">
            <div className="listItem">
                <div className="text-container">
                    <div className="title">
                        {title}
                    </div>
                    <div className="description">
                        {description}
                    </div>
                </div>
                <div className="navigate-container">
                    <div className="navigate">
                        <button onClick={onSelect}>View</button>
                        {/* <input type='file' id='single' onChange={uploadImage} />  */}
                        <ImageUpload uploadPhotoHandler={uploadPhotoWithId} title="&#10003;"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EventListItem;