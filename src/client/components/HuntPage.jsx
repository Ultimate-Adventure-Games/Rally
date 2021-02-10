import React from 'react';
import { useParams } from 'react-router-dom';
import HuntListItem from './HuntListItem';

const HuntPage = (props) => {

    const { id } = useParams();

    return (
        <>
            <h1>Hunt Page {id}</h1>
            <HuntListItem />
        </>
    )
}

export default HuntPage;