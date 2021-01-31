import './Customers.css';
import customerData from './MOCK_DATA.json'
import React from 'react'

function Customers() {
    
    //condense the data so each customer has 1 entry with all information identified by unique key
    const reducedCustomerData = reduceCustomerData(customerData);

    //calculate monthly rewards for each customer
    reducedCustomerData.forEach(customer => {
        calculateMonthlyRewards(customer);
    });
    
    return (
        <React.Fragment>
            {reducedCustomerData.map(customer =>
                <tr key={customer.key}>
                    <td style={{width:'30%'}}>{customer.customer_name}</td>  
                    <td>{customer.monthly_rewards[0]}</td> 
                    <td>{customer.monthly_rewards[1]}</td>
                    <td>{customer.monthly_rewards[2]}</td>
                    <td>{customer.monthly_rewards.reduce((a,b) => a + b,0)}</td>
                </tr>
                  
            )}
        </React.Fragment>        
    );
}


//taking the floor of the amount before giving rewards points to prevent crediting a customer with an extra point due to cents (ex. spent $120.74, they only get rewards for $120 despite being closer to $121)
//calculating all rewards in one foreach loop per customer, not as clean but much more efficient (alternative being itterating over the arrays 3 times, once for each month)
//exported for easy testing purposes

//PARAMETERS 
//@customer - a javascript object containing a unique key, a string containing customer_name, an array of purchase_amounts, and array of dates 
//ADDS an array of 3 integers to customer object paired with the monthly_rewards key, the first index being the oldest month
export function calculateMonthlyRewards(customer){
    let monthlyRewards = [0,0,0]; 
    let i = 0;
    let dates = customer.date;
    //find the month each transaction occured in and set an index to save the value later
    customer.purchase_amount.forEach(amount =>{
        let month = dates[i].split("/")[0];
        let monthIndex = -1;
        if(month === "11"){
            monthIndex = 0;
        }else if(month === "12"){
            monthIndex = 1;
        }else if(month === "1"){
            monthIndex = 2;
        }

        if(monthIndex !== -1 && !isNaN(amount)){
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
        }
        
    });
    customer.monthly_rewards = (monthlyRewards);
}

//exported for easy testing purposes

//PARAMETERS
//@customerData - an array of javascript objects containing a string containing customer name, an float value as purchase_amount, and a string containing a date in format MM/DD/YYYY
//RETURNS - an array of javascript objects containing a unique key, a string containing customer_name, an array of purchase_amounts, and array of dates 
export function reduceCustomerData(customerData){
    let key = 0;
    let reducedCustomerData = customerData.reduce((acc, {customer_name,purchase_amount,date}) => {
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
    return reducedCustomerData;
}

export default Customers;