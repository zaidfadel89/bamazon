// start with rquiring
var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');
require('console.table');
// connect to mysqlWorkbench
var connection = mysql.createConnection({
  host: 'localhost',

  port: 3306,
  // Your username
  user: 'root',
  // Your password
  password: 'rootroot',
  database: 'bamazon'
});
// to display the errors to see it
var display = function() {
  connection.connect(function(err, res) {
    if (err) throw err;
    viewPrroducts();

    console.log('=======find your product here=======');

    console.log('--------------------------------------');
    console.log('               welcome');
    console.log('--------------------------------------');

    console.log('connected as id ' + connection.threadId);
    displayProd();
  });
};
// bring the all data from mysql
function viewPrroducts() {
  connection.query('SELECT * from Products', function(err, res) {
    if (err) throw err;
    console.table(res);
    askForId(res);
  });
}
// prompt ask user for ID
function askForId(inventory) {
  inquirer
    .prompt([
      {
        name: 'id',
        type: 'input',
        message: 'enter the id of the product you would like to buy'
      }
    ])
    // to make sure ID match with ID_item
    .then(function(answer) {
      var userId = answer.id;
      var product = validateId(userId, inventory);
      if (product) {
        askForqantity(product);
      } else {
        // console invalid if id not match the ID_item
        console.log('invalid id');
        viewPrroducts();
      }
    });
}
// function to ask user how many quantity he want
function askForqantity(product) {
  inquirer
    .prompt([
      {
        name: 'quantiy',
        type: 'input',
        message: 'enter the quantity you would like to buy'
      }
    ])
    // count the quantity and - it from our table
    .then(function(answer) {
      var userQuantity = answer.quantiy;
      if (userQuantity > product.stock_quantit) {
        console.log('insufficient quantity');
      } else {
        makePurchase(product, userQuantity);
      }
    });
}
function makePurchase(product, quantity) {
  connection.query(
    'UPDATE products SET stock_quantit = stock_quantit - ? WHERE id_item = ? ',
    [quantity, product.id_item],
    function(err, res) {
      console.log(
        '\n Successfully purchase ' + quantity + ' ' + product.product_name
      );
      viewPrroducts();
    }
  );
}

function validateId(id, inventory) {
  for (var i = 0; i < inventory.length; i++) {
    if (id == inventory[i].id_item) {
      return inventory[i];
    }
  }
  return null;
}
// display the choices to the user to choose
function displayProd() {
  inquirer
    .prompt([
      {
        type: 'rawlist',
        message: 'what item do you like to buy?',
        choices: [
          'devise',
          'iphones',
          'office',
          'mac',
          'cars',
          'trucks',
          'windows',
          'samsongs',
          'appstores',
          'clothes'
        ],
        name: 'user_department'
      }
    ])
    .then(function(answer) {
      connection.query(
        'SELECT * from products where product_name= ?',

        [answer.user_department],

        function(error, results) {
          if (error) throw error;
          // console results
          console.log('The solution is: ', results);
        }
      );
    });
}
// connection.end();
// call the function
display();
