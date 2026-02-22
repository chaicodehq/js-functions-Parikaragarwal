/**
 * 🗳️ Panchayat Election System - Capstone
 *
 * Village ki panchayat election ka system bana! Yeh CAPSTONE challenge hai
 * jisme saare function concepts ek saath use honge:
 * closures, callbacks, HOF, factory, recursion, pure functions.
 *
 * Functions:
 *
 *   1. createElection(candidates)
 *      - CLOSURE: private state (votes object, registered voters set)
 *      - candidates: array of { id, name, party }
 *      - Returns object with methods:
 *
 *      registerVoter(voter)
 *        - voter: { id, name, age }
 *        - Add to private registered set. Return true.
 *        - Agar already registered or voter invalid, return false.
 *        - Agar age < 18, return false.
 *
 *      castVote(voterId, candidateId, onSuccess, onError)
 *        - CALLBACKS: call onSuccess or onError based on result
 *        - Validate: voter registered? candidate exists? already voted?
 *        - If valid: record vote, call onSuccess({ voterId, candidateId })
 *        - If invalid: call onError("reason string")
 *        - Return the callback's return value
 *
 *      getResults(sortFn)
 *        - HOF: takes optional sort comparator function
 *        - Returns array of { id, name, party, votes: count }
 *        - If sortFn provided, sort results using it
 *        - Default (no sortFn): sort by votes descending
 *
 *      getWinner()
 *        - Returns candidate object with most votes
 *        - If tie, return first candidate among tied ones
 *        - If no votes cast, return null
 *
 *   2. createVoteValidator(rules)
 *      - FACTORY: returns a validation function
 *      - rules: { minAge: 18, requiredFields: ["id", "name", "age"] }
 *      - Returned function takes a voter object and returns { valid, reason }
 *
 *   3. countVotesInRegions(regionTree)
 *      - RECURSION: count total votes in nested region structure
 *      - regionTree: { name, votes: number, subRegions: [...] }
 *      - Sum votes from this region + all subRegions (recursively)
 *      - Agar regionTree null/invalid, return 0
 *
 *   4. tallyPure(currentTally, candidateId)
 *      - PURE FUNCTION: returns NEW tally object with incremented count
 *      - currentTally: { "cand1": 5, "cand2": 3, ... }
 *      - Return new object where candidateId count is incremented by 1
 *      - MUST NOT modify currentTally
 *      - If candidateId not in tally, add it with count 1
 *
 * @example
 *   const election = createElection([
 *     { id: "C1", name: "Sarpanch Ram", party: "Janata" },
 *     { id: "C2", name: "Pradhan Sita", party: "Lok" }
 *   ]);
 *   election.registerVoter({ id: "V1", name: "Mohan", age: 25 });
 *   election.castVote("V1", "C1", r => "voted!", e => "error: " + e);
 *   // => "voted!"
 */
export function createElection(candidates) {

  candidates.forEach(candidate => {
    candidate['votes']=0;
  });

  const registered = new Set();
  const voted = new Set();

  function  registerVoter(voter){

    //create a validator instead from the function instead of making it manual

    const validator = createVoteValidator({ minAge: 18, requiredFields: ["id", "name", "age"] });

    //find if voter already exists
    let existingVoter=null;
     for(let el of registered)
     {
      if(el.id===voter.id)
      {
        existingVoter = el;
        break;
      }
     }

    //if already registered or isInvalid return false
    if(existingVoter || ! ((validator(voter)).valid))
    {
      return false;
    }

    //add to registered and return true
    registered.add(voter);
    return true;
  }

  function castVote(voterId, candidateId, onSuccess, onError){
     let voter=null;
     for(let el of registered)
     {
      if(el.id===voterId)
      {
        voter = el;
        break;
      }
     }
     let candidate=candidates.find((el=>el.id===candidateId));
     if(!voted.has(voterId) && voter && candidate)
     {
      voted.add(voterId);
      candidate.votes++;
      return onSuccess({voterId,candidateId});
     }else{
      if(voted.has(voterId))
      {
        return onError("Voter has already voted");
      }
      else if(!voter && !candidate)
      {
        return onError('neither candidate nor voter');
      }else if(!voter)
      {
        return onError('no such voter');
      }else{
        return onError('no such candidate');
     }
  }


  }

  function getResults(sortFn){
    if(sortFn)
    {
      return [...candidates].sort(sortFn);
    }else{
      return [...candidates].sort((a,b)=>(b.votes-a.votes));
    }
  }

  function getWinner(){
    const winner = candidates.reduce((maxel,el)=>el.votes>maxel.votes?el:maxel,candidates[0]);
    if(winner.votes>0){
      return winner;
    }else{
      return null;
    }
  }

  return {
    registerVoter,
    castVote,
    getResults,
    getWinner
  }
}

export function createVoteValidator(rules) {
  return (voter)=>{
    if(!voter || typeof(voter)!=='object')
    {
      return {valid:false,reason:"invalid voter object"};
    }
    const hasAllProperties = rules.requiredFields.every(el=>voter.hasOwnProperty(el));
    const valid = voter.age>=rules.minAge && hasAllProperties;
    const reason = voter.age<rules.minAge?"underage":'missing property';
    return {valid,reason};
  }
}

export function countVotesInRegions(regionTree) {
  if(!regionTree || typeof regionTree!=='object')
  {
    return 0;
  }
  let sum =regionTree.votes;

  regionTree.subRegions.forEach(tree=>(sum+=countVotesInRegions(tree)));
  return sum;
}

export function tallyPure(currentTally, candidateId) {
  const tally = structuredClone(currentTally);
  if(!tally.hasOwnProperty(candidateId))
  {
    tally[candidateId]=1;
  }else{
    tally[candidateId]++;
  }
  return tally;
}
