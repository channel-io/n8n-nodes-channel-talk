import type { INodeProperties } from 'n8n-workflow';

const showOnlyForUserChatCreateMessage = {
	resource: ['userChat'],
	operation: ['createMessage'],
};

export const userChatCreateMessageDescription: INodeProperties[] = [
	{
		displayName: 'User Chat ID',
		name: 'userChatId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForUserChatCreateMessage,
		},
		description: 'ID of the user chat to be accessed',
	},
	{
		displayName: 'Bot Name',
		name: 'botName',
		type: 'string',
		default: '',
		displayOptions: {
			show: showOnlyForUserChatCreateMessage,
		},
		description: 'Name of the bot sending the message',
		routing: {
			send: {
				type: 'query',
				property: 'botName',
				value: '={{ $parameter.botName?.trim() || undefined }}',
			},
		},
	},
	{
		displayName: 'Blocks (JSON)',
		name: 'blocksJson',
		type: 'json',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForUserChatCreateMessage,
		},
		description: 'JSON array of message blocks (e.g. [{"type":"text","value":"Hello"}])',
		routing: {
			send: {
				type: 'body',
				property: 'blocks',
			},
		},
	},
	{
		displayName: 'Message Options',
		name: 'messageOptions',
		type: 'collection',
		placeholder: 'Add option',
		default: {},
		displayOptions: {
			show: showOnlyForUserChatCreateMessage,
		},
		options: [
			{
				displayName: 'Options',
				name: 'options',
				type: 'multiOptions',
				default: [],
				options: [
					{ name: 'Act As Manager', value: 'actAsManager' },
					{ name: 'Do Not Post', value: 'doNotPost' },
					{ name: 'Do Not Search', value: 'doNotSearch' },
					{ name: 'Do Not Send App', value: 'doNotSendApp' },
					{ name: 'Immutable', value: 'immutable' },
					{ name: 'Private', value: 'private' },
					{ name: 'Silent', value: 'silent' },
				],
				description: 'Message options to apply',
				routing: {
					send: {
						type: 'body',
						property: 'options',
						value:
							'={{ (() => { const value = $parameter.messageOptions?.options; if (Array.isArray(value)) { const filtered = value.filter((option) => option !== ""); return filtered.length ? filtered : undefined; } return value ? [value] : undefined; })() }}',
					},
				},
			},
		],
	},
];
