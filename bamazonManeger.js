require('console.table');
var mysql = require('mysql');
var inquirer = require('inquirer');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rootroot',
  database: 'bamazon',
  port: 3306
});
connection.connect();

function displayProducts() {
  connection.query('SELECT * FROM products', function(error, results) {
    if (error) throw error;
    console.log('');
    console.log('');
    console.log('');
  });
}
displayProducts();
function askForqantity(product) {
  inquirer
    .prompt([
      {
        name: 'quantiy',
        type: 'input',
        message: 'enter the quantity you would like to buy'
      }
    ])
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
