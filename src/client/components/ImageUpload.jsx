import React, { useRef, useState } from 'react';

/**
 * 
 * @callback props.uploadPhotoHandler First argument will be FormData <https://developer.mozilla.org/en-US/docs/Web/API/FormData> with files
 */

const ImageUpload = ({ uploadPhotoHandler }) => {

    const inputFile = useRef(null);
    const onFileSelection = (event) => {
        // const formData = new FormData();
        // formData.append(0, event.target.files[0]);
        if(uploadPhotoHandler) uploadPhotoHandler(event.target.files[0]);
    }
    const onClickUpload = (event) => {
        inputFile.current.click();
    }

    return (
        <>
            <input style={{ 'display': 'none' }} type="file" ref={inputFile} onChange={onFileSelection} />
            <button onClick={onClickUpload}>Photo</button>
        </>
    )
}

export default ImageUpload;