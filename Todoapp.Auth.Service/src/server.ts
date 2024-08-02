import app from "./app";
import * as dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.AUTH_SERVICE_PORT

async function StartServer() {
    app.listen(PORT, async () => {
        console.log(`The server runnig the ${PORT}`)
    })
}


StartServer();