import type { INodeProperties } from 'n8n-workflow';

const showOnlyForUserChatGetCases = {
	resource: ['userChat'],
	operation: ['getCases'],
};

export const userChatGetCasesDescription: INodeProperties[] = [
	{
		displayName: 'From',
		name: 'from',
		type: 'number',
		default: 0,
		required: true,
		displayOptions: {
			show: showOnlyForUserChatGetCases,
		},
		description: 'Start time of the time range (Unix timestamp in milliseconds)',
		routing: {
			send: {
				type: 'query',
				property: 'from',
			},
		},
	},
	{
		displayName: 'To',
		name: 'to',
		type: 'number',
		default: 0,
		required: true,
		displayOptions: {
			show: showOnlyForUserChatGetCases,
		},
		description: 'End time of the time range (Unix timestamp in milliseconds)',
		routing: {
			send: {
				type: 'query',
				property: 'to',
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
			show: showOnlyForUserChatGetCases,
		},
		options: [
			{
				displayName: 'Since',
				name: 'since',
				type: 'string',
				default: '',
				description: 'Cursor for pagination',
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
			{
				displayName: 'Sort Order',
				name: 'sortOrder',
				type: 'options',
				default: 'desc',
				options: [
					{ name: 'Ascending', value: 'asc' },
					{ name: 'Descending', value: 'desc' },
					{ name: 'Both', value: 'both' },
				],
				description: 'Sort order for results',
				routing: {
					send: {
						type: 'query',
						property: 'sortOrder',
						value:
							'={{ $parameter.additionalOptions?.sortOrder ?? undefined }}',
					},
				},
			},
		],
	},
];
