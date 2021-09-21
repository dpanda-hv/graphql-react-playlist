const graphql = require("graphql");

const AuthorSchema = require("../mongoose/author");
const BookSchema = require("../mongoose/book");

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLInt, GraphQLList, GraphQLNonNull } = graphql;

const Book = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: Author,
            resolve(parent, args) {
                return AuthorSchema.findById(parent.authorId);
            }
        }
    })
});

const Author = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(Book),
            resolve: (parent, args) => BookSchema.find({authorId: parent.id})
        }
    })
});

const RootSchema = new GraphQLObjectType({
    name: "RootSchema",
    fields: {
        book: {
            type: Book,
            args: {id: {type: GraphQLID}},
            resolve: (parent, args) => BookSchema.findById(args.id)
        },
        books: {
            type: new GraphQLList(Book),
            resolve: () => BookSchema.find()
        },
        author: {
            type: Author,
            args: {id: {type: GraphQLID}},
            resolve: (parent, args) => AuthorSchema.findById(args.id)
        },
        authors: {
            type: new GraphQLList(Author),
            resolve: () => AuthorSchema.find()
        },
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: Author,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent, args) {
                const author = new AuthorSchema({
                    name: args.name,
                    age: args.age
                });
                return author.save();
            }
        },
        addBook: {
            type: Book,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                genre: {type: new GraphQLNonNull(GraphQLString)},
                authorId: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, {name, genre, authorId}) {
                const book = new BookSchema({
                    name,
                    genre,
                    authorId
                });

                return book.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootSchema,
    mutation: Mutation
});
