
import './App.css';
import './bootstrap.css'

//import FirstComponent from './Components/FirstComponent/FirstCOmponent';
//import FunctionComponent from './Components/FunctionComponent/FunctionComponent';
//import Counter from './Components/CounterComponent/CounterComponent';
import TodoComponent from './Components/TodoComponent/TodoComponent';

function App() {
  return (
    <div className="App">
          {/* <Counter></Counter> */}
          <TodoComponent/>
    </div>
  );
}

export default App;
