import {NextApiRequest, NextApiResponse} from 'next';
import {APIEmbedField, EmbedBuilder, WebhookClient} from 'discord.js';

import {DiscordWebhookPostI} from '@/typescript/interfaces/DiscordWebhookPostI';

/* **************************************************
 * Post a message to a Discord channel
 * **************************************************
 * url: /api/discord/send/
 * method: POST
 * body: DiscordWebhookPostI
 ************************************************** */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!req.body || req.method !== 'POST') {
    res.status(400).json({error: 'Invalid Request'});
    return;
  }

  if (!process.env.DISCORD_WEBHOOK_URL || !isDiscordWebHook(req.body)) {
    res.status(400).json({error: 'Invalid Request'});
    return;
  }

  const client = new WebhookClient({url: process.env.DISCORD_WEBHOOK_URL});

  try {
    const embed = new EmbedBuilder();
    const fields: APIEmbedField[] = req.body.fields || [];

    if (fields.length === 0) {
      res.status(400).json({error: 'Invalid Request'});
      return;
    }

    // Set title
    embed.setTitle(req.body.title);

    // Set Color
    embed.setColor(0x00ffff);

    // Set fields
    fields.forEach((field: APIEmbedField) => {
      // Only add a field is there is a valid value
      if (field.value) embed.addFields(field);
    });

    // Send the hook
    await client.send({
      content: req.body.title,
      username: process.env.DISCORD_USERNAME,
      avatarURL: process.env.DISCORD_AVATAR_URL,
      embeds: [embed],
    });

    res.status(200).json({success: true});
  } catch (err) {
    res.status(500).json({error: 'Internal Server Error'});
    return;
  }

  function isDiscordWebHook(item: DiscordWebhookPostI): item is DiscordWebhookPostI {
    return (item as DiscordWebhookPostI).title !== undefined && (item as DiscordWebhookPostI).fields !== undefined;
  }
}
