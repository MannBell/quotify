import stripFB from "../../myPlugins/functions/stripFB";

const initState = {
  createQuoteSuccess: false
  , createQuoteErr: ""
};

const authReducer = (state=initState, action) => {
  switch(action.type) {
    case "CREATE_QUOTE_STATUS_RESET"
    : {
      return ({ ...state, createQuoteSuccess: false });
    }
    case "CREATE_QUOTE_SUCCESS"
    : {
      return ({ ...state, createQuoteSuccess: true, createQuoteErr: "" });
    }
    case "CREATE_QUOTE_ERROR"
    : {
      return ({ ...state, createQuoteErr: stripFB(action.err.message) });
    }
    case "CLEAR_CREATE_QUOTE_ERROR"
    : {
      return ({ ...state, createQuoteErr: "" });
    }
    default
    : return state;
  }
}

export default authReducer;