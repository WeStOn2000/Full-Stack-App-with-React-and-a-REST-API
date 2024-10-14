const auth = require('basic-auth');
const bcrypt = require('bcryptjs');
const { User } = require('./models');

// Middleware function for user authentication
const authenticateUser = async (req, res, next) => {
  let message;

  // Extract the basic auth credentials from the request
  const credentials = auth(req);
  console.log('Credentials:', credentials); // Log the extracted credentials

  if (credentials) {
      try {
          // Find the user by email address
          const user = await User.findOne({ where: { emailAddress: credentials.name } });
          if (user) {
              // Compare password
              const authenticated = bcrypt.compareSync(credentials.pass, user.password);
              if (authenticated) {
                  console.log(`Authentication successful for user: ${user.emailAddress}`);
                  req.currentUser = user; // Set the current user
                  return next(); // Proceed to the next middleware/route handler
              } else {
                  message = `Authentication failed for user: ${user.emailAddress}`;
              }
          } else {
              message = `User not found for email address: ${credentials.name}`;
          }
      } catch (error) {
          console.error('Database error:', error);
          return res.status(500).json({ message: 'Internal server error' });
      }
  } else {
      message = 'Auth header not found';
  }

  // Handle authentication errors
  console.warn(message);
  return res.status(401).json({ message: 'Access Denied' });
};

// Export the middleware function
module.exports = authenticateUser;
