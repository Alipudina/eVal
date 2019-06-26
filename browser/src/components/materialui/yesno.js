import React, { Component } from 'react';
import { connect } from 'react-redux';
import {rightAnswerTextChange} from '../../redux';


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
      <div className="yesNoContainer">
        <div className="form-check">
            <input
              class="form-check-input"
              id="yes"
              type="radio"
              name="yesno"
              value="yes"
              onChange={this.props.rightAnswerTextChange}
            />
          <label class="form-check-label" for="yes">Yes</label>
          </div>

          <div className="form-check">
            <input
              class="form-check-input"
              id="no"
              type="radio"
              name="yesno"
              value="no"
              onChange={this.props.rightAnswerTextChange}
            />
          <label class="form-check-label" for="no">No</label>
        </div>
      </div>
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
    rightAnswerTextChange: ev=>dispatch(rightAnswerTextChange(ev)),
  }
}
export const YesNoAnswerContainer = connect(mapStateToProps, mapDispatchToProps)(YesNoAnswer);
