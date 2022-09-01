import Discord from "discord.js";
import {config} from "./config";
import {capitalize} from "./utils/string";
import {activitiesTypes} from "./features/activities/activities-types";

export const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
    ],
});


const login = async () => {
    await client.login(config.token);

    await client.application?.commands.set([
        {
            type: "CHAT_INPUT",
            name: "together",
            description: "Init an activity",
            dmPermission: false,
            options: [
                {
                    type: "STRING",
                    name: "type",
                    description: "The type of the activity",
                    choices: activitiesTypes.map((t) => {
                        return {
                            name: capitalize(t),
                            value: t,
                        }
                    })
                }
            ]
        }
    ])
};

client.on("disconnect", () => {
    try {
        login();
    }
    catch (e) {
        console.error(e)
    }
});

try {
    login();
}
catch (e) {
    console.error(e)
}

