module.exports = function(phoneNumber) {
  return phoneNumber.replace(/([0-9]{3})([0-9]{4})([0-9]{4})/, '$1****$3');
}