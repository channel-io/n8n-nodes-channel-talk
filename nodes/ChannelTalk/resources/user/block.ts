import type { INodeProperties } from 'n8n-workflow';

const showOnlyForUserBlock = {
	resource: ['user'],
	operation: ['block', 'unblock'],
};

export const userBlockDescription: INodeProperties[] = [
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForUserBlock,
		},
		description: 'ID of the user to block or unblock',
	},
];
