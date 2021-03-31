const graphql = require('graphql');
const GraphJson = require("graphql-type-json")

// Imports
const Daily = require("../Database/DailyStats/DailySchema")
const Order = require("../Database/Orders/Orders")
const Payment = require("../Database/Payments/PaymentsSchema")
const Stock = require("../Database/Stock/StockSchema")
const Store = require("../Database/Stores/StoresSchema")
const User = require('../User/UserSchema')

const { GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean,
    GraphQLNonNull
} = graphql;

// Date
const DateType = new GraphQLObjectType({
    name: "Date",
    fields: () => ({
        day: { type: GraphQLInt },
        month: { type: GraphQLInt },
        year: { type: GraphQLInt }
    })
})

// Orders
const OrderType = new GraphQLObjectType({
    name: "Order",
    fields: () => ({
        id: { type: GraphQLID },
        Amount: { type: GraphQLInt },
        Code: { type: GraphQLInt },
        Date: { type: DateType },
        Done: { type: GraphQLBoolean},
        Store: { type: GraphQLInt },
        AddedBy: {
            type: new GraphQLList(UserType),
            resolve(parent, args){
                return User.find({_id: parent.AddedBy})
            }
        }
    })
})

// Payments
const PaymentType = new GraphQLObjectType({
    name: "Payment",
    fields: () => ({
        id: { type: GraphQLID },
        Done: { type: GraphQLBoolean },
        name: { type: GraphQLString },
        amount: { type: GraphQLInt },
        Date: { type: DateType},
        Store: { type: GraphQLInt },
        AddedBy: {
            type: new GraphQLList(UserType),
            resolve(parent, args){
                return User.find({_id: parent.AddedBy})
            }
        }
    })
})

// Users
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        role: { type: GraphQLString },
        group: {
            type: new GraphQLList(UserType),
            resolve(parent, args){
                return User.find({group: parent.group})
            }
        }
    })
});

// Stock
const StockType = new GraphQLObjectType({
    name: 'Stock',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        amount: { type: GraphQLInt },
        Code: { type: GraphQLInt },
        Category: { type: GraphQLInt },
        IsAvailable: { type: GraphQLBoolean }
    })
});

// Store
const StoreType = new GraphQLObjectType({
    name: 'Store',
    fields: ( ) => ({
        id: { type: GraphQLID },
        Employees: { type: GraphJson.GraphQLJSON },
        Stock: { type: GraphJson.GraphQLJSON },
        Street: { type: GraphQLString },
        BuildingNumber: { type: GraphQLInt },
        City: { type: GraphQLString }
    })
});

// Daily stats
const DailyType = new GraphQLObjectType({
    name: 'Daily',
    fields: () => ({
        id: { type: GraphQLID },
        Sold: { type: GraphJson.GraphQLJSON },
        Store: { type: GraphQLInt },
        Date: { type: DateType },
        Summary: { type: GraphQLInt },
    })
});

// Main query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {

        // 1 user
        // User: {
        //     type: new GraphQLList(UserType),
        //     args: { email: { type: GraphQLString } },
        //     resolve(parent, args){
        //         // Code to get data from db / sausage
        //         // Args = pole args z góry
        //         // Parent = obiekt "z góry" = przykład book wyżej
        //         // return _.find(books, { id: args.id });
        //         return User.find({email: args.email})
        //     }
        // },

        // All users
        Users: {
            type: new GraphQLList(UserType),
            resolve(parent, args){
                // Code to get data from db / sausage
                // Args = pole args z góry
                // Parent = obiekt "z góry" = przykład book wyżej
                // return _.find(books, { id: args.id });
                return User.find()
            }
        },

        // 1 Group
        GroupUsers: {
            type: new GraphQLList(UserType),
            args: { Group: { type: GraphQLString }, role: { type: GraphQLString } },
            resolve(parent, args){
                // Code to get data from db / sausage
                // Args = pole args z góry
                // Parent = obiekt "z góry" = przykład book wyżej
                // return _.find(books, { id: args.id });
                if(!args.role){
                    return User.find({group: args.Group})
                } else {
                    return User.find({group: args.Group, role: args.role})
                }

            }
        },

        // Orders filtered by done or no
        Order: {
            type: new GraphQLList(OrderType),
            args: { Done: { type: GraphQLBoolean }, Group: { type: GraphQLString }  },
            resolve(parent, args){
                // return authors
                return Order.find({Done: args.Done, group: args.Group})
            }
        },

        // Orders added by

        // Orders sorted by stores

        // Orders from 1 day

        // All Orders
        Orders: {
            type: new GraphQLList(OrderType),
            args: {Group: { type: GraphQLString } },
            resolve(parent, args){
                // return authors
                return Order.find({group: args.Group})
            }
        },

        // All payments
        Payments: {
            type: new GraphQLList(PaymentType),
            args: {Group: { type: GraphQLString } },
            resolve(parent, args){
                // return authors
                return Payment.find({group: args.Group})
            }
        },

        // 1 payment

        // Daily payments

        // Payments sorted by stores

        // Payments added by

        // Stock all
        Stock: {
            type: new GraphQLList(StockType),
            args: {Group: { type: GraphQLString } },
            resolve(parent, args){
                // return authors
                return Stock.find({group: args.Group})
            }
        },

        // Stock is available

        // Stock category

        // Stock Code

        // All stores
        Store: {
            type: new GraphQLList(StoreType),
            args: {Group: { type: GraphQLString } },
            resolve(parent, args){
                // return authors
                return Store.find({group: args.Group})
            }
        },

        // Stores from 1 city

        // Stores with stock like xxx

        // Daily stats
        Daily: {
            type: new GraphQLList(DailyType),
            args: {Group: { type: GraphQLString } },
            resolve(parent, args){
                // return authors
                return Daily.find({group: args.Group})
            }
        }

        // Daily stats per store

        // Daily start per day

        // Daily starts per month

        // Daily start per year

        // Daily start with summary higer than xxx
    }
});

