import './Customers.css';
import customerData from './MOCK_DATA.json'
import React from 'react'

function Customers() {
    var key = 0;
    //condense the data so each customer has 1 entry with all information identified by unique key
    const reducedCustomerData = customerData.reduce((acc, {customer_name,purchase_amount,date}) => {
        const existing = acc.find(i => i.customer_name === customer_name);
        if(existing) {
            existing.purchase_amount.push(purchase_amount);
            existing.date.push(date);
        }else{
            acc.push({key,customer_name,purchase_amount: [purchase_amount],date: [date]})
            key++;
        }
        return acc;
    }, [])


    var rewards = [];
    var totalRewards = [];
    //calculate monthly and total rewards for each customer
    reducedCustomerData.forEach(customer => {
        rewards[customer.key] = calculateMonthlyRewards(customer);
        totalRewards[customer.key] = rewards[customer.key].reduce((a,b) => a + b, 0);
    });
    
    return (
        <React.Fragment>
            {reducedCustomerData.map(customer =>
                <tr>
                    <td className="customerColumn">{customer.customer_name}</td>  
                    <td className="novemberColumn">{rewards[customer.key][0]}</td> 
                    <td className="decemberColumn">{rewards[customer.key][1]}</td>
                    <td className="januaryColumn">{rewards[customer.key][2]}</td>
                    <td className="totalColumn">{totalRewards[customer.key]}</td>
                </tr>
                  
            )}
        </React.Fragment>        
    );
}

//taking the floor of the amount before giving rewards points to prevent crediting a customer with an extra point due to cents (ex. spent $120.74, they only get rewards for $120 despite being closer to $121)
//calculating all rewards in one foreach loop per customer entry, not as clean but much more efficient (alternative being itterating over the arrays 3 times, once for each month)
function calculateMonthlyRewards(customer){
    var monthlyRewards = [0,0,0]; //
    var i = 0;
    var dates = customer.date;
    //find the month each transaction occured in and set an index to save the value later
    customer.purchase_amount.forEach(amount =>{
        var month = dates[i].split("/")[0];
        var monthIndex;
        if(month === "11"){
            monthIndex = 0;
        }else if(month === "12"){
            monthIndex = 1;
        }else{
            monthIndex = 2;
        }

        //calculate rewards for each transaction and save them in the array based on the month they occured in 
        if(amount <= 50){
            //no op
        }else if(amount > 50 && amount <= 100){
            monthlyRewards[monthIndex] += Math.floor(amount - 50);
        }else{
            monthlyRewards[monthIndex] += Math.floor(amount - 50);
            monthlyRewards[monthIndex] += 50;  //all amounts > 100 get 50 points from 51-100 range
        }
        i++; //increment itterator to check dates for monthly rewards
    });
    return monthlyRewards;
}

export default Customers;