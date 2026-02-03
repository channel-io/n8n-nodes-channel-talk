import type { INodeProperties } from 'n8n-workflow';

const showOnlyForUserChatGet = {
	resource: ['userChat'],
	operation: ['get'],
};

export const userChatGetDescription: INodeProperties[] = [
	{
		displayName: 'User Chat ID',
		name: 'userChatId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForUserChatGet,
		},
		description: 'ID of the user chat to be retrieved',
	},
];
