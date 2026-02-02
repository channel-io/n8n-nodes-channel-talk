import type { INodeProperties } from 'n8n-workflow';

const showOnlyForUserChatCreateMessage = {
	resource: ['userChat'],
	operation: ['createMessage'],
};

const jsonParseExpression = '={{$value ? JSON.parse($value) : undefined}}';

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
			},
		},
	},
	{
		displayName: 'Body (JSON)',
		name: 'bodyJson',
		type: 'string',
		typeOptions: {
			rows: 5,
		},
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForUserChatCreateMessage,
		},
		description: 'JSON object with blocks and optional options (e.g. actAsManager, doNotPost)',
		routing: {
			send: {
				type: 'body',
				property: '=',
				value: jsonParseExpression,
			},
		},
	},
];
