// hooks
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
// material-UI components
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';


function UnderstandingFeedback () {
    // set up dispatch to reducers
    const dispatch = useDispatch();
    // useHistory to navigate to other routes
    const history = useHistory();
    // state for tracking changes to TextField
    const [understanding, setUnderstanding] = useState('');
    
    const handleChange = (event) => {
        // update local state with value in TextField
        setUnderstanding(event.target.value);
    }
    // bring in inputValidation module for ensuring rating data meets necessary parameters
    const inputValidation = require('../../modules/inputValidation.js');

    // once understanding data has been validated, dispatch to reducer and navigate to next page
    const understandingToReducer = (rating) => {
        // break out of function if input wasn't validated
        if (!rating) {
            return;
        }
        // send collected form data to feedbackData reducer
        console.log('clicked!');
        dispatch({
            type: 'ADD_UNDERSTANDING',
            payload: rating
        })
        // navigate to SupportedFeedback component after dispatch
        history.push('/supported');
    }

    console.log(understanding);
    return (
        <div>
            <h2>How well did you understand today's material?</h2>
            <p>1: I'm having a lot of trouble with this.</p>
            <p>5: I could teach somebody this material.</p>
            {/* onSubmit, call understandingToReducer to try and dispatch data and move to next page */}
            {/* Pass it through the inputValidation module function first to ensure input is within necessary paramaters */}
            <FormControl onSubmit={() => understandingToReducer(inputValidation(event, understanding))} required>
                <TextField 
                    required
                    label="understanding"
                    defaultValue="required"
                    type="number"
                    id="understanding-field"
                    onChange={handleChange}
                />
                <Button
                    variant="contained"
                    // onClick, call understandingToReducer to try and dispatch data and move to next page, passing it
                    // through the inputValidation module function first to ensure input is within necessary paramaters
                    onClick={() => understandingToReducer(inputValidation(event, understanding))}
                >
                    Next
                </Button>
            </FormControl>

        </div>


    )
}
export default UnderstandingFeedback;