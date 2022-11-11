// const fs = require('fs/promises')
const { Schema, model } = require('mongoose');
const joi = require('joi');
const { handleSaveError } = require('../helpers');
// const { regexp } = require('../helpers');

const CATEGORIES = ['lostfound', 'sell', 'goodhands'];
const SEX = ['male', 'female'];

const noticeSchema = new Schema(
  {
    category: {
      type: String,
      required: [true, 'Set category for notice'],
    },
    title: {
      type: String,
      required: [true, 'Set title for notice'],
      unique: true,
    },

    description: {
      type: String,
      required: [true, 'Set description for notice'],
    },

    name: {
      type: String,
      required: [true, 'Set name for pet'],
    },

    birthday: {
      type: Date,
      default: '0000',
    },

    breed: {
      type: String,
      default: 'outbred',
    },

    location: {
      type: String,
      required: [true, 'Set location'],
    },

    sex: {
      type: String,
      enum: ['male', 'female'],
      required: [true, 'Set sex'],
    },

    price: {
      type: Number,
      default: 0,
    },

    imageURL: {
      type: String,
      default: '',
    },

    comments: {
      type: String,
      default: '',
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true }
);

noticeSchema.post('save', handleSaveError);

const addSchema = joi.object({
  category: joi
    .string()
    .valid(...CATEGORIES)
    .required()
    .messages({
      'string.base': `{{#label}} should be a type of 'text'`,
      'string.empty': `{{#label}} cannot be an empty field`,
      'string.trim': '{{#label}} must not have leading or trailing whitespace',
      'any.required': `missing required field: {{#label}}`,
    }),
  title: joi.string().required().messages({
    'string.base': `{{#label}} should be a type of 'text'`,
    'string.empty': `{{#label}} cannot be an empty field`,
    'string.trim': '{{#label}} must not have leading or trailing whitespace',
    'any.required': `missing required field: {{#label}}`,
  }),
  description: joi.string().required().messages({
    'string.base': `{{#label}} should be a type of 'text'`,
    'string.empty': `{{#label}} cannot be an empty field`,
    'string.trim': '{{#label}} must not have leading or trailing whitespace',
    'any.required': `missing required field: {{#label}}`,
  }),
  name: joi.string().required().messages({
    'string.base': `{{#label}} should be a type of 'text'`,
    'string.empty': `{{#label}} cannot be an empty field`,
    'string.trim': '{{#label}} must not have leading or trailing whitespace',
    'any.required': `missing required field: {{#label}}`,
  }),
  location: joi.string().required().messages({
    'string.base': `{{#label}} should be a type of 'text'`,
    'string.empty': `{{#label}} cannot be an empty field`,
    'string.trim': '{{#label}} must not have leading or trailing whitespace',
    'any.required': `missing required field: {{#label}}`,
  }),
  sex: joi
    .string()
    .valid(...SEX)
    .required()
    .messages({
      'string.base': `{{#label}} should be a type of 'text'`,
      'string.empty': `{{#label}} cannot be an empty field`,
      'string.trim': '{{#label}} must not have leading or trailing whitespace',
      'any.required': `missing required field: {{#label}}`,
    }),
});

const schemas = { addSchema };
const Notice = model('notice', noticeSchema);

module.exports = { Notice, schemas };
