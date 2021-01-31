# Charter Project
- A React app to calculate customers monthly and total rewards points based on the last 3 months.
![Preview](https://photos.app.goo.gl/trKmvQYFj2MjSy2c9)
## Details
- A retailer offers a rewards program to its customers, awarding points based on each recorded purchase.
- A customer recieves 2 points for every dollar spent over $100 in each transaction, plus 1 point for every dollar spent over $50 in each transaction.
- (e.g. a $120 purchase = 2x$20 + 1x$50 = 90 points).
- Given a record of every transaction during a three month period, calculate the reward points earned for each customer per month and total.
## Data
- The data set is a record of 1000 purchases made by 100 different customers, with a random purchase amount between 0-500, and a date within the 3 month time range. Customer name is chosen at random, so some customers make more purchases than others. Data generated from [https://www.mockaroo.com/](https://www.mockaroo.com/)
## Setup
- Clone the repository ```git clone https://github.com/BrianHillis/CharterProject.git```
- Enter the repository ```cd CharterProject```
- Install the dependencies ```npm install```
- Build the project ```npm run build```
- Run the project ```npm run start```
- Access the project at [localhost:3000](http://localhost:3000/)