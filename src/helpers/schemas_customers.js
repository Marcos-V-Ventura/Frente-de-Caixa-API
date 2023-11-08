const knex = require("../connection");
const yup = require("yup");
const { pt } = require("yup-locales");
const { typeErrorString, typeErrorNumber } = require("./errorMessages");
yup.setLocale(pt);