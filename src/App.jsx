import { useState, useReducer } from "react";
import logo from "./logo.svg";
import "./App.css";

//Const Actions object used throught out
const ACTION = {
  AC: "AC",
  DELETE: "DEL",
  EQUAL: "EQUAL",
  OPERATOR: "OPERATOR",
  OPERAND: "NUM",
  ERROR: "MATH ERROR",
};

//Dispatcher Function changing the state
function reducer(state, action) {
  //Swicth Case to handle different types of clicks
  switch (action.action) {
    case ACTION.OPERAND:
      //If overwrite is allowed
      if (state.overwrite) {
        return {
          ...state,
          operator: null,
          currentOperand: action.digit,
          prevOperand: null,
          overwrite: false,
        };
      }
      //First Digit
      if (state.currentOperand == null) {
        return {
          ...state,
          currentOperand: action.digit === "0" ? null : action.digit,
        };
      }
      //Other Than First Digit
      else {
        //handling Decimal over here
        if (action.digit === ".") {
          return {
            ...state,
            currentOperand: state.currentOperand.includes(".")
              ? state.currentOperand
              : state.currentOperand == null
              ? action.digit
              : state.currentOperand + action.digit,
          };
        }


        return {
          ...state,
          currentOperand:
            (state.currentOperand.length > 10)
              ? state.currentOperand
              : state.currentOperand + action.digit,
        };
      }

    //Operator Handling
    case ACTION.OPERATOR:
      //handling - or -ve numbers
      if (action.digit === "-" && state.currentOperand == null) {
        return {
          ...state,
          currentOperand: action.digit,
        };
      }
      //handling Edge cases
      else if (
        state.currentOperand === "." ||
        state.currentOperand === "-." ||
        state.currentOperand === "-"
      ) {
        return state;
      } else if (state.operator != null && state.currentOperand == null) {
        return {
          ...state,
          operator: action.digit,
        };
      }
      //When Nothing is there on the Screen
      else if (state.currentOperand == null) {
        return state;
      }
      //Else Pushing the currentOperand to prev and setting the state
      else {
        let result =
          state.prevOperand == null ? state.currentOperand : evaluate(state);

        return {
          ...state,
          prevOperand: result === ACTION.ERROR ? null : result,
          currentOperand: result === ACTION.ERROR ? ACTION.ERROR : null,
          operator: action.digit,
          overwrite: result === ACTION.ERROR ? true : false,
        };
      }

    //Simple CLear All
    case ACTION.AC:
      return {
        ...state,
        operator: null,
        currentOperand: null,
        prevOperand: null,
      };

    //Simple equal Function
    case ACTION.EQUAL:
      //If there is nothing in the screen
      if (state.currentOperand == null || state.prevOperand == null) {
        return state;
      } else {
        let result =
          state.prevOperand == null ? state.currentOperand : evaluate(state);

        return {
          ...state,
          prevOperand: null,
          currentOperand: result === ACTION.ERROR ? ACTION.ERROR : result,
          operator: null,
          overwrite: true,
        };
      }

    //Simple Delete by slicing
    case ACTION.DELETE:
      if (state.currentOperand == null) {
        return state;
      }
      let del = state.currentOperand.slice(0, state.currentOperand.length - 1);
      return {
        ...state,
        currentOperand: del.length === 0 ? null : del,
      };
  }
  return state;
}

