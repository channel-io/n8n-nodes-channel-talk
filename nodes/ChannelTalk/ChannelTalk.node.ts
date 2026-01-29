import { type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { messageDescription } from './resources/message';

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
						name: 'Message',
						value: 'message',
					},
				],
				default: 'message',
			},
			...messageDescription,
		],
	};
}
