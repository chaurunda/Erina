const { RichEmbed } = require('discord.js')
const config = require('../config.json')
const availableRoles = config.availableRoles

module.exports = class {
	constructor(client) {
		this.client = client
	}

	async run(reaction, user) {
		const message = reaction.message
		let emojiName = reaction.emoji.name
		let formatedName =
			emojiName.charAt(0).toUpperCase() + emojiName.slice(1).toLowerCase()

		if (message.id === '519289526787506208') {
			if (availableRoles.indexOf(formatedName) >= 0) {
				let role = message.guild.roles.find(
					(role) => role.name === formatedName,
				)
				let member = message.guild.members.get(user.id)

				if (!member.roles.has(role.id)) member.addRole(role)
			}

			return
		}

		if (emojiName !== '⭐') return
		if (message.author.id === user.id)
			return message.channel.send(
				`${user}, tu ne peux pas "star" tes propres messages !`,
			)
		if (message.author.bot)
			return message.channel.send(
				`${user}, tu ne peux pas "star" les messages des bots.`,
			)

		const starChannel = this.client.channels.get(
			this.client.config.starboardChannelId,
		)

		if (!starChannel)
			return message.channel.send(
				`It appears that you do not have a starboard channel.`,
			)

		const fetchedMessages = await starChannel.fetchMessages({ limit: 100 })
		const stars = fetchedMessages.find(
			(m) =>
				m.embeds[0].footer.text.startsWith('⭐') &&
				m.embeds[0].footer.text.endsWith(message.id),
		)

		if (stars) {
			const star = /^\⭐\s([0-9]{1,3})\s\|\s([0-9]{17,20})/.exec(
				stars.embeds[0].footer.text,
			)
			const foundStar = stars.embeds[0]
			const image =
				message.attachments.size > 0
					? await this.extension(reaction, message.attachments.array()[0].url)
					: ''
			const embed = new RichEmbed()
				.setColor(foundStar.color)
				.setDescription(foundStar.description)
				.setAuthor(message.author.tag, message.author.displayAvatarURL)
				.setTimestamp()
				.setFooter(`⭐ ${parseInt(star[1]) + 1} | ${message.id}`)
				.setImage(image)
			const starMsg = await starChannel.fetchMessage(stars.id)
			await starMsg.edit({ embed })
		}

		if (!stars) {
			const image =
				message.attachments.size > 0
					? await this.extension(reaction, message.attachments.array()[0].url)
					: ''
			if (image === '' && message.cleanContent.length < 1)
				return message.channel.send(
					`${user}, you cannot star an empty message.`,
				)
			const embed = new RichEmbed()
				.setColor(15844367)
				.setDescription(message.cleanContent)
				.setAuthor(message.author.tag, message.author.displayAvatarURL)
				.setTimestamp(new Date())
				.setFooter(`⭐ 1 | ${message.id}`)
				.setImage(image)
			await starChannel.send({ embed })
		}
	}

	// Here we add the this.extension function to check if there's anything attached to the message.
	extension(reaction, attachment) {
		const imageLink = attachment.split('.')
		const typeOfImage = imageLink[imageLink.length - 1]
		const image = /(jpg|jpeg|png|gif)/gi.test(typeOfImage)

		if (!image) return ''

		return attachment
	}
}
