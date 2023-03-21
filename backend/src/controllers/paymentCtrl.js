require("dotenv").config();

const path = require("path");
const shortid = require("shortid");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const logo = async (req, res) => {
  return res.sendFile(path.join(__dirname, "logo.svg"));
};

const verification = async (req, res) => {
  const secret = "12345678";
  console.log(req.body);
  const shasum = crypto.createHmac("sha256", secret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");
  console.log(digest, req.headers["x-razorpay-signature"]);
  if (digest === req.headers["x-razorpay-signature"]) {
    console.log("request is legit");
    // process it
    require("fs").writeFileSync(
      "payment1.json",
      JSON.stringify(req.body, null, 4)
    );
  } else {
    // pass it
  }
  return res.json({status: "ok"});
};

const razor = async (req, res) => {
  const payment_capture = 1;
  const amount = 499;
  const currency = "INR";

  const options = {
    amount: amount * 100,
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };
  try {
    const response = await razorpay.orders.create(options);
    console.log(response);
    return res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  logo,
  verification,
  razor,
};
