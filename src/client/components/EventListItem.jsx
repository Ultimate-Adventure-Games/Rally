import React from 'react';
import ImageUpload from './ImageUpload';

const EventListItem = ({ title, description, onSelect, uploadPhotoHandler, id }) => {
    const uploadPhotoWithId = file => { uploadPhotoHandler(file, id) }

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
                        <ImageUpload uploadPhotoHandler={uploadPhotoWithId} title="&#10003;"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EventListItem;