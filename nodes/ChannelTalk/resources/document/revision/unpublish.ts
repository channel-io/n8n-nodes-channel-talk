import type { INodeProperties } from 'n8n-workflow';

const showOnlyForRevisionUnpublish = {
	resource: ['revision'],
	operation: ['unpublish'],
};

export const revisionUnpublishDescription: INodeProperties[] = [
	{
		displayName: 'Article ID',
		name: 'articleId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForRevisionUnpublish,
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
			show: showOnlyForRevisionUnpublish,
		},
		description: 'The unique identifier of the revision to unpublish',
	},
];
