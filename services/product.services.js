const { productSchema } = require("../model");
const userSchema = require("../model/user.model");

const createProduct = async (body) => {
    try {
        const newProduct = await productSchema.create(body);
        if (!newProduct) {
            throw new Error("Failed to create product");
        }
        return newProduct;
    } catch (error) {
        throw error;
    }
};

const getProducts = async (userId) => {
    try {
        const products = await productSchema.findAll({
            where: {
                createdBy: userId
            },
            include: [
                {
                    model: userSchema,
                    as: 'creator',
                    attributes: ['id', 'name' ,'email']
                }
            ]
        });
        if (!products.length) {
            throw new Error("No products found");
        }
        return products;
    } catch (error) {
        throw error;
    }
};

const getProductById = async (id, userId) => {
    try {
        const product = await productSchema.findOne({
            where: {
                id,
                createdBy: userId
            }
        });
        if (!product) {
            throw new Error("Product not found");
        }
        return product;
    } catch (error) {
        throw error;
    }
};

const updateProduct = async (id, userId, body) => {
    try {
        const product = await productSchema.findOne({
            where: {
                id,
                createdBy: userId
            }
        });
        if (!product) {
            throw new Error("Product not found");
        }
        await product.update(body);
        return { message: "Product updated successfully", data: product };
    } catch (error) {
        throw error;
    }
};

const deleteProductById = async (id, userId) => {
    try {
        const product = await productSchema.findOne({
            where: {
                id,
                createdBy: userId
            }
        });
        if (!product) {
            throw new Error("Product not found");
        }
        await product.destroy();
        return { message: "Product deleted successfully", data: product };
    } catch (error) {
        throw error;
    }
};

const deleteAllProducts = async () => {
    try {
        await productSchema.destroy({ where: {} });
        return { message: "All products deleted successfully" };
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProductById,
    deleteAllProducts,
};
