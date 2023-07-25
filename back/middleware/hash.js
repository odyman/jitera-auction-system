const bcrypt = require('bcrypt');
/**
 * @param {string} storePassword
 * @param {string} reqPassword
 * @return {boolean}
 */
exports.compareHash = (storePassword, reqPassword) => {
  try {
    const compareData = bcrypt.compareSync(storePassword, reqPassword);
    return compareData;
  } catch (error) {
    return false;
  }
};

exports.privateKeys = 'auction-sys-2023';
