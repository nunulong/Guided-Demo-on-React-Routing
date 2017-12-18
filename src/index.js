import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import './index.css';

class Home extends React.Component {
  state= {
    name: ''
  }

  handleInputChange = (event) => {
    this.setState({ name: event.target.value });
  }

  greet = (event) => {
    event.preventDefault();
    this.props.history.push(`/greet/${this.state.name}`);
  }

  render() {
    return (
      <div className="card">
        <h1>Home Component</h1>
        <form onSubmit={this.greet}>
          <input 
            type="text"
            placeholder="Who do you want to greet?"
            value={this.state.name}
            onChange={this.handleInputChange}
          />
          <button type="submit">Greet!</button>
        </form>
      </div>
    );
  }
}

const Greeter = (props) => {
  console.log('Greeter.props', props);
  return (
    <div className="greeter">
      <h1>Hello {props.match.params.name}</h1>
    </div>
  );
}

const About = (props) => {
  console.log('About.props', props);
  setTimeout(()=>{ props.history.push('/'); }, 3000);
  return (
    <div className="card about">
      <h1>About Component</h1>
    </div>
  );
};

const Header = () => (
  <div className="card centered">
    <h1>Header Component</h1>
    <NavLink to="/" className="link" activeClassName="link--active" exact>Home</NavLink> 
    <NavLink to="/about" className="link" activeClassName="link--active">About</NavLink>
  </div>
);

ReactDom.render(
  <Router>
    <div>
      <Header />
      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About} />
      <Route path="/greet/:name" component={Greeter} />
    </div>
  </Router>,
  document.getElementById("root"));