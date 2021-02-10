import React from 'react';

const EventListItem = ({ title, description, onSelect }) => {

    return (
        <>
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
                            <button onClick={onSelect}>select</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EventListItem;