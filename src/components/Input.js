import React from "react";
import styled from "styled-components/native";
import { Dimensions } from "react-native";
import PropTypes from 'prop-types';




const StyledInput = styled.TextInput.attrs(({theme})=>({
  placeholderTextColor: theme.main,
}))
`
  width: ${({width}) => width - 40}px;
  height: 60px;
  margin: 3px 0;
  padding: 15px 20px;
  border-radius: 10px;
  background-color: ${({theme}) => theme.itemBackground};
  font-size: 25px;
  color: ${({theme}) => theme.text};

`;

const Input = ({placeholder, value, onChangeText, onSubmitEditing,onBlur,clearAll}) => {
  const width = Dimensions.get('window').width;
  // const  width = useWindowDimensions().width;
  return( 
    <StyledInput 
    width={width} 
    placeholder={placeholder}
    maxLength={50}
    value={value}
    onChangeText={onChangeText}
    onSubmitEditing={onSubmitEditing}
    onBlur={onBlur}
    clearAll={clearAll}

  />
  );
};
Input.defaultProps = {
  value:'기본값'
}

Input.PropTypes = {
  placeholder:PropTypes,String,
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onSubmitEditing: PropTypes.func.isRequired,
  onBlur:PropTypes.func.isRequired,
  clearAll:PropTypes.func.isRequired

};

export default Input;