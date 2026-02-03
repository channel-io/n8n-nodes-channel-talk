import type { INodeProperties } from 'n8n-workflow';

const showOnlyForUserChatGetMessages = {
	resource: ['userChat'],
	operation: ['getMessages'],
};

export const userChatGetMessagesDescription: INodeProperties[] = [
	{
		displayName: 'User Chat ID',
		name: 'userChatId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForUserChatGetMessages,
		},
		description: 'ID of the user chat to be accessed',
	},
	{
		displayName: 'Sort Order',
		name: 'sortOrder',
		type: 'options',
		default: 'desc',
		required: true,
		displayOptions: {
			show: showOnlyForUserChatGetMessages,
		},
		options: [
			{ name: 'Ascending', value: 'asc' },
			{ name: 'Descending', value: 'desc' },
			{ name: 'Both', value: 'both' },
		],
		routing: {
			send: {
				type: 'query',
				property: 'sortOrder',
			},
		},
	},
	{
		displayName: 'Additional Options',
		name: 'additionalOptions',
		type: 'collection',
		placeholder: 'Add option',
		default: {},
		displayOptions: {
			show: showOnlyForUserChatGetMessages,
		},
		options: [
			{
				displayName: 'Since',
				name: 'since',
				type: 'string',
				default: '',
				description: 'Unix timestamp value of the first message to be retrieved',
				routing: {
					send: {
						type: 'query',
						property: 'since',
						value:
							'={{ $parameter.additionalOptions?.since?.trim() || undefined }}',
					},
				},
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 25,
				typeOptions: {
					minValue: 1,
					maxValue: 500,
				},
				description: 'Max number of results',
				routing: {
					send: {
						type: 'query',
						property: 'limit',
						value: '={{ $parameter.additionalOptions?.limit ?? undefined }}',
					},
				},
			},
		],
	},
];
