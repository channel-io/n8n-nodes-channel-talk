import type { INodeProperties } from 'n8n-workflow';

const showOnlyForUserChatDelete = {
	resource: ['userChat'],
	operation: ['delete'],
};

export const userChatDeleteDescription: INodeProperties[] = [
	{
		displayName: 'User Chat ID',
		name: 'userChatId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForUserChatDelete,
		},
		description: 'ID of the user chat to be deleted',
	},
];
