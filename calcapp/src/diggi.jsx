import { ACTIONS } from "./App"

export default  function diggi({dispatch, digit})
{
    return <button onClick={() => dispatch ({ type: ACTIONS.ADD_DIGIT, payload: {digit} })}>{digit}</button>
}