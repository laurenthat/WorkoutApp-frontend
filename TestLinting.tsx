//TestLinting is a test file to check if linting is working correctly before I'm creating the CI/CD pipeline for lint testing.

// import React from "react"  // Missing semicolon, wrong quotes
// import { View, Text } from "react-native"

// export const TestComponent = () => {
//   const unusedVariable = "test"  // Unused variable
//   const name = 'John'            // Mixed quotes

//   return (
//     <View style={{flex: 1}}>     {/* Inline style warning */}
//       <Text>Hello</Text>
//     </View>
//   )                              // Missing semicolon
// }

//This is the code after linting fixes:

import React from 'react'; // Missing semicolon, wrong quotes
import { View, Text } from 'react-native';

export const TestComponent = () => {
  const unusedVariable = 'test'; // Unused variable
  const name = 'John'; //

  return (
    <View style={{ flex: 1 }}>
      {' '}
      {/* Inline style warning */}
      <Text>Hello</Text>
    </View>
  ); // Missing semicolon
};
