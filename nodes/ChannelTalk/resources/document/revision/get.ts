import type { INodeProperties } from 'n8n-workflow';

const showOnlyForRevisionGet = {
	resource: ['revision'],
	operation: ['get'],
};

export const revisionGetDescription: INodeProperties[] = [
	{
		displayName: 'Article ID',
		name: 'articleId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForRevisionGet,
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
			show: showOnlyForRevisionGet,
		},
		description: 'The unique identifier of the revision',
	},
];
