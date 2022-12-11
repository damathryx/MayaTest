const port = 3000;
const express = require("express");
const sdk = require("paymaya-node-sdk");
const app = express();

var PaymayaSDK = sdk.PaymayaSDK;

// NOT WORKING PRIVATE SANDBOX KEYS
PaymayaSDK.initCheckout(
  'pk-Kr2kOOn93yILays4ubs5T5uXt9pkl5szwjvtmsSehAU',
  'sk-AyUmNRStgxPp8Xg8EMhrW8lge8bHiztrnZj2mQ7gzEs',
  PaymayaSDK.ENVIRONMENT.SANDBOX
);

// WORKING PUBLIC SANDBOX KEYS
// PaymayaSDK.initCheckout(
//     'pk-Z0OSzLvIcOI2UIvDhdTGVVfRSSeiGStnceqwUE7n0Ah',
//     'sk-X8qolYjy62kIzEbr0QRK1h4b4KDVHaNcwMYk39jInSl',
//     PaymayaSDK.ENVIRONMENT.SANDBOX
//   );

app.use(express.json());

app.get('/', async (req,res)=> {
    const generatedRef = "jhn-20220428"
    const Checkout = sdk.Checkout;
    const Contact = sdk.Contact;
    const Buyer = sdk.Buyer;
    const Address = sdk.Address;
    const ItemAmountDetails = sdk.ItemAmountDetails;
    const ItemAmount = sdk.ItemAmount;
    const Item = sdk.Item;
  
    const contactOptions = {
      phone: '+639778899333',
      email : "paymayabuyer1@gmail.com"
    };
  
      var addressOptions = {
        line1 : "9F Robinsons Cybergate 3",
        line2 : "Pioneer Street",
        city : "Mandaluyong City",
        state : "Metro Manila",
        zipCode : "12345",
        countryCode : "PH"
    };

    const buyerOptions = {
      firstName: 'John',
      middleName : "Michaels",
      lastName: 'Baguna',
    };
  
    const contact = new Contact();
    contact.phone = contactOptions.phone;
    contact.email = contactOptions.email;
    buyerOptions.contact = contact;
  
    var address = new Address();
    address.line1 = addressOptions.line1;
    address.line2 = addressOptions.line2;
    address.city = addressOptions.city;
    address.state = addressOptions.state;
    address.zipCode = addressOptions.zipCode;
    address.countryCode = addressOptions.countryCode;
    buyerOptions.shippingAddress = address;
    buyerOptions.billingAddress = address;

    const buyer = new Buyer();
    buyer.firstName = buyerOptions.firstName;
    buyer.middleName = buyerOptions.middleName;
    buyer.lastName = buyerOptions.lastName;
    buyer.contact = buyerOptions.contact;
    buyer.shippingAddress = buyerOptions.shippingAddress;
    buyer.billingAddress = buyerOptions.billingAddress;

    const itemOptions = {
      name: "Pickup Coffee",
      code: "pu_coffee",
      description: "-",
    };
  
    const itemAmountOptions = {
      currency: "PHP",
      value: '89.00',
    };
  
    const itemAmountDetailsOptions = {
      shippingFee: "0.00",
      tax: "0.00",
      subTotal: '89.00',
    };
  
    const itemAmountDetails = new ItemAmountDetails();
    itemAmountDetails.shippingFee = itemAmountDetailsOptions.shippingFee;
    itemAmountDetails.tax = itemAmountDetailsOptions.tax;
    itemAmountDetails.subTotal = itemAmountDetailsOptions.subTotal;
    itemAmountOptions.details = itemAmountDetails;
  
    const itemAmount = new ItemAmount();
    itemAmount.currency = itemAmountOptions.currency;
    itemAmount.value = itemAmountOptions.value;
    itemAmount.details = itemAmountOptions.details;
    itemOptions.amount = itemAmount;
    itemOptions.totalAmount = itemAmount;
    itemOptions.amount = itemAmount;
    itemOptions.totalAmount = itemAmount;
  
    const item = new Item();
    item.name = itemOptions.name;
    item.code = itemOptions.code;
    item.description = itemOptions.description;
    item.amount = itemOptions.amount;
    item.totalAmount = itemOptions.totalAmount;
  
    const items = [];
    items.push(item);
  
    const checkout = new Checkout();
    checkout.buyer = buyer;
    console.log("🚀 ~ file: maya.js:183 ~ result ~ checkout.buyer", checkout.buyer)
    checkout.totalAmount = itemOptions.totalAmount;
    console.log("🚀 ~ file: maya.js:185 ~ result ~ checkout.totalAmount", checkout.totalAmount)
    checkout.requestReferenceNumber = generatedRef;
    console.log("🚀 ~ file: maya.js:187 ~ result ~ checkout.requestReferenceNumber", checkout.requestReferenceNumber)
    checkout.items = items;
    console.log("🚀 ~ file: maya.js:189 ~ result ~ checkout.items", checkout.items)
    checkout.redirectUrl = {
      success: "https://www.pickup-coffee.com/?success",
      failure: "https://www.pickup-coffee.com/?failure",
      cancel: "https://www.pickup-coffee.com/?cancel",
    };
    console.log("🚀 ~ file: maya.js:191 ~ result ~ checkout.redirectUrl", checkout.redirectUrl)

    checkout.execute(function (error, response) {
    console.log(error, response);
    if (error) {
        res.status(500).send('Something broke!')
    } else {
        res.send({
            checkoutUrl: response.redirectUrl,
        })
    }
    });
})

app.listen(port,()=>{
    console.log("Service is running at port "+port);
  });