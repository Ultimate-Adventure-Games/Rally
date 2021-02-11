import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from './ContextProvider';



// TODO could linkTo just be based on key (aka hunt_id)
const HuntListItem = ({huntId, huntName, voteCount, linkTo, huntItemClickHandler, pos}) => {

  const {
    potentialHunts,
    runningHunts,
    completedHunts,
    setPotentialHunts,
    setRunningHunts,
    setCompletedHunts,
  } = useContext(AppContext);
    
  const [votes, setVotes] = useState(voteCount)
  const [potential, setPotential] = useState(potentialHunts)
  const [userVoted, setUserVoted] = useState(false);
  const [userHuntStatus, setUserHuntStatus] = useState(0);
  const [running, setRunning] = useState(runningHunts)
  const [completed, setCompleted] = useState(completedHunts)
  
      
  
    
    // conditional check and update state 
    /**
       * state hook for userHuntStatus
       * 3 = completed 
       * 2 = running
       * 1 = potential 
       * = 0 not signed up 
       */
    // FIXME not the most efficient time complexity -- fix later 
    // TODO confirm format of completedHunts array -- will it contain huntId's? 
    useEffect(() => {
      if (completedHunts.includes(huntId)) setUserHuntStatus(3)
      else if (runningHunts.includes(huntId)) setUserHuntStatus(2)
      else if (potentialHunts.includes(huntId)) setUserHuntStatus(1)
      else setUserHuntStatus(0)
    }, [])
      
    // useEffect(() => {
    //   // if votes or userHuntStatus changes -- submit PUT request to update db entry
    // }, [votes, userHuntStatus])

    
    const signupHandler = () => {
      // update status state hook in order to conditionally render the appropriate button
      setUserHuntStatus(1)
      // update array of potentialHunts (hunts user signed up for) in local state first 
      setPotential([...potential, huntId])
      // replace array in context with the updated array from local state
      setPotentialHunts(potential);
    }


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
                    {/* <div className="pplGoing-container">
                      <b>{pplGoing}</b> people going to this event!
                    </div> */}
                    <div>
                      {signupButton()}
                    </div>
                </div>
                
                <div className="navigate-container">
                    <div className="navigate">
                        <Link 
                        to={{
                        pathname: linkTo,
                        state: { huntName: huntName }
                        }}
                        >
                        select</Link>
                    </div>
                </div>
            </div>
          </div>
        </>
    );
}

export default HuntListItem;