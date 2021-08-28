import {createStore} from 'redux';

const initialStore = {
  loading: false,
};

const reduce = (state, action) => {
  if (!state) state = initialStore;
  
  if (action.type == 'SET_LOADING') {
    return {
      ...state,
      loading: action.value,
    };
  }

  return state;
};

const store = createStore(reduce);

export default store;
