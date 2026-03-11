import type { INodeProperties } from 'n8n-workflow';

const showOnlyForArticleGetById = {
	resource: ['article'],
	operation: ['getById'],
};

export const articleGetByIdDescription: INodeProperties[] = [
	{
		displayName: 'Article ID',
		name: 'articleId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForArticleGetById,
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
			show: showOnlyForArticleGetById,
		},
		description: 'Language code (e.g. "ko", "en")',
		routing: {
			send: {
				type: 'query',
				property: 'language',
			},
		},
	},
];
