import database from './database.js'
import makeApp from './app.js'
/**
 * DI allows us to pass any database object (functions returned from db file which here could be production or 
 * we can explicitly write two methods here itself for unit testing as commented below)
 */
const app = makeApp(database)
// const app = makeApp({
//   getUser: () => {},
//   createUser: () => {}
// })

app.listen(8080, () => console.log("listening on port 8080"))