//A function to perform Calculations and return it
const evaluate = ({ prevOperand, operator, currentOperand }) => {
  let calc;
  switch (operator) {
    case "+":
      calc = parseFloat(prevOperand) + parseFloat(currentOperand);

      break;
    case "-":
      calc = parseFloat(prevOperand) - parseFloat(currentOperand);

      break;
    case "*":
      calc = parseFloat(prevOperand) * parseFloat(currentOperand);

      break;
    case "/":
      calc =
        parseFloat(currentOperand) === 0
          ? ACTION.ERROR
          : parseFloat(prevOperand) / parseFloat(currentOperand);

      break;
  }
  return String(calc);
};
function App() {
  const [{ prevOperand, operator, currentOperand }, dispatch] = useReducer(
    reducer,
    {}
  );

  return (
    <div className="App">
      <div className="calculator">
        <div className="display">
          <div className="upperDisplay">
            {prevOperand == null ? "0" : prevOperand}
            {operator}
          </div>
          <div className="MainDisplay">
            {currentOperand == null ? "0" : currentOperand}
          </div>
        </div>
        <div className="pad">
          <span
            className="digit span-2"
            onClick={(e) =>
              dispatch({
                digit: e.target.innerHTML,
                action: ACTION.AC,
              })
            }
          >
            AC
          </span>
          <span
            className="digit"
            onClick={(e) =>
              dispatch({
                digit: e.target.innerHTML,
                action: ACTION.DELETE,
              })
            }
          >
            DEL
          </span>
          <span
            className="digit"
            onClick={(e) =>
              dispatch({
                digit: e.target.innerHTML,
                action: ACTION.OPERATOR,
              })
            }
          >
            /
          </span>
          <span
            className="digit"
            onClick={(e) =>
              dispatch({
                digit: e.target.innerHTML,
                action: ACTION.OPERAND,
              })
            }
          >
            1
          </span>
          <span
            className="digit"
            onClick={(e) =>
              dispatch({
                digit: e.target.innerHTML,
                action: ACTION.OPERAND,
              })
            }
          >
            2
          </span>
          <span
            className="digit"
            onClick={(e) =>
              dispatch({
                digit: e.target.innerHTML,
                action: ACTION.OPERAND,
              })
            }
          >
            3
          </span>
          <span
            className="digit"
            onClick={(e) =>
              dispatch({
                digit: e.target.innerHTML,
                action: ACTION.OPERATOR,
              })
            }
          >
            *
          </span>
          <span
            className="digit"
            onClick={(e) =>
              dispatch({
                digit: e.target.innerHTML,
                action: ACTION.OPERAND,
              })
            }
          >
            4
          </span>
          <span
            className="digit"
            onClick={(e) =>
              dispatch({
                digit: e.target.innerHTML,
                action: ACTION.OPERAND,
              })
            }
          >
            5
          </span>
          <span
            className="digit"
            onClick={(e) =>
              dispatch({
                digit: e.target.innerHTML,
                action: ACTION.OPERAND,
              })
            }
          >
            6
          </span>
          <span
            className="digit"
            onClick={(e) =>
              dispatch({
                digit: e.target.innerHTML,
                action: ACTION.OPERATOR,
              })
            }
          >
            +
          </span>
          <span
            className="digit"
            onClick={(e) =>
              dispatch({
                digit: e.target.innerHTML,
                action: ACTION.OPERAND,
              })
            }
          >
            7
          </span>
          <span
            className="digit"
            onClick={(e) =>
              dispatch({
                digit: e.target.innerHTML,
                action: ACTION.OPERAND,
              })
            }
          >
            8
          </span>
          <span
            className="digit"
            onClick={(e) =>
              dispatch({
                digit: e.target.innerHTML,
                action: ACTION.OPERAND,
              })
            }
          >
            9
          </span>
          <span
            className="digit"
            onClick={(e) =>
              dispatch({
                digit: e.target.innerHTML,
                action: ACTION.OPERATOR,
              })
            }
          >
            -
          </span>
          <span
            className="digit"
            onClick={(e) =>
              dispatch({
                digit: e.target.innerHTML,
                action: ACTION.OPERAND,
              })
            }
          >
            .
          </span>
          <span
            className="digit"
            onClick={(e) =>
              dispatch({
                digit: e.target.innerHTML,
                action: ACTION.OPERAND,
              })
            }
          >
            0
          </span>
          <span
            className="digit span-2"
            onClick={(e) =>
              dispatch({
                digit: e.target.innerHTML,
                action: ACTION.EQUAL,
              })
            }
          >
            =
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;

//   const del = () => {
//   let newVal = mainDisplayValue.slice(0, mainDisplayValue.length - 1);
//   setMainDisplayValue(newVal.length === 0 ? "0" : newVal);
// };
