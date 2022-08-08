import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      teste: '',
      questions: '',
      classWrongOptions: 'options',
      classCorrectOption: 'options',
    };
  }

  componentDidMount() {
    const tokenGame = localStorage.getItem('token');
    this.getQuestions(tokenGame);
  }

  handleClickAnswer = () => {
    this.setState({
      classCorrectOption: 'correct-option',
      classWrongOptions: 'wrong-options',
    });
  }

    getQuestions = async (token) => {
      const request = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
      const requestJson = await request.json();
      console.log(requestJson);
      this.setState({
        questions: requestJson.results,
        teste: requestJson,
      });
      return requestJson;
    };

    render() {
      const { teste, questions, classWrongOptions, classCorrectOption } = this.state;
      const number3 = 3;
      const number05 = 0.5;

      if (teste.response_code === number3) {
        return <Redirect to="/" />;
      }
      if (questions.length !== 0) {
        const array = questions[0].incorrect_answers.concat(questions[0].correct_answer);
        return (
          <div>
            <div key={ questions[0].index } className="card_question">
              <p data-testid="question-category">{ questions[0].category }</p>
              <p data-testid="question-text">{ questions[0].question }</p>
              <div data-testid="answer-options">
                {
                  array.sort(() => number05 - Math.random()).map((element) => (
                    element === questions[0].correct_answer
                      ? (
                        <button
                          type="button"
                          name="correct-answer"
                          data-testid="correct-answer"
                          className={ classCorrectOption }
                          onClick={ () => this.handleClickAnswer() }
                        >
                          { element }
                        </button>)
                      : (
                        <button
                          type="button"
                          key={ element.index }
                          name="wrong-answer"
                          data-testid="wrong-answer"
                          className={ classWrongOptions }
                          onClick={ () => this.handleClickAnswer() }
                        >
                          { element }
                        </button>)))
                }
              </div>
            </div>
          </div>);
      }
      return (<div />);
    }
}

export default Questions;