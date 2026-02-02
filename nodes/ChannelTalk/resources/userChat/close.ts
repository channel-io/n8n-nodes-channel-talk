import type { INodeProperties } from 'n8n-workflow';

const showOnlyForUserChatClose = {
	resource: ['userChat'],
	operation: ['close'],
};

export const userChatCloseDescription: INodeProperties[] = [
	{
		displayName: 'User Chat ID',
		name: 'userChatId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForUserChatClose,
		},
		description: 'ID of the user chat to be closed',
	},
	{
		displayName: 'Bot Name',
		name: 'botName',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForUserChatClose,
		},
		description: 'Name of the bot that closes the user chat',
		routing: {
			send: {
				type: 'query',
				property: 'botName',
			},
		},
	},
];
