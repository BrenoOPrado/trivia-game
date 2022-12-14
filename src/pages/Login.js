import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import logo from '../trivia.png';
import { playGame } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      username: '',
      invalid: true,
    };
  }

  inputRolesValidation = () => {
    const { email, username } = this.state;
    if (
      email.length > 0
      && email.includes('@')
      && email.endsWith('.com')
      && username.length > 0
    ) {
      this.setState({
        invalid: false,
      });
    } else {
      this.setState({
        invalid: true,
      });
    }
  }

  handleInputChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, () => this.inputRolesValidation());
  }

  handleEnter = async () => {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await response.json();
    const token = await data.token;
    await localStorage.setItem('token', token);
    const { history, play } = this.props;
    const { username, email } = this.state;
    play(username, email);
    history.push('/game');
  }

  handleConfigButton = () => {
    const { history } = this.props;
    history.push('/config');
  }

  render() {
    const { email, username, invalid } = this.state;
    return (
      <div className="initial-page">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
        </header>
        <div className="login-page">
          <p>Informe seu nome e email:</p>
          <form>
            <div className="login-inputs">
              <input
                type="text"
                name="username"
                placeholder="Username"
                data-testid="input-player-name"
                value={ username }
                onChange={ (event) => this.handleInputChange(event) }
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                data-testid="input-gravatar-email"
                value={ email }
                onChange={ (event) => this.handleInputChange(event) }
              />
            </div>
            {
              (invalid) ? <p>Por favor preencha corretamente as informa????es</p> : <> </>
            }
            <button
              type="button"
              disabled={ invalid }
              data-testid="btn-play"
              onClick={ () => this.handleEnter(email) }
            >
              Play
            </button>
            <button
              type="button"
              data-testid="btn-settings"
              onClick={ () => this.handleConfigButton() }
            >
              Settings
            </button>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: propTypes.shape({
    push: propTypes.func,
  }).isRequired,
  play: propTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  play: (name, email) => dispatch(playGame(name, email)),
});

export default connect(null, mapDispatchToProps)(Login);
