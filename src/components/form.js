import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Form = props => {
const [username, setUsername] = useState('')
const [password, setPassword] = useState('')
const [name, setName] = useState('')
const [alias, setAlias] = useState('')

const handleChangeUserName = event => {
setUsername(event.target.value)
}

const handleChangePassword = event => {
setPassword(event.target.value)
}

const handleChangeName = event => {
setName(event.target.value)
}

const handleChangeAlias = event => {
setAlias(event.target.value)
}

const linkInfo = props.isLogin
? { linkText: 'Do not have an account? Sign up!', link: 'register' }
: { linkText: 'Already have an account? Login here!', link: 'login' }

const handleSubmit = async (e) => {
e.preventDefault();
let formData = new FormData();
formData.append("username", username);
formData.append("password", password);
formData.append("name", name);
formData.append("alias", alias);
try {
const response = await fetch("https://hook.us1.make.com/xmmjs1h25b5uv16bxp1xori639ud9683", {
method: "POST",
body: formData
});
if (!response.ok) {
throw new Error(response.status);
}
const json = await response.json();
if (json.status === 'error') {
console.log(json.message);
} else {
console.log(json.message);
// perform successful login or signup actions
}
} catch (error) {
console.log(error);
}
};
  return (
    <React.Fragment>
      <div className="account-form-container"><div class="BeOpWidget" data-content="62746a7132644a69df124ff2"></div>

      <form className="account-form" onSubmit={handleSubmit}>
          {props.isLogin ? null : renderInputField('Company', name, 'text', e => handleChangeName(e))}
          {props.isLogin ? null : renderInputField('Username', alias, 'text', e => handleChangeAlias(e))}
          {renderInputField('Email', username, 'text', e => handleChangeUserName(e), 'username')}
          {renderInputField('Password', password, 'password', e => handleChangePassword(e), 'current-password')}
          <div className="input-row align-right">
            <Link to={linkInfo.link}> {linkInfo.linkText}</Link>
            <button className={props.isLogin ? 'login' : 'register'}> {props.isLogin ? 'Login' : 'Create Account'} </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  )
}

const renderInputField = (name, value, type, fun, autocomplete) => {
  const lowerCaseName = name.toLowerCase()
  return (
    <div className="input-row">
      <label htmlFor="{lowerCaseName}" className="input-row-column">
        {name}
      </label>
      <input
        className="input-row-column"
        value={value}
        onChange={fun}
        type={type}
        id={lowerCaseName}
        name={lowerCaseName}
        autoComplete={autocomplete}
      />
 </div>
  )
}

Form.propTypes = {
  isLogin: PropTypes.bool,
  handleSubmit: PropTypes.func
}

export default Form
