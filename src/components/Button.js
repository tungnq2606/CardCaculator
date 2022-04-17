import {TouchableOpacity} from 'react-native';
import React from 'react';

const Button = ({style, children, onPress}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={style}>
      {children}
    </TouchableOpacity>
  );
};

export default React.memo(Button);
