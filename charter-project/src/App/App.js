import './App.css';
import Customers from '../Customer/Customers.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Rewards</h1>
          <table>

            <tbody>
              <tr>
                <th>Customer</th>
                <th>November</th>
                <th>December</th>
                <th>January</th>
                <th>Total</th>
              </tr>
              <Customers />
            </tbody>
          </table>
      </header>
    </div>
  );
}

export default App;
