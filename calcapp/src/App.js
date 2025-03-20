import './App.css';
import {useReducer} from 'react';
import  DIGGI from './diggi';
import OperBtn from './operrabtn';


export const ACTIONS = {
    ADD_DIGIT: 'add-digit',
    CHOOSE_OPERATION: 'choose-operation',
    CLEAR: 'clear',
    DELETE_DIGIT: 'delete-digit',
    EVALUATE: 'evaluate'
  }

  function reducer( state, {type, payload}){
  switch(type) {
    case ACTIONS.ADD_DIGIT:
      if(state.overwrite){
        return{
          ...state,
          curroper: payload.digit,
          overwrite:false,
        }
      }
      if(payload.digit === "0" && state.curroper === "0" )return state
      if(payload.digit === "." && state.curroper.includes("."))return state

      return {
        ...state,
        curroper:`${state.curroper || ""}${payload.digit}`
  }
  case ACTIONS.CHOOSE_OPERATION:
    if (state.curroper== null && state.prevoper == null){
      return state
    }
    if(state.curroper == null)
      return {
    ...state,
    operation:payload.operation,
  }
    if (state.prevoper == null){
      return {
        ...state,
        operation: payload.operation,
        prevoper:state.curroper,
        curroper:null,
      }
    }
    return{
      ...state,
      prevoper:evaluate(state),
      operation: payload.operation,
      curroper:null,
    }
  case ACTIONS.CLEAR:
    return {}
  case ACTIONS.DELETE_DIGIT:
     if(state.overwrite) {
      return{
        ...state,
        overwrite:false,
        curroper:null
      }
     }
     if(state.curroper == null) return state
     if (state.curroper.length === 1){
      return{...state,curroper: null }
  }
     return{
      ...state,
      curroper: state.curroper.slice(0, -1)
    }
   case ACTIONS.EVALUATE:
      if(state.operation == null || state.curroper == null || state.prevoper == null){
        return state
      }
      return{
        ...state,
        overwrite:true,
        prevoper:null,
        operation:null,
        curroper: evaluate(state),
      }
  }

  }

function evaluate ( {curroper,prevoper, operation}){
  const prev = parseFloat(prevoper)
  const curr = parseFloat(curroper)
  if (isNaN(prev) || isNaN(curr))
    return ""
  let computation = ""
  switch (operation){
    case "+":
      computation = prev + curr
      break
      case "*":
      computation = prev * curr
      break
      case "-":
      computation = prev - curr
      break
      case "÷":
      computation = prev / curr
      break
  }
  return computation.toString()
}
const IGFORMAT = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
})
function formOp(operand){
  if(operand == null) return
  const [integer, decimal]= operand.split('.')
  if (decimal == null)return IGFORMAT.format(integer)
    return`${IGFORMAT.format(integer)}. ${decimal}`
}
  function App() {
    const [{curroper,prevoper, operation}, dispatch] = useReducer(reducer,{})

  return (
    <div className="calculator-grid">
<div className= "output">
  <div className="prevoper">{formOp(prevoper)} {operation}</div>
  <div className="curroper">{formOp(curroper)}</div>
</div>
<button className="spantwo" onClick={()=> dispatch({ type: ACTIONS.CLEAR})}>AC</button>
<button onClick={()=> dispatch({ type: ACTIONS.DELETE_DIGIT})}>DEL</button>
<OperBtn operation="÷" dispatch={dispatch} />
<DIGGI digit="1" dispatch={dispatch} />
<DIGGI digit="2" dispatch={dispatch} />
<DIGGI digit="3" dispatch={dispatch} />
<OperBtn operation="*" dispatch={dispatch} />
<DIGGI digit="4" dispatch={dispatch} />
<DIGGI digit="5" dispatch={dispatch} />
<DIGGI digit="6" dispatch={dispatch} />
<OperBtn operation="+" dispatch={dispatch} />
<DIGGI digit="7" dispatch={dispatch} />
<DIGGI digit="8" dispatch={dispatch} />
<DIGGI digit="9" dispatch={dispatch} />
<OperBtn operation="-" dispatch={dispatch} />
<DIGGI digit="." dispatch={dispatch} />
<DIGGI digit="0" dispatch={dispatch} />
<button className="spantwo" onClick={()=> dispatch({ type: ACTIONS.EVALUATE })}>=</button>


    </div>
  );
}

export default App;
