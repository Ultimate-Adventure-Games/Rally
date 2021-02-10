import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from './ContextProvider';



// TODO could linkTo just be based on key (aka hunt_id)
const HuntListItem = ({ huntName, voteCount, linkTo }) => {

  // deconstruct completedHunts, runningHunts, potentialHunts
  const {
    potentialHunts,
    runningHunts,
    completedHunts,
  } = useContext(AppContext);
    
      
    // default to 0 
    const [userHuntStatus, setUserHuntStatus] = useState(0);
    
    // conditional check and update state 
    /**
       * state hook for userHuntStatus
       * 3 = completed 
       * 2 = running
       * 1 = potential 
       * = 0 not signed up 
       */
    // FIXME not the most efficient time complexity -- fix later 
    // TODO confirm format of completedHunts object 
    useEffect(() => {
      // if (completedHunts.includes(linkTo)) setUserHuntStatus(3)
      // else if (runningHunts.includes(linkTo)) setUserHuntStatus(2)
      // else if (potentialHunts.includes(linkTo)) setUserHuntStatus(1)
      // else setUserHuntStatus(0)
      setUserHuntStatus(0)
    })
      
    const [votes, setVotes] = useState(voteCount)

    const upvoteHandler = () => {
      setVotes(votes + 1)
    }
    
    const downvoteHandler = () => {
      setVotes(votes - 1)
    }

    useEffect(() => {
      // if votes or userHuntStatus changes -- submit PUT request to update db entry
    }, [votes, userHuntStatus])

    
    
    // FIXME add didUserVote property in order to prevent double-counting
      
      // TODO conditionally render signup button based on status 
      let signupButton;
      if (!userHuntStatus) {
        // signupButton = <button onClick={signupHandler}>Sign Up!</button>;
        signupButton = <button>Sign Up!</button>;
      } else if (userHuntStatus === 1) {
        signupButton = <button>See You There!</button>;
      } else if (userHuntStatus === 2) {
        signupButton = <button>In Progress!</button>;
      } else if (userHuntStatus === 3) {
        signupButton = <button>Completed!</button>;
      } 
    
    // TODO include number of people signed up for hunt 
    return (
        <>
            <div className="listItem">
                <div className="voting-buttons-container">
                    <button onClick={upvoteHandler}>&#8593;</button>
                    <div className="voteCount">{voteCount}</div>
                    <button onClick={downvoteHandler}>&#8595;</button>
                </div>
                <div className="text-container">
                    <div className="title">
                        {huntName}
                    </div>
                    <div className="description">
                        {/* TODO {description} */}
                        Good times fam! 
                    </div>
                    <div>
                      {signupButton}
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