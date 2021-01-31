import './App.css';
import Customers from '../Customer/Customers.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Rewards</h1>
          <table className='Table-Header'>
            <thead>
              <tr>
                <th style={{width:'30%'}}>Customer</th>
                <th>November</th>
                <th>December</th>
                <th>January</th>
                <th style={{paddingRight:'5px'}}>Total Points</th>
              </tr>
            </thead>
          </table>
        
          <div className="Table-Content">
            <table>
              <tbody>
                <Customers />
              </tbody>
            </table>
          </div>
        </header> 
    </div>
  );
}

export default App;
