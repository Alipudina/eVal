import React, { Component } from 'react';
import { connect } from 'react-redux';
import {rightQuestionTextChange} from '../../redux';


// import { makeStyles } from '@material-ui/core/styles';
// import Radio from '@material-ui/core/Radio';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormControl from '@material-ui/core/FormControl';
// import FormLabel from '@material-ui/core/FormLabel';



class YesNoAnswer extends Component{
  render(){
    return(
      <>
        <br></br>
        <div className="questionType">
          <label>
            <input
              type="radio"
              name="yesno"
              value="yes"
              onChange={this.props.rightQuestionTextChange}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="yesno"
              value="no"
              onChange={this.props.rightQuestionTextChange}
            />
            No
          </label>
        </div>
      </>
    )
  }
}

// <RadioButtonsGroup/>

// const useStyles = makeStyles(theme => ({
//   root: {
//     display: 'flex',
//     justifyContent: 'center'
//   },
//   formControl: {
//     margin: theme.spacing(3),
//   },
//   group: {
//     margin: theme.spacing(1, 0),
//   },
// }));
//
//  function RadioButtonsGroup() {
//   const classes = useStyles();
//   const [value, setValue] = React.useState('yes');
//
//   function handleChange(event) {
//     setValue(event.target.value);
//   }
//
//   return (
//     <div className={classes.root} >
//       <FormControl component="fieldset" className={classes.formControl}>
//         <RadioGroup
//           aria-label="YesNo"
//           name="YesNo"
//           className={classes.group}
//           value={value}
//           onChange={handleChange}
//           row={true}
//         >
//           <FormControlLabel value="yes" control={<Radio />} label="Yes"/>
//           <FormControlLabel value="no" control={<Radio />} label="No"/>
//         </RadioGroup>
//       </FormControl>
//     </div>
//   );
// }
//
// export default YesNoAnswer;
const mapStateToProps = state =>{
  return{
    rightAnswer:state.rightAnswer
  }
}

const mapDispatchToProps = dispatch=>{
  return{
    rightQuestionTextChange: ev=>dispatch(rightQuestionTextChange(ev)),
  }
}
export const YesNoAnswerContainer = connect(mapStateToProps, mapDispatchToProps)(YesNoAnswer);
