import type { INodeProperties } from 'n8n-workflow';

const showOnlyForUserChatList = {
	resource: ['userChat'],
	operation: ['list'],
};

export const userChatListDescription: INodeProperties[] = [
	{
		displayName: 'Query Options',
		name: 'queryOptions',
		type: 'collection',
		placeholder: 'Add option',
		default: {},
		displayOptions: {
			show: showOnlyForUserChatList,
		},
		options: [
			{
				displayName: 'State',
				name: 'state',
				type: 'options',
				default: 'opened',
				description: 'Filter user chats by state',
				options: [
					{ name: 'Closed', value: 'closed' },
					{ name: 'Initial', value: 'initial' },
					{ name: 'Missed', value: 'missed' },
					{ name: 'Opened', value: 'opened' },
					{ name: 'Queued', value: 'queued' },
					{ name: 'Snoozed', value: 'snoozed' },
				],
				routing: {
					send: {
						type: 'query',
						property: 'state',
						value: '={{ $parameter.queryOptions?.state ?? undefined }}',
					},
				},
			},
			{
				displayName: 'Sort Order',
				name: 'sortOrder',
				type: 'options',
				default: 'desc',
				description: 'Sort order for results',
				options: [
					{ name: 'Ascending', value: 'asc' },
					{ name: 'Descending', value: 'desc' },
					{ name: 'Both', value: 'both' },
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
