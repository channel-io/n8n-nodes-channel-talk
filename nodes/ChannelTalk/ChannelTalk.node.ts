import { type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { botDescription } from './resources/bot';
import { channelDescription } from './resources/channel';
import { managerDescription } from './resources/manager';
import { teamChatDescription } from './resources/teamChat';
import { userChatDescription } from './resources/userChat';
import { userDescription } from './resources/user';
import { webhookDescription } from './resources/webhook';

export class ChannelTalk implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Channel Talk',
		name: 'channelTalk',
		icon: 'file:../../icons/channel-talk-primary.svg',
		group: ['input'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Send messages to Channel Talk',
		defaults: {
			name: 'Channel Talk',
		},
		usableAsTool: true,
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'channelTalkApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.channel.io',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Bot',
						value: 'bot',
					},
					{
						name: 'Channel',
						value: 'channel',
					},
					{
						name: 'Manager',
						value: 'manager',
					},
					{
						name: 'Team Chat',
						value: 'teamChat',
					},
					{
						name: 'User',
						value: 'user',
					},
					{
						name: 'User Chat',
						value: 'userChat',
					},
					{
						name: 'Webhook',
						value: 'webhook',
					},
				],
				default: 'userChat',
			},
			...botDescription,
			...channelDescription,
			...managerDescription,
			...teamChatDescription,
			...userChatDescription,
			...userDescription,
			...webhookDescription,
		],
	};
}
