const jwt = require('jsonwebtoken');

// 
module.exports = function(req, res, next) {
  // Check for the token being sent in a header or a query parameter
  // Tokens can be sent in different ways: either as a part of the request
  // header or as a parameter in the URL
  let token = req.get('Authorization') || req.query.token;
  if (token) {
    token = token.replace('Bearer ', ''); // removes the bearer part of the token and just leaves actual token.
    // Check if token is valid and not expired
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      // if verified set req.user to the decoded user information, if not remain null
      req.user = err ? null : decoded.user;
      // Can remove this...
      // If your app doesn't care
      // Calculates the expiration time of the token, 
      // exp => expiration
      // err => a variable that holds any error information that might have occured during the process of verifying the JWT
      // decoded => object that contains decoded information from JWT and usually includes
      // This line of code is calculating the expiration time of a JWT and assigning it to req.exp, unless there was an error during the JWT verification process. If there was an error, req.exp is set to null.
      req.exp = err ? null : new Date(decoded.exp * 1000);
    });
    return next();
  } else {
    // No token was sent
    req.user = null;
    return next();
  }
};