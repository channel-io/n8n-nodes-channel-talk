import type { INodeProperties } from 'n8n-workflow';

const showOnlyForUserChatCreateByUserId = {
	resource: ['userChat'],
	operation: ['createByUserId'],
};

export const userChatCreateByUserIdDescription: INodeProperties[] = [
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForUserChatCreateByUserId,
		},
		description: 'The unique identifier of the user to create a chat for',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: showOnlyForUserChatCreateByUserId,
		},
		options: [
			{
				displayName: 'Distinct Key',
				name: 'distinctKey',
				type: 'string',
				default: '',
				description: 'A unique key to prevent duplicate chat creation',
				routing: {
					send: {
						type: 'body',
						property: 'distinctKey',
						value: '={{ $parameter.additionalFields?.distinctKey?.trim() || undefined }}',
					},
				},
			},
			{
				displayName: 'Channel ID',
				name: 'channelId',
				type: 'string',
				default: '',
				description: 'The channel ID for the chat',
				routing: {
					send: {
						type: 'body',
						property: 'channelId',
						value: '={{ $parameter.additionalFields?.channelId?.trim() || undefined }}',
					},
				},
			},
		],
	},
];
