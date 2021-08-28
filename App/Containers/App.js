import React from 'react';
import {Provider} from 'react-redux';
import AppNavigation from '../Navigation';
import store from '../Redux/create_store';

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
};

export default App;
