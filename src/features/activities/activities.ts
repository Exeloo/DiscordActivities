import {CommandInteraction} from "discord.js";
import {DiscordTogether} from "discord-together";
import {client} from "../../client";
import {activitiesTypes} from "./activities-types"

export const runActivities = async (interaction: CommandInteraction) => {
    if (!interaction.guild) return
    const guild = await client.guilds.fetch(interaction.guild.id)
    const member = await guild.members.fetch(<string>interaction.member?.user.id)
    if (!member) return
    if (!member.voice.channel) return interaction.reply({
        content: "Vous n'êtes pas dans un salon vocal !",
        ephemeral: true
    })
    const option = interaction.options.get("type")
    if (!option || option.type !== "STRING" || !option.value) return interaction.reply({
        content: "Veuillez passer le type d'activité que vous souhaitez !",
        ephemeral: true
    })
    if (!activitiesTypes.includes(<string>option.value)) return interaction.reply({
        content: "Votre activité n'est pas valide !",
        ephemeral: true
    })
    // @ts-ignore
    const invite = await (new DiscordTogether(client)).createTogetherCode(member.voice.channel.id, <string>option.value)
    return interaction.reply({content: `Voici votre code : ${invite.code}`, ephemeral: true})
}
