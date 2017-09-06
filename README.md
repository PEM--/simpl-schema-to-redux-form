# simpl-schema-to-redux-form

[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
![license](https://img.shields.io/github/license/mashape/apistatus.svg)
![dependencies](https://img.shields.io/david/PEM--/simpl-schema-to-redux-form.svg)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

SimpleSchema to Redux Form

## Create a validation context
```
import SimpleSchema from 'simpl-schema'
import { simpleSchemaToReduxFormValidator } from 'simpl-schema-to-redux-form'

// Create your own schema
const schema = new SimpleSchema({ ... })

// Create a validation context for this schema
const ctx = mainSchema().newContext()

// Create your validate function for redux-form
const validate = simpleSchemaToReduxFormValidator(ctx)
```

## Current values and validation state
The created `validate` function exposes 2 members: `values`, `errors`.

## Add logger
In development, you can log each call to the validation function by passing a logger.

```
const validate = simpleSchemaToReduxFormValidator(ctx, console)
```
