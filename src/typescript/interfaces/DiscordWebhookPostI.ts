import {APIEmbedField} from 'discord.js';

export interface DiscordWebhookPostI {
  title: string;
  fields: APIEmbedField[];
}
