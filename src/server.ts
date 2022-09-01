import {client} from "./client";
import {initListener} from "./listener/listener-system";



client.on("ready", async () => {
    initListener(client)
    console.log(`Logged in as ${client.user?.tag}!`);
});

