import type { INodeProperties } from 'n8n-workflow';

const showOnlyForRevisionList = {
	resource: ['revision'],
	operation: ['list'],
};

export const revisionListDescription: INodeProperties[] = [
	{
		displayName: 'Article ID',
		name: 'articleId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForRevisionList,
		},
		description: 'The unique identifier of the article',
	},
	{
		displayName: 'Language',
		name: 'language',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForRevisionList,
		},
		description: 'Language code (e.g. "ko", "en")',
		routing: {
			send: {
				type: 'query',
				property: 'language',
			},
		},
	},
	{
		displayName: 'Query Options',
		name: 'queryOptions',
		type: 'collection',
		placeholder: 'Add option',
		default: {},
		displayOptions: {
			show: showOnlyForRevisionList,
		},
		options: [
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 50,
				typeOptions: {
					minValue: 1,
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
				displayName: 'Order',
				name: 'order',
				type: 'options',
				default: 'desc',
				options: [
					{
						name: 'Ascending',
						value: 'asc',
					},
					{
						name: 'Descending',
						value: 'desc',
					},
				],
				description: 'Sort order',
				routing: {
					send: {
						type: 'query',
						property: 'order',
						value: '={{ $parameter.queryOptions?.order || undefined }}',
					},
				},
			},
		],
	},
];
