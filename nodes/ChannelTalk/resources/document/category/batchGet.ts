import type { INodeProperties } from 'n8n-workflow';

const showOnlyForCategoryBatchGet = {
	resource: ['category'],
	operation: ['batchGet'],
};

export const categoryBatchGetDescription: INodeProperties[] = [
	{
		displayName: 'Category IDs',
		name: 'categoryIds',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForCategoryBatchGet,
		},
		description: 'Comma-separated list of category IDs to retrieve (up to 25)',
		routing: {
			send: {
				type: 'query',
				property: 'ids[]',
				value:
					'={{ $parameter.categoryIds.split(",").map((id: string) => id.trim()).filter((id: string) => id) }}',
			},
		},
	},
];
