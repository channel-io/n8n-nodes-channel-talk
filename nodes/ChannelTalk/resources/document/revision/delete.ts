import type { INodeProperties } from 'n8n-workflow';

const showOnlyForRevisionDelete = {
	resource: ['revision'],
	operation: ['delete'],
};

export const revisionDeleteDescription: INodeProperties[] = [
	{
		displayName: 'Article ID',
		name: 'articleId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForRevisionDelete,
		},
		description: 'The unique identifier of the article',
	},
	{
		displayName: 'Revision ID',
		name: 'revisionId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForRevisionDelete,
		},
		description: 'The unique identifier of the revision to delete. Published revisions cannot be deleted.',
	},
];
