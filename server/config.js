// Enter your settings here or the .env file in the same folder as this file
// The values in .env file has precedent over values in this file
module.exports = {
    'authenticationSecret': 'change_your_secret_for_jwt_token_signing',
    'authenticationExpiresIn': '24h',
    'database': 'mongodb://localhost:27017/mean-docker',
    'serverPort': '3000',
    'saltRounds': 10
};