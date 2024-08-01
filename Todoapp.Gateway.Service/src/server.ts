import app from "./app";
import * as dotenv from "dotenv"

dotenv.config()

async function StartServer(port: string) {
    app.listen(port, async () => {
        console.log(`The server runnig the ${port}`)
    })
}

StartServer(process.env.GATEWAY_SERVICE_PORT);