import type { INodeProperties } from 'n8n-workflow';

const showOnlyForUserChatUpdate = {
	resource: ['userChat'],
	operation: ['update'],
};

export const userChatUpdateDescription: INodeProperties[] = [
	{
		displayName: 'User Chat ID',
		name: 'userChatId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForUserChatUpdate,
		},
		description: 'ID of the user chat to be accessed',
	},
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForUserChatUpdate,
		},
		description: 'User chat description',
		routing: {
			send: {
				type: 'body',
				property: 'description',
			},
		},
	},
];
