import React from 'react';
import Routes from './src/router';
import store from './src/store';
import {NavigationContainer} from '@react-navigation/native';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';

import {Provider} from 'react-redux';
import {PaperProvider} from 'react-native-paper';

function App(): JSX.Element {
  return (
    <PaperProvider>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <Provider store={store}>
          <NavigationContainer>
            <Routes />
          </NavigationContainer>
        </Provider>
      </SafeAreaProvider>
    </PaperProvider>
  );
}

export default App;
