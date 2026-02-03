import type { INodeProperties } from 'n8n-workflow';

const showOnlyForUserTouch = {
	resource: ['user'],
	operation: ['touch'],
};

export const userTouchDescription: INodeProperties[] = [
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForUserTouch,
		},
		description: 'ID of the user to touch',
	},
];
