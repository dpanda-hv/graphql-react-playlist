const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const cors = require('cors');

const RootSchema = require("./schema/graphql");

const app = express();

app.use(cors());

mongoose.connect('mongodb://localhost:27017/booklist')
mongoose.connection.once('open', () => {
    console.log('conneted to mongodb database');
});

app.use("/graphql", graphqlHTTP({
    schema: RootSchema,
    graphiql: true,
}));


app.listen("4000", () => {
    console.log("listening on port 4000");
});