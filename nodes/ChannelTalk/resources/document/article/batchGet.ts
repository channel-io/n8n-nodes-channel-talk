import type { INodeProperties } from 'n8n-workflow';

const showOnlyForArticleBatchGet = {
	resource: ['article'],
	operation: ['batchGet'],
};

export const articleBatchGetDescription: INodeProperties[] = [
	{
		displayName: 'Article IDs',
		name: 'articleIds',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForArticleBatchGet,
		},
		description: 'Comma-separated list of article IDs (max 25)',
		routing: {
			send: {
				type: 'query',
				property: 'ids[]',
				value:
					'={{ $parameter.articleIds.split(",").map((id: string) => id.trim()).filter((id: string) => id) }}',
			},
		},
	},
	{
		displayName: 'Language',
		name: 'language',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForArticleBatchGet,
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
