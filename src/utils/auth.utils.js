const jwt = require("jsonwebtoken")
const redis = require("redis")
const client = redis.createClient()

function generateAccessToken(username) {
    return jwt.sign(username, "1a2b3c4e5dqwertyuioplkjhgf", { expiresIn: "1800s" })
}
async function putTokenInRedis(token, username) {
    client
        .connect()
        .then(async (res) => {
            console.log("connected")
            // Write your own code here
            client.set(token, username)
            // Example
            // const value = await client.lRange("data", 0, -1)
            // console.log(value.length)
            // console.log(value)
            client.quit()
        })
        .catch((err) => {
            console.log("err happened" + err)
        })
    
}
async function checkTokenInRedis(token) {
    client
        .connect()
        .then(async (res) => {
            console.log("connected")
            // Write your own code here
            await client.exists(token, (err, reply) => {
                if (err) {
                    throw new Error(err)
                }
                return reply
            })
            client.quit()
        })
        .catch((err) => {
            console.log("err happened" + err)
        })
}
module.exports = { generateAccessToken, putTokenInRedis, checkTokenInRedis}