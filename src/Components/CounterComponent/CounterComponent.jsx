
import React, {Component} from 'react';
import './CounterComponent.css';
import PropTypes from 'prop-types';

class Counter extends Component{
    
    constructor(){
        super();
        this.state={
            counter : 0
        }

        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        this.reset = this.reset.bind(this);
    }

    render(){
        return (
            <div className="App">
                  {/* <FirstComponent></FirstComponent> */}
                  {/* <FunctionComponent></FunctionComponent> */}
                  <CounterComponent incrementMethod={this.increment} decrementMethod={this.decrement}></CounterComponent>
                  <CounterComponent by ={5} incrementMethod={this.increment} decrementMethod={this.decrement}></CounterComponent>
                  <CounterComponent by ={10} incrementMethod={this.increment} decrementMethod={this.decrement}></CounterComponent>
                  <span className="label1">{this.state.counter}</span>
                  <div><button className="reset" onClick={this.reset}>Reset</button></div>
            </div>
          );
    }

    increment(by){
        //console.log(`increment from child - ${by}`)
        this.setState({
            counter: this.state.counter + by
        })
    }

    decrement(by){
        //console.log(`increment from child - ${by}`)
        this.setState({
            counter: this.state.counter - by
        })
    }

    
    reset(){
        //console.log(`increment from child - ${by}`)
        this.setState({
            counter: 0
        })
    }


}
class CounterComponent extends Component{
    constructor(){
        super();
        this.state={
            counter : 0
        }

        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
    }
    render(){
        return(
            <div>
                {/* <button className="incrementButton" onClick={this.increment}>+{this.props.by}</button> */}
                {/* <button className="incrementButton" onClick={this.decrement}>-{this.props.by}</button> */}
                {/* <span className="label1">{this.state.counter}</span> */}
                <button className="incrementButton" onClick={() => this.props.incrementMethod(this.props.by)}>+{this.props.by}</button>
                <button className="incrementButton" onClick={() => this.props.decrementMethod(this.props.by)}>-{this.props.by}</button>

            </div>
        );        
    }

    increment(){
        this.setState({
            counter: this.state.counter + this.props.by
        });

        this.props.incrementMethod(this.props.by);
    }

    decrement(){
        this.setState({
            counter: this.state.counter - this.props.by
        });

        this.props.decrementMethod(this.props.by);
    }

}

export default Counter;

CounterComponent.defaultProps={
    by : 1
}

CounterComponent.propTypes = {
    by : PropTypes.number
}