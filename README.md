# [massive-js](https://massive-js.readthedocs.io/en/latest/)

## SETUP

Copy the contents of [./schema.sql](https://github.com/kendagriff/massive-demo/blob/master/schema.sql), paste it into a script (using SQL Tabs), and execute it.

## Mini Project

### Step 1

Clone the repo (do not fork it).

### Step 2: Install the NPM modules

```
npm install
```

### Step 3: Test it

Start your application by running:

```
node server.js
``` 

### Step 5: Start Postgres

Start your Postgres server.

### Step 6: Demo pgAdmin

Begin by launching pgAdmin.

* Create a database
* Examine the tables

### Step 7: Include the massive-js Dependency
 
In `server.js`, add to your list of dependencies:

```
var massive = require('massive')
```

### Step 8: Connect to Postgres via massive-js

In `server.js` [add code to connect](https://github.com/robconery/massive-js#express-example) to your database:

```javascript
massive({
  host: 'ec2-23-21-197-231.compute-1.amazonaws.com',
  port: 5432,
  database: 'd3end9n7irlc8n',
  user: 'ldmvvsyrzvqvax',
  password: 'd3b46f0d5dfbc5d98e53ed6eda29d1076096facb6c5e9ded5ec7b815faed7b64',
  ssl: true
}).then(function(db) {
  app.set('db', db);
});
```

### Step 9: Create a SQL Repository

massive-js works by converting your SQL queries, held in files, into JS functions.

For example, the following file, held in the `./db` directory of your project:

`db/getAllInjuries.sql`
```sql
SELECT * FROM injuries;
```

Yields the following function:

```js
app.get("db").getAllInjuries().then(function(injuries) {
  console.log(injuries) // injuries will contain an array of injuries
});
```

Create the `./db` directory, and add a file, `getAllIncidents.sql` (incidents, not injuries).

### Step 10: Query Incidents

Now that you have a repository for SQL queries, add a query to your new file that shows you retrieves the following pieces of information for every incident in your database:

* `incidents.id`
* `incidents.us_state`
* `injuries.name`
* `affected_areas.name`
* `causes.name`

### Step 11: Upgrade the GET Endpoint

Now that you have a way to return basic information about incidents of injuries, upgrade the GET endpoint such that an HTTP request can return the information to a client (like Angular) in your response:

Hint:

```js
app.get("db").getAllInjuries().then(function(injuries) {
  console.log(injuries) // injuries will contain an array of injuries
});
```

### Step 12: Up the Ante

If you've made it this far, great work. Now, upgrade your endpoint again, this time accepting a new query parameter, `cause=Sneezing` (e.g. any cause). When `cause=Sneezing` is submitted as part of the same GET request, return the results of a _different_ query, `db/getIncidentsByCause.sql`.

Make sure the original query works as before.

Hint:

massive-js accepts arguments as part of your SQL using $1, $2, ...

```sql
select * from products
where in_stock = $1 and price < $2;
```

Your arguments can be submitted as an array as the first argument in the function, before the callback.

```js
app.get("db").productsInStock([true, 1000]).then(function(products) {
  // products is a results array
});
```

### Step 13 (Optional): Up the Ante (Again)

Upgrade your GET request to accept not only `by=cause`, but `by=affected_area`, without breaking your previous functionality.

### Step 14: Create a New Incident

Upgrade the POST request to give yourself the ability to create a new incident. Here's a sample request body for Postman:

```json
{
  "us_state": "WV",
  "injury_id": 1,
  "cause_id": 5
}
```
