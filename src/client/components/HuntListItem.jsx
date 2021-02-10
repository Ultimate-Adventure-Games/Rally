import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from './ContextProvider';



// TODO could linkTo just be based on key (aka hunt_id)
const HuntListItem = ({ huntId, huntName, voteCount, linkTo, huntItemClickHandler, pos }) => {

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
    }, userHuntStatus)
      
    const [votes, setVotes] = useState(voteCount)
    
    
    // TODO best way to figure out if user already voted? 
    const [userVoted, setUserVoted] = useState(false);


    const upvoteHandler = () => {
      if (!userVoted) {
        setVotes(votes + 1);
        setUserVoted(true);
        // TODO update votes and boolean in global context
      }
    }
    
    const downvoteHandler = () => {
      if (!userVoted) {
        setVotes(votes - 1);
        setUserVoted(true);
        // TODO update votes and boolean in global context
      }
    }

    useEffect(() => {
      // if votes or userHuntStatus changes -- submit PUT request to update db entry
    }, [votes, userHuntStatus])

    
    const signupHandler = () => setUserHuntStatus(1)


    
    // FIXME add didUserVote property in order to prevent double-counting
      
      // TODO conditionally render signup button based on status 
      const signupButton = () => {
        if (!userHuntStatus) return <button onClick={signupHandler}>Sign Up!</button>;
        if (userHuntStatus === 1) return <button>See You There!</button>;
        if (userHuntStatus === 2) return <button>In Progress!</button>;
        if (userHuntStatus === 3) return <button>Completed!</button>;
      }
    
    // TODO include number of people signed up for hunt ?
    return (
        <>
          <div onClick={(e) => huntItemClickHandler(pos, huntName)} className="list-item-container">
            <div className="listItem">
                <div className="text-container">
                    <div className="title">
                        {huntName}
                    </div>
                    <div className="voting-buttons-container">
                      <button className="upvote-button" onClick={upvoteHandler}>&#8593;</button>
                      <div className={votes > 0 ? "voteCountGreen" : "voteCountRed"}>{votes}</div>
                      <button className="downvote-button" onClick={downvoteHandler}>&#8595;</button>
                    </div>
                    <div>
                      {signupButton()}
                    </div>
                </div>
                
                <div className="navigate-container">
                    <div className="navigate">
                        <Link to={linkTo}>select</Link>
                    </div>
                </div>
            </div>
          </div>
        </>
    );
}

export default HuntListItem;