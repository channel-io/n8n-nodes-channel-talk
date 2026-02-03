import type { INodeProperties } from 'n8n-workflow';

const showOnlyForUserChatOpen = {
	resource: ['userChat'],
	operation: ['open'],
};

export const userChatOpenDescription: INodeProperties[] = [
	{
		displayName: 'User Chat ID',
		name: 'userChatId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForUserChatOpen,
		},
		description: 'ID of the user chat to be opened',
	},
	{
		displayName: 'Bot Name',
		name: 'botName',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForUserChatOpen,
		},
		description: 'Name of the bot that opens the user chat',
		routing: {
			send: {
				type: 'query',
				property: 'botName',
			},
		},
	},
];
