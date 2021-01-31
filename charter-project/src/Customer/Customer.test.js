import { render, screen } from '@testing-library/react';
import Customers, { calculateMonthlyRewards, reduceCustomerData } from './Customers.js';
// import {calculateMonthlyRewards} from './Customers.js'
import customerData from './MOCK_DATA.json'

test('Customers renders table rows', () => {
  render(
    <table>
        <tbody>
            <Customers />
        </tbody>
    </table>
  );
  const firstCustomer = screen.getByText(/Laura Hart/i);
  expect(firstCustomer).toBeInTheDocument();
});


test('Customers properly condenses data set', () => {
   let data = reduceCustomerData(customerData);
    let names = [];
    data.forEach(customer => {
      if(!names.includes(customer.customer_name)){
        names.push(customer.customer_name);
      }else{
        throw new Error("duplicate names in condensed data");
      }
    });
    expect(data.length).toEqual(100);
});

test('calculateMonthlyRewards returns correct point calculcations', () => {
  let data = reduceCustomerData(customerData);
  //empty array
  let all0PurchaseAmounts = data[0];
  all0PurchaseAmounts.purchase_amount.fill(0);
  expect(calculateMonthlyRewards(all0PurchaseAmounts)).toEqual([0,0,0]);
  // normal
  let normalCustomer = data[1];
  expect(calculateMonthlyRewards(normalCustomer)).toEqual([14,936,0]);
  // on the borders
  let borders100 = data[2];
  borders100.purchase_amount.fill(100);
  let totalBorderRewards = calculateMonthlyRewards(borders100).reduce((a,b) => a + b, 0);
  expect(totalBorderRewards).toEqual(borders100.purchase_amount.length * 50);
  let borders50 = data[3];
  borders50.purchase_amount.fill(50);
  totalBorderRewards = calculateMonthlyRewards(borders50).reduce((a,b) => a + b, 0);
  expect(totalBorderRewards).toEqual(0);
  // pass invalid/weird numbers
  let badNumbers = data[4];
  badNumbers.purchase_amount.fill(0);
  badNumbers.purchase_amount[0] = -1;
  badNumbers.purchase_amount[1] = Math.PI;
  badNumbers.purchase_amount[2] = -9007199254740991;
  badNumbers.purchase_amount[3] = "hello world";
  badNumbers.purchase_amount[4] = null;
  badNumbers.purchase_amount[5] = NaN;
  expect(calculateMonthlyRewards(badNumbers)).toEqual([0,0,0]);
});
