import type { INodeProperties } from 'n8n-workflow';

const showOnlyForArticleList = {
	resource: ['article'],
	operation: ['list'],
};

export const articleListDescription: INodeProperties[] = [
	{
		displayName: 'Language',
		name: 'language',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForArticleList,
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
			show: showOnlyForArticleList,
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
				displayName: 'State',
				name: 'state',
				type: 'options',
				default: 'published',
				options: [
					{
						name: 'Published',
						value: 'published',
					},
					{
						name: 'Unpublished',
						value: 'unpublished',
					},
				],
				description: 'State of the article snapshot',
				routing: {
					send: {
						type: 'query',
						property: 'state',
						value: '={{ $parameter.queryOptions?.state || undefined }}',
					},
				},
			},
			{
				displayName: 'Topic ID',
				name: 'topicId',
				type: 'string',
				default: '',
				description: 'Filter by topic ID',
				routing: {
					send: {
						type: 'query',
						property: 'topicId',
						value: '={{ $parameter.queryOptions?.topicId?.trim() || undefined }}',
					},
				},
			},
		],
	},
];
