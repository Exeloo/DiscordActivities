import Discord from "discord.js";
import {interactionCreateListener} from "./listeners/interaction-create.listener";

export const initListener = (client: Discord.Client) => {
    try {
        interactionCreateListener(client)
        console.log(" + Listener system on")
    }
    catch (e) {
        console.log(" - Listener system off")
        console.error(e)
    }

}
