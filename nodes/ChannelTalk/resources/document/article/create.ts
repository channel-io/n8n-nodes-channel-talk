import type { INodeProperties } from 'n8n-workflow';

const showOnlyForArticleCreate = {
	resource: ['article'],
	operation: ['create'],
};

export const articleCreateDescription: INodeProperties[] = [
	{
		displayName: 'Language',
		name: 'language',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForArticleCreate,
		},
		description: 'Language code (e.g. "ko", "en")',
		routing: {
			send: {
				type: 'body',
				property: 'language',
			},
		},
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForArticleCreate,
		},
		description: 'Internal name of the article (max 100 characters)',
		routing: {
			send: {
				type: 'body',
				property: 'name',
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: showOnlyForArticleCreate,
		},
		options: [
			{
				displayName: 'Author ID',
				name: 'authorId',
				type: 'string',
				default: '',
				description: 'ID of the author',
				routing: {
					send: {
						type: 'body',
						property: 'authorId',
						value: '={{ $parameter.additionalFields?.authorId?.trim() || undefined }}',
					},
				},
			},
			{
				displayName: 'Body (JSON)',
				name: 'bodyJson',
				type: 'string',
				typeOptions: {
					rows: 5,
				},
				default: '',
				description: 'Body content as JSON array of objects',
				routing: {
					send: {
						type: 'body',
						property: 'body',
						value:
							'={{ $parameter.additionalFields?.bodyJson ? JSON.parse($parameter.additionalFields.bodyJson) : undefined }}',
					},
				},
			},
			{
				displayName: 'Body HTML',
				name: 'bodyHtml',
				type: 'string',
				typeOptions: {
					rows: 5,
				},
				default: '',
				description: 'Body content as HTML string',
				routing: {
					send: {
						type: 'body',
						property: 'bodyHtml',
						value: '={{ $parameter.additionalFields?.bodyHtml?.trim() || undefined }}',
					},
				},
			},
			{
				displayName: 'Subtitle',
				name: 'subtitle',
				type: 'string',
				default: '',
				description: 'Subtitle of the article (max 1000 characters)',
				routing: {
					send: {
						type: 'body',
						property: 'subtitle',
						value: '={{ $parameter.additionalFields?.subtitle?.trim() || undefined }}',
					},
				},
			},
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				description: 'Title of the article (max 1000 characters)',
				routing: {
					send: {
						type: 'body',
						property: 'title',
						value: '={{ $parameter.additionalFields?.title?.trim() || undefined }}',
					},
				},
			},
		],
	},
];