// Mutation
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // AddUser: {
        //     type: UserType,
        //     args: {
        //         name: { type: GraphQLNonNull(GraphQLString) },
        //         email: { type: GraphQLNonNull(GraphQLString) },
        //         password: { type: GraphQLNonNull(GraphQLString) },
        //         role: { type: GraphQLNonNull(GraphQLString) },
        //         group: { type: GraphQLNonNull(GraphQLString) },
        //         },
        //     resolve(parent, args){
        //         let NewUser = new User({
        //             name: args.name,
        //             email: args.email,
        //             role: args.role,
        //             group: args.group
        //         });
        //         return NewUser.save()
        //     }
        // },

        AddDaily: {
            type: DailyType,
            args: {
                Store: { type: GraphQLNonNull(GraphQLString) },
                Sold: { type: GraphQLNonNull(GraphJson.GraphQLJSON)},
                Date: { type: GraphQLNonNull(GraphJson.GraphQLJSON)},
                Summary: { type: GraphQLNonNull(GraphQLInt) },
                group: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args){
                let NewDaily = new Daily({
                    Store: args.Store,
                    Sold: args.Sold,
                    Date: args.Date,
                    Summary: args.Summary,
                    group: args.group
                });
                return NewDaily.save()
            }
        },

        AddOrder: {
            type: OrderType,
            args: {
                Amount: { type: GraphQLNonNull(GraphQLInt) },
                Code: { type: GraphQLNonNull(GraphQLInt) },
                Date: { type: GraphQLNonNull(GraphJson.GraphQLJSON)},
                Done: { type: GraphQLNonNull(GraphQLBoolean) },
                Store: { type: GraphQLNonNull(GraphQLInt) },
                AddedBy: { type: GraphQLNonNull(GraphQLString) },
                group: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args){
                let NewOrder = new Order({
                    Amount: args.Amount,
                    Code: args.Code,
                    Date: args.Date,
                    Done: args.Done,
                    Store: args.Store,
                    AddedBy: args.AddedBy,
                    group: args.group
                });
                return NewOrder.save()
            }
        },

        AddPayment: {
            type: PaymentType,
            args: {
                Name: { type: GraphQLNonNull(GraphQLString) },
                Amount: { type: GraphQLNonNull(GraphQLInt) },
                Done: { type: GraphQLNonNull(GraphQLBoolean) },
                Date: { type: GraphQLNonNull(GraphJson.GraphQLJSON)},
                Store: { type: GraphQLNonNull(GraphQLInt) },
                AddedBy: { type: GraphQLNonNull(GraphQLString) },
                group: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args){
                let NewPayment = new Payment({
                    Name: args.Name,
                    Amount: args.Amount,
                    Done: args.Done,
                    Date: args.Date,
                    Store: args.Store,
                    AddedBy: args.AddedBy,
                    group: args.group
                });
                return NewPayment.save()
            }
        },

        AddStock: {
            type: StockType,
            args: {
                Name: { type: GraphQLNonNull(GraphQLString) },
                Amount: { type: GraphQLNonNull(GraphQLInt) },
                Category: { type: GraphQLNonNull(GraphQLString) },
                IsAvailable: { type: GraphQLNonNull(GraphQLBoolean) },
                group: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args){
                let NewStock = new Stock({
                    Name: args.Name,
                    Amount: args.Amount,
                    Category: args.Category,
                    IsAvailable: args.IsAvailable,
                    group: args.group
                });
                return NewStock.save()
            }
        },

        AddStore: {
            type: StoreType,
            args: {
                Street: { type: GraphQLNonNull(GraphQLString) },
                BuildingNumber: { type: GraphQLNonNull(GraphQLInt) },
                City: { type: GraphQLNonNull(GraphQLString) },
                Employees: { type: GraphQLNonNull(GraphJson.GraphQLJSON)},
                Stock: { type: GraphQLNonNull(GraphJson.GraphQLJSON)},
                group: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args){
                let NewStore = new Store({
                    Street: args.Street,
                    BuildingNumber: args.BuildingNumber,
                    City: args.City,
                    Employees: args.Employees,
                    Stock: args.Stock,
                    group: args.group
                });
                return NewStore.save()
            }
        },

    }
})

// Exportuj schemat, w jakim ma wybierać dane
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
