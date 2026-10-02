const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, '../db.json')

async function readData() {
    let data = await fs.promises.readFile(filePath, 'utf-8')
    return JSON.parse(data)
}

async function writeData(data) {
    await fs.promises.writeFile(filePath, JSON.stringify(data, null, 2))
}

module.exports = {
    readData,
    writeData
}
