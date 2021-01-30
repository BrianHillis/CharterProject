import './App.css';
import Customers from '../Customer/Customers.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Rewards</h1>
          <table>
            <th>Customer</th>
            <th>November</th>
            <th>December</th>
            <th>January</th>
            <th>Total</th>
            <Customers />
          </table>
      </header>
    </div>
  );
}

export default App;
