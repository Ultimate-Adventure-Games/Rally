import React from 'react';
import { Link } from 'react-router-dom';

const HuntListItem = ({ title, description, upvoteHandler, downvoteHandler, linkTo }) => {


    return (
        <>
            <div className="listItem">
                <div className="text-container">
                    <div className="title">
                        {title}
                    </div>
                    <div className="description">
                        {description}
                    </div>
                </div>
                <div className="voting-buttons-container">
                    <button onClick={upvoteHandler}>Upvote</button>
                    <button onClick={downvoteHandler}>Downvote</button>
                </div>
                <div className="navigate-container">
                    <div className="navigate">
                        <Link to={linkTo}>select</Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HuntListItem;