'use strict';

const validate = (inputString = '', regexpType = '') => {
  const roles = {
    name: /^([A-Z][a-z]* )*([A-Z][a-z]*)$/,
    email: /^[a-z0-9]+([-_.][a-z0-9]+)*@[a-z0-9]+([-_.][a-z0-9]+)*(\.[a-z]{2,})$/,
    address: /^[0-9]+ ([A-Z][a-z]* )*([A-Z][a-z]*)$/,
  };
  const pattern = roles[`${regexpType}`];
  return pattern.test(inputString);
};
export default validate;
