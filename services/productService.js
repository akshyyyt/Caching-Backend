const db = require('../database/db')

async function delay () {
    await new Promise((resolve) => {
        setTimeout (() => resolve(), 3000)
    }) 
    return await db.readData()
}

async function getAllProducts() {
    return await db.readData()
}

async function getProductById(id) {
    let products = await delay()
    return products.find((i) => i.id == id)
}

async function addProduct(product) {
    let products = await db.readData()
    
    // Auto increment ID (simple logic)
    let newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1
    let newProduct = { id: newId, ...product }
    
    products.push(newProduct)
    await db.writeData(products)
    return newProduct
}

async function updateProduct(id, updateData) {
    let products = await db.readData()
    let index = products.findIndex((i) => i.id == id)
    if (index !== -1) {
        products[index] = { ...products[index], ...updateData }
        await db.writeData(products)
        return products[index]
    }
    return null
}

async function deleteProduct(id) {
    let products = await db.readData()
    let newProducts = products.filter((i) => i.id != id)
    await db.writeData(newProducts)
}

module.exports = {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
}
