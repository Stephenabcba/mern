import React, { useReducer } from "react";

const initialState = {
    firstName: {
        value: '',
        error: null
    },
    lastName: {
        value: '',
        error: null
    },
    email: {
        value: '',
        error: null
    }
}

function reducer(state, action) {
    return {
        ...state,
        [action.type]: action.payload
    }
}



export default () => {
    const [state, dispatch] = useReducer(reducer, initialState)

    function validateEmail(mail) {
        const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (mail.match(mailFormat)) {
            return (true)
        }
        return (false)
    }

    const validator = {
        firstName: (value) => (value.length > 0 && value.length < 2) ? "First Name must be at least 2 characters" : null,
        lastName: (value) => (value.length > 0 && value.length < 2) ? "Last Name must be at least 2 characters" : null,
        email: (value) => (!validateEmail(value)) ? "Email must be in valid format" : null
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        const error = validator[name](value)
        dispatch({
            type: name,
            payload: { value: value, error: error }
        })
    }



    return (
        <>
            <form onSubmit={(e) => e.preventDefault()}>
                {state.firstName.error !== null && <p className="errorMessage">{state.firstName.error}</p>}
                <div>
                    <label>
                        <span>First Name:</span>
                        <input type="text" name="firstName" value={state.firstName.value} onChange={handleChange} />
                    </label>
                </div>
                {state.lastName.error !== null && <p className="errorMessage">{state.lastName.error}</p>}
                <div>
                    <label>
                        <span>Last Name:</span>
                        <input type="text" name="lastName" value={state.lastName.value} onChange={handleChange} />
                    </label>
                </div>
                {state.email.error !== null && <p className="errorMessage">{state.email.error}</p>}
                <div>
                    <label>
                        <span>Email:</span>
                        <input type="text" name="email" value={state.email.value} onChange={handleChange} />
                    </label>
                </div>
            </form>
        </>
    )
}