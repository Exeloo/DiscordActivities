import Discord from "discord.js";
import {runActivities} from "../../features/activities/activities";

export const interactionCreateListener = (client: Discord.Client) => {
    client.on("interactionCreate", async (interaction) => {
        try {
            if (interaction.isCommand()) {
                switch (interaction.commandName) {
                    case "activities":
                        await runActivities(interaction)
                }
            }
        } catch (e) {
            console.error(e)
        }
    })
}
