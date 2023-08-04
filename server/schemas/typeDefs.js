const typeDefs = `
type Query {
  me: User
}

type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBook: [Book]
    bookCount: Int
  }

  type Book {
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }
  type input {
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }
  type Auth {
    token: ID!
    user: User
  }

 

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(bookData: input): User
    removeBook(bookId: String!): User
  
  }
`; 


module.exports = typeDefs;

  
   
   



    
