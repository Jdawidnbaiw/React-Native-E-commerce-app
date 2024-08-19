import React from 'react';
import StackNavigator from './screens/StackNavigator';
import { ModalPortal } from 'react-native-modals';
import { UserContext } from './UserContext';
//export type 





export default function App() {
  return (
    <>
      <UserContext>
        <StackNavigator />
        <ModalPortal />
      </UserContext>

    </>
  );
};
