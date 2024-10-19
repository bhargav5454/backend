const { DataTypes } = require("sequelize");
const sequelize = require("../database/connectDb");
const UserSchema = require('./user.model'); // Import the User schema
const ProductSchema = require('./product.model'); // Import the Product schema

const cartSchema = sequelize.define('Cart', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
            model: UserSchema, // Use the User schema
            key: 'id'
        }
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
            model: ProductSchema, // Use the Product schema
            key: 'id'
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1 // Quantity should be at least 1
        }
    },
}, {
    timestamps: true // Optionally add timestamps if needed
});

// Establishing the relationships
cartSchema.belongsTo(UserSchema, {
    foreignKey: 'userId'
});

cartSchema.belongsTo(ProductSchema, {
    foreignKey: 'productId'
});

sequelize.sync()
    .then(() => console.log('cart table created successfully'))
    .catch(err => console.error('Error creating cart table', err));

module.exports = cartSchema;
