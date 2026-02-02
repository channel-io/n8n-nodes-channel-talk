import type { INodeProperties } from 'n8n-workflow';

const showOnlyForUserChatRemove = {
	resource: ['userChat'],
	operation: ['remove'],
};

export const userChatRemoveDescription: INodeProperties[] = [
	{
		displayName: 'User Chat ID',
		name: 'userChatId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForUserChatRemove,
		},
		description: 'ID of the user chat to be removed',
	},
];
