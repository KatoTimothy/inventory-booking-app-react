import { useReducer } from "react";

//import components
import BookableDetails from "./BookablesDetails";
import BookablesList from "./BookablesList";

//import reducer
import bookablesReducer from "../../reducers/bookables-reducer";

// initial state for reducer
const initialState = {
  group: "Rooms",
  bookableIndex: 1,
  bookables: [],
  isLoading: true,
  error: null,
};

// BookablesView component
const BookablesView = () => {
  const [state, dispatch] = useReducer(bookablesReducer, initialState);

  // get bookables of a particular group
  const bookablesInGroup = state.bookables.filter(
    (b) => b.group === state.group
  );

  //selected bookable
  const bookable = bookablesInGroup[state.bookableIndex];

  return (
    <>
      <BookablesList state={state} dispatch={dispatch} />
      <BookableDetails bookable={bookable} />
    </>
  );
};

export default BookablesView;
