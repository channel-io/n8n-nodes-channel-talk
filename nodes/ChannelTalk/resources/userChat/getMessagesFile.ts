import type { INodeProperties } from 'n8n-workflow';

const showOnlyForUserChatGetMessagesFile = {
	resource: ['userChat'],
	operation: ['getMessagesFile'],
};

export const userChatGetMessagesFileDescription: INodeProperties[] = [
	{
		displayName: 'User Chat ID',
		name: 'userChatId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForUserChatGetMessagesFile,
		},
		description: 'ID of the user chat to be accessed',
	},
	{
		displayName: 'Key',
		name: 'key',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForUserChatGetMessagesFile,
		},
		description: 'File key to get signed URL',
		routing: {
			send: {
				type: 'query',
				property: 'key',
			},
		},
	},
];
