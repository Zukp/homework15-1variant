import React, { useState, useEffect, useReducer } from 'react';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
//debouncing, debounce
const emailReducer = (prevState, action) => {
 
  if (action.type === 'USER_INPUT') {
    return {
      ...prevState,
      value: action.emailValue,
    };
  }
  if (action.type === 'INPUT_BLUR') {
    return {
      ...prevState,
      isValid: prevState.value.includes('@'),
    };
  }
 
  return {
    value: '',
    isValid: false,
   
  };
  
};

const reducerPassword = (prevState,action) => {
  
  if(action.type === 'USER_INPUTT'){
    return {
      ...prevState,
      valuePass:action.passValue,
    }
  }
  if(action.type === 'USER_BLURR'){
    return {
      ...prevState,
      isPassword:prevState.valuePass.trim().length > 6,
    }
  };
  return {
    valuePass:'',
    isPassword:'',
  };

}


const Login = (props) => {

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    isValid: undefined,
    value: '',
    
  });

  const [password,dipspatchPassword] = useReducer(reducerPassword, {
    valuePass:'',
    isPassword:'',
  })

  const [formIsValid, setFormIsValid] = useState(false); 

  useEffect(() => {
    const timer = setTimeout(() => {
      setFormIsValid(emailState.value.includes('@') && password.valuePass.trim().length > 6);
    }, 3000);
    // clean up function
    return () => {
      clearTimeout(timer);
    };
  }, [emailState.value, password.valuePass]);
  const emailChangeHandler = (event) => {
    
    dispatchEmail({ type: 'USER_INPUT', emailValue: event.target.value });
  };
  const passwordChangeHandler = (event) => {
    dipspatchPassword({type:'USER_INPUTT',passValue:event.target.value})
  };
  const validateEmailHandler = () => {
    dispatchEmail({ type: 'INPUT_BLUR' });
  };
  const validatePasswordHandler = () => {
    dipspatchPassword({type:'USER_BLURR'})
  };
  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value,password.valuePass);
  };
  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${emailState.isValid === false ? classes.invalid : ''}`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div className={`${classes.control} ${password.isPassword === false ? classes.invalid : ''}`}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password.valuePass}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};
export default Login;