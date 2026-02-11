import type { INodeProperties } from 'n8n-workflow';

const showOnlyForArticleGetBySlug = {
	resource: ['article'],
	operation: ['getBySlug'],
};

export const articleGetBySlugDescription: INodeProperties[] = [
	{
		displayName: 'Slug',
		name: 'slug',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForArticleGetBySlug,
		},
		description: 'The slug of the article',
	},
	{
		displayName: 'Language',
		name: 'language',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForArticleGetBySlug,
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
