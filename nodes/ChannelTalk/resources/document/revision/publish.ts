import type { INodeProperties } from 'n8n-workflow';

const showOnlyForRevisionPublish = {
	resource: ['revision'],
	operation: ['publish'],
};

export const revisionPublishDescription: INodeProperties[] = [
	{
		displayName: 'Article ID',
		name: 'articleId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForRevisionPublish,
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
			show: showOnlyForRevisionPublish,
		},
		description: 'The unique identifier of the revision to publish',
	},
];
