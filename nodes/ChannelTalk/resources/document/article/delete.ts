import type { INodeProperties } from 'n8n-workflow';

const showOnlyForArticleDelete = {
	resource: ['article'],
	operation: ['delete'],
};

export const articleDeleteDescription: INodeProperties[] = [
	{
		displayName: 'Article ID',
		name: 'articleId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForArticleDelete,
		},
		description: 'The unique identifier of the article to delete. Articles with published revisions cannot be deleted.',
	},
];
