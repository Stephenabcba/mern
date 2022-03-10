import React, { useState } from 'react';

const MoreForm = (props) => {
    const [firstName, setFirstName] = useState("")
    const [firstNameError, setFirstNameError] = useState("")
    const [lastName, setLastName] = useState("")
    const [lastNameError, setLastNameError] = useState("")
    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState("")
    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [confPassword, setConfPassword] = useState("")
    const [confPasswordError, setConfPasswordError] = useState("")
    const [passwordMatchError, setPasswordMatchError] = useState("")

    const processForm = (e) => {
        e.preventDefault()
        console.log("form processed")
        const user = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        }
        console.log("welcome", user)
        setFirstName("")
        setFirstNameError("")
        setLastName("")
        setLastNameError("")
        setEmail("")
        setEmailError("")
        setPassword("")
        setPasswordError("")
        setConfPassword("")
        setConfPasswordError("")
        setPasswordMatchError("")
    }

    const handleFirstName = (e) => {
        setFirstName(e.target.value)
        if (e.target.value.length > 0 && e.target.value.length < 2) {
            setFirstNameError("First Name must be at least 2 characters")
        } else {
            setFirstNameError("")
        }
    }

    const handleLastName = (e) => {
        setLastName(e.target.value)
        if (e.target.value.length > 0 && e.target.value.length < 2) {
            setLastNameError("Last Name must be at least 2 characters")
        } else {
            setLastNameError("")
        }
    }

    const handleEmail = (e) => {
        setEmail(e.target.value)
        if (e.target.value.length > 0 && e.target.value.length < 5) {
            setEmailError("Email must be at least 5 characters")
        } else {
            setEmailError("")
        }
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
        if (e.target.value.length > 0 && e.target.value.length < 8) {
            setPasswordError("Password must be at least 8 characters")
        } else {
            setPasswordError("")
        }
    }

    const handleConfPassword = (e) => {
        setConfPassword(e.target.value)
        if (e.target.value.length > 0 && e.target.value.length < 8) {
            setConfPasswordError("Confirm Password must be at least 8 characters")
        } else {
            setConfPasswordError("")
        }
        if (e.target.value.length > 0 && password != e.target.value) {
            setPasswordMatchError("Passwords must match")
        } else {
            setPasswordMatchError("")
        }

    }


    return (
        <>
            <form onSubmit={processForm} className="form">
                <div className="border p-3 mx-5 bg-light mb-3 rounded d-flex align-items-center" >
                    <label htmlFor="firstName" className="form-label col-1">First Name</label>
                    <input type="text" name="firstName" id="firstName" value={firstName} onChange={handleFirstName} className="form-control" />
                </div>
                {
                    firstNameError ?
                        <p className="mx-5">{firstNameError} </p>
                        : ""
                }
                <div className="border p-3 mx-5 bg-light mb-3 rounded d-flex align-items-center">
                    <label htmlFor="lastName" className="form-label col-1">Last Name</label>
                    <input type="text" name="lastName" id="lastName" value={lastName} onChange={handleLastName} className="form-control" />
                </div>
                {
                    lastNameError ?
                        <p className="mx-5">{lastNameError} </p>
                        : ""
                }
                <div className="border p-3 mx-5 bg-light mb-3 rounded d-flex align-items-center">
                    <label htmlFor="email" className="form-label col-1">Email</label>
                    <input type="text" name="email" id="email" value={email} onChange={handleEmail} className="form-control" />
                </div>
                {
                    emailError ?
                        <p className="mx-5">{emailError} </p>
                        : ""
                }
                <div className="border p-3 mx-5 bg-light mb-3 rounded d-flex align-items-center">
                    <label htmlFor="password" className="form-label col-1">Password</label>
                    <input type="password" name="password" id="password" value={password} onChange={handlePassword} className="form-control" />
                </div>
                {
                    passwordError ?
                        <p className="mx-5">{passwordError} </p>
                        : ""
                }
                <div className="border p-3 mx-5 bg-light mb-3 rounded d-flex align-items-center">
                    <label htmlFor="confPassword" className="form-label col-1">Confirm Password</label>
                    <input type="password" name="confPassword" id="confPassword" value={confPassword} onChange={handleConfPassword} className="form-control" />
                </div>
                {
                    confPasswordError ?
                        <p className="mx-5">{confPasswordError} </p>
                        : ""
                }
                {
                    passwordMatchError ?
                        <p className="mx-5">{passwordMatchError} </p>
                        : ""
                }
                <button>Submit</button>
            </form>
        </>
    )
}

export default MoreForm;