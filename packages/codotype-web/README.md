# codotype-web
Codotype Web Client Application

TODOs
- Form validations
- Fix routing bugs (can do with Vuex if needed)

-------

CORE FEATURES FIRST
TODO - gradient for SOLID buttons, navs
TODO - Add SEED admin user

SERVER TECH NOTES
https://github.com/simov/purest
https://github.com/simov/grant

---------


Built with:
- [driver.js](https://github.com/kamranahmedse/driver.js)

---------

## Notes on relation refactor
QUESTION - what should the scope of relations be in the application?
Should it be like this (#12):
```
app: {
  schemas: [
    {
      id: '',
      label: 'Task',
      label_plural: 'Tasks',
      identifier: 'task',
      identifier_plural: 'tasks',
      class_name: 'Task',
      class_name_plural: 'Tasks',
      attributes: [ ... ],
      relations: [ ... ]
    }
  ]
}
```

or should it be like this (#2):
```
app: {
  schemas: [
    {
      id: '',
      label: 'Task',
      label_plural: 'Tasks',
      identifier: 'task',
      identifier_plural: 'tasks',
      class_name: 'Task',
      class_name_plural: 'Tasks',
      attributes: [ ... ],
    }
  ]
  relations: [ ... ]
}
```

QUESTION - what's the easiest structure to work with at compile time?
QUESTION - what's the easiest structure to build?
All are probably equally difficult to edit manually - nuanced, but not impossible

Relation attributes (currently):
```js
{
  "order": 2,
  "id": "...",
  "label": "Tasks",
  "identifier": "task_ids",
  "help": "",
  "required": false,
  "unique": false,
  "datatype": "RELATION",
  "datatypeOptions": {
    "relationType": "OWNS_MANY",
    "schema_id": "...",
    "reverse_relation": "..."
  },
  "locked": true
}
```

Notes on this (User HAS MANY Tasks):
TODO - needs a place to keep 'Alias'
```js
{
  "order": 2,
  "id": "...",
  "label": "Tasks", // Doesn't handle 'Alias'
  "identifier": "task_ids", // Doesn't handle 'Alias'
  "help": "Tasks belonging to this User", // Not really needed on relation
  "required": false,
  "unique": false,
  "datatype": "RELATION",
  "datatypeOptions": {
    "relationType": "OWNS_MANY", // A byproduct of BELONGS_TO -
    "schema_id": "...",
    "reverse_relation": "..."
  },
  "locked": true
}
```

```js
// printer.model.js
const mongoose, { Schema } = require('mongoose')

const userSchema = new Schema({
  email: String
});

module.exports = mongoose.model('User', userSchema)
```

```js
// printer.model.js
const mongoose, { Schema, ObjectID } = require('mongoose')

const printerSchema = new Schema({
  label: String,
  owner_id: {
    type: ObjectID,
    ref: 'User'
  }
  done: Boolean

});

module.exports = mongoose.model('Printer', printerSchema)
```

```js
// printer.controller.js
const Printer = require('printer.model')
const User = require('user.model')

module.exports.getOwner = (req, res) => {
  Printer.findById(req.id)
  .then((printer) => {
    User.findById(printer.owner_id)
    .then((user) => {
      res
      .status(200)
      .send({
        owner: user
      })
    })
  })
}
```

```js
// user.controller.js
const Printer = require('printer.model')
const User = require('user.model')

GET /api/users/:id/machines
module.exports.getMachines = (req, res) => {
    return Printer.find({
      owner_id: req.id
    })
    .then((printers) => {
      res
      .status(200)
      .send({
        machines: printers
      })
    })
}
```

```js
// resource.controller.js
// Require models
<%_ forEach(schema.relations, (each) => _%>
const <%= each.class_name %> = require('../<%= each.identifier %>/<%= each.identifier %>.model.js')
<%_ }) _%>

<%_ forEach(schema.relations, (relation) => _%>

<%_ if (relation.type === 'OWNS_MANY') _%>
GET /api/<%= schema.identifier_plural %>/:id/<%= relation.alias.identifier_plural %>
module.exports.get<%= relation.alias.class_name_plural %> = (req, res) => {
    return <%= relation.schema.class_name %>.find({
      owner_id: req.params.id
    })
    .then((<%= relation.schema.identifier_plural %>) => {
      res
      .status(200)
      .send({
        <%= relation.alias.identifier_plural %>: <%= relation.schema.identifier_plural %>
      })
    })
}

<%_ else if (relation.type === 'BELONGS_TO') { _%>
GET /api/<%= schema.identifier_plural %>/:id/<%= relation.alias.identifier %>
module.exports.get<%= relation.alias.class_name %> = (req, res) => {
  return <%= schema.class_name %>
  .findById(req.params.id)
  .then((<%= schema.identifier %>) => {

    return <%= relation.schema.class_name %>
    .findById(<%= schema.identifier %>.<%= relation.alias.class_name %>_id)
    .then((<%= relation.schema.identifier %>) => {
      res
      .status(200)
      .send({
        <%= relation.alias.identifier %>: <%= relation.schema.identifier %>
      })
    })

  })
}
<%_ } _%>
<%_ }) _%>
```

User OWNS_MANY Printers, aliased as `Machines`
Printer BELONGS_TO User, aliased as `Owner`

Question about the above
can the frontend ensures SOME level of scope safety?
The above example requires both relations to have all
the "meta attributes" for the actual schema and whatever it's aliased as.

Potential relation restructure (what we want at runtime):
- deleted `unique` - too subjective
- deleted 'label'
- deleted `help` - not sure what we should do about `help` going forward...
- moved `relationType' to datatype
- deleted datatypeOptions.relationType
```js
{
  id: '...',
  order: 2,
  type: 'OWNS_MANY', // Moved from datatypeOptions.relationType
  required: false,
  related_schema_id: '...', // Do we need this at runtime?
  reverse_relation_id: '...', // Do we need this at runtime?
  schema: {
    label: 'User',
    label_plural: 'Users',
    identifier: 'user',
    identifier_plural: 'users',
    class_name: 'User',
    class_name_plural: 'Users'
  },
  alias: {
    label: 'Owner',
    label_plural: 'Owners',
    identifier: 'owner',
    identifier_plural: 'owners',
    class_name: 'Owner',
    class_name_plural: 'Owners'
  }
}
```

// // //

Give us a model name: 'Task'

What we generate:

label: 'Task',
label_plural: 'Tasks',
identifier: 'task',
identifier_plural: 'tasks',
class_name: 'Task',
class_name_plural: 'Tasks'


How are these attributes used? We compile templates with them.


Let's write a simple basic class definition for our new 'Task' model.
Good idea - have tabs that show the codotype compiled example in a few different languages
(please ignore the missing validations and timestamps)

```js
const mongoose, { Schema } = require('mongoose')

const Task = new Schema({
  label: String,
  done: Boolean
});

module.exports = mongoose.model('Task', Task)
```

TODO - add an example snippet that could make use of all the metadata attributes

This is ALSO what's needed to display things in the front-end correctly
```js
{
  id: '...',
  order: 2,
  type: 'OWNS_MANY', // Moved from datatypeOptions.relationType
  required: false,
  related_schema_id: '...', // Do we need this at runtime?
  reverse_relation_id: '...', // Do we need this at runtime?
  related_lead_attribute: 'label', // The 'display-ready' attribute
  schema: {
    label: 'User',
    label_plural: 'Users',
    identifier: 'user',
    identifier_plural: 'users',
    class_name: 'User',
    class_name_plural: 'Users'
  },
  alias: {
    label: 'Owner',
    label_plural: 'Owners',
    identifier: 'owner',
    identifier_plural: 'owners',
    class_name: 'Owner',
    class_name_plural: 'Owners'
  }
}
```

How can we store this in a way that's a little more compact?
Notes:
- `alias` and `schema` objects are defined on-the-fly
^ this method allows for relations to be editable, which is great
```js
{
  id: '...',
  order: 2,
  type: 'OWNS_MANY', // Moved from datatypeOptions.relationType
  required: false,
  related_schema_id: '...',
  reverse_relation_id: '...',
  as: 'Owner'
}
```

Run the following function to expand a relation:

```js
function inflateMeta(label) {
  return {
    label: titleize(label)
    label_plural: pluralize(titleize(label))
    identifier: underscored(label)
    identifier_plural: underscored(pluralize(label))
    class_name: classify(titleize(label))
    class_name_plural: pluralize(classify(titleize(label)))
  }
}

function inflateRelation({ schemas, relation }) {
  // Clones the base attributes from the relation
  let inflated = { ...relation }

  // defines inflated.alias && inflate.schema
  const relatedSchema = schemas.find((s) => { s.id === relation.reverse_relation_id })
  inflated.schema = inflateMeta(relatedSchema.label)
  inflated.alias = inflateMeta(inflated.as || relatedSchema.label)
  inflated.related_lead_attribute = relatedSchema.attributes[0].identifier

  // Returns the inflated relation
  return inflated;
}

function inflateSchema({ schema, schemas }) {
  let inflated = { ...schema }
  inflated.relations = schema.relations.map(relation => inflateRelation({ schemas, relation }))
  inflated.attributes = schema.attributes.map(attribute => attribute)
  return inflated
}

// object that gets passed into the generator
const config = {
  id: '...',
  schemas: schemas.map(schema => inflateSchema({ schema, schemas }))
}
```
