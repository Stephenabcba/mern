import React, { useState } from 'react';

const HookForm = (props) => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confPassword, setConfPassword] = useState("")
    const processForm = () => "form processed"
    return (
        <>
            <form onSubmit={processForm} class="form">
                <div className="border p-3 mx-5 bg-light mb-3 rounded d-flex align-items-center" >
                    <label htmlFor="firstName" className="form-label col-1">First Name</label>
                    <input type="text" name="firstName" id="firstName" onChange={e => setFirstName(e.target.value)} className="form-control" />
                </div>
                <div className="border p-3 mx-5 bg-light mb-3 rounded d-flex align-items-center">
                    <label htmlFor="lastName" className="form-label col-1">Last Name</label>
                    <input type="text" name="lastName" id="lastName" onChange={e => setLastName(e.target.value)} className="form-control" />
                </div>
                <div className="border p-3 mx-5 bg-light mb-3 rounded d-flex align-items-center">
                    <label htmlFor="email" className="form-label col-1">Email</label>
                    <input type="text" name="email" id="email" onChange={e => setEmail(e.target.value)} className="form-control" />
                </div>
                <div className="border p-3 mx-5 bg-light mb-3 rounded d-flex align-items-center">
                    <label htmlFor="password" className="form-label col-1">Password</label>
                    <input type="password" name="password" id="password" onChange={e => setPassword(e.target.value)} className="form-control" />
                </div>
                <div className="border p-3 mx-5 bg-light mb-3 rounded d-flex align-items-center">
                    <label htmlFor="confPassword" className="form-label col-1">Confirm Password</label>
                    <input type="password" name="confPassword" id="confPassword" onChange={e => setConfPassword(e.target.value)} className="form-control" />
                </div>
            </form>
            <table>
                <tbody>
                    <tr>
                        <td>First Name</td>
                        <td>{firstName} </td>
                    </tr>
                    <tr>
                        <td>Last Name</td>
                        <td>{lastName} </td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>{email} </td>
                    </tr>
                    <tr>
                        <td>Password</td>
                        <td>{password} </td>
                    </tr>
                    <tr>
                        <td>Confirm Password</td>
                        <td>{confPassword} </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default HookForm;