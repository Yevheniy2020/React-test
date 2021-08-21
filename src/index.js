import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/';
import reportWebVitals from './reportWebVitals';

//test with component properties and states 

class WhoAmI extends Component{

  constructor(props){
    super(props) //call constructor Component (parent)

    this.state = {
      years: 20
    } //for dinamic changes 

    this.nextYear = this.nextYear.bind(this);
    

    //   //this.state.years++; misstake
  
  }

  nextYear(){

    //this.state.years++; misstake


    this.setState(state =>({years: ++state.years})) //change our obj (for dinamic changes)
    //or

    // this.setState(state => {
    //   return  ({years: ++state.years})
    // }) 
  }

  render(){
    const {name, surname, link} = this.props;
    const {years} = this.state; 
    return(
      <>
        <button onClick={this.nextYear}>Click</button>
        <h1>My name is {name}, surname - {surname} ,years = {years} </h1>
        <a href = {link}>My profile</a>
      </>
    )
  } //as return

}

const All= () =>{
  return(
    <>
    <WhoAmI name = 'Yevheniy' surname = "Mynenko" link = 'facebook.com '/>
    <WhoAmI name = 'Yevheniy' surname = "Mynenko" link = 'facebook.com '/>
    <WhoAmI name = 'Yevheniy' surname = "Mynenko" link = 'facebook.com '/>
    </>
  )
}


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
