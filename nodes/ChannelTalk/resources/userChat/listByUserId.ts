import type { INodeProperties } from 'n8n-workflow';

const showOnlyForUserChatListByUserId = {
	resource: ['userChat'],
	operation: ['listByUserId'],
};

export const userChatListByUserIdDescription: INodeProperties[] = [
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForUserChatListByUserId,
		},
		description: 'The unique identifier of the user',
	},
	{
		displayName: 'Query Options',
		name: 'queryOptions',
		type: 'collection',
		placeholder: 'Add option',
		default: {},
		displayOptions: {
			show: showOnlyForUserChatListByUserId,
		},
		options: [
			{
				displayName: 'Sort Order',
				name: 'sortOrder',
				type: 'options',
				default: 'desc',
				description: 'Sort order for results',
				options: [
					{ name: 'Ascending', value: 'asc' },
					{ name: 'Descending', value: 'desc' },
				],
				routing: {
					send: {
						type: 'query',
						property: 'sortOrder',
						value: '={{ $parameter.queryOptions?.sortOrder ?? undefined }}',
					},
				},
			},
			{
				displayName: 'Since',
				name: 'since',
				type: 'string',
				default: '',
				description: 'Pagination cursor from previous response (next value)',
				routing: {
					send: {
						type: 'query',
						property: 'since',
						value: '={{ $parameter.queryOptions?.since?.trim() || undefined }}',
					},
				},
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 50,
				typeOptions: {
					minValue: 1,
					maxValue: 500,
				},
				description: 'Max number of results to return',
				routing: {
					send: {
						type: 'query',
						property: 'limit',
						value: '={{ $parameter.queryOptions?.limit ?? undefined }}',
					},
				},
			},
		],
	},
];
