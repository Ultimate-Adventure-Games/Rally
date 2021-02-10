import React from 'react';
import { Link } from 'react-router-dom';

const HuntListItem = ({ title, upvoteHandler, downvoteHandler, linkTo }) => {


    return (
        <>
            <div className="listItem">
                <div className="voting-buttons-container">
                    <button onClick={upvoteHandler}>&#8593;</button>
                    <button onClick={downvoteHandler}>&#8595;</button>
                </div>
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
                        <Link to={linkTo}>select</Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HuntListItem;