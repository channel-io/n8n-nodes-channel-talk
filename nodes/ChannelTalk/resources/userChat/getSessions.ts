import type { INodeProperties } from 'n8n-workflow';

const showOnlyForUserChatGetSessions = {
	resource: ['userChat'],
	operation: ['getSessions'],
};

export const userChatGetSessionsDescription: INodeProperties[] = [
	{
		displayName: 'User Chat ID',
		name: 'userChatId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForUserChatGetSessions,
		},
		description: 'ID of the user chat',
	},
];
