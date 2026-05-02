// Switch to admin database to create the user
db = db.getSiblingDB("admin");

// Create user with proper authentication
db.createUser({
  user: "teamBuilderUser",
  pwd: "teamBuilderPassword",
  roles: [
    {
      role: "readWrite",
      db: "teamBuilderDB"
    },
    {
      role: "dbAdmin",
      db: "teamBuilderDB"
    }
  ]
});

// Create the application database and collection if needed
db = db.getSiblingDB("teamBuilderDB");
db.createCollection("characters");
