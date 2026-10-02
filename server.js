const express = require('express')
const productRoutes = require('./routes/productRoutes')
const { cacheMiddleware, clearCache } = require('./middleware/cacheMiddleware')

const app = express()

const PORT = 3000;

app.use(express.json())

app.use(clearCache)
app.use(cacheMiddleware)

app.use('/products', productRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})