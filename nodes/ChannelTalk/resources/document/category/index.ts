import type { INodeProperties } from 'n8n-workflow';
import { categoryGetDescription } from './get';
import { categoryGetBySlugDescription } from './getBySlug';
import { categoryBatchGetDescription } from './batchGet';

const showOnlyForCategories = {
	resource: ['category'],
};

export const categoryDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForCategories,
		},
		options: [
			{
				name: 'Batch Get',
				value: 'batchGet',
				action: 'Batch get many categories',
				description: 'Retrieve many categories by their IDs (up to 25)',
				routing: {
					request: {
						method: 'GET',
						url: '/open/v1/spaces/$me/categories/batch',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a category',
				description: 'Retrieve a category by ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/open/v1/spaces/$me/categories/{{$parameter.categoryId}}',
					},
				},
			},
			{
				name: 'Get by Slug',
				value: 'getBySlug',
				action: 'Get a category by slug',
				description: 'Retrieve a category by its slug',
				routing: {
					request: {
						method: 'GET',
						url: '=/open/v1/spaces/$me/categories/${{$parameter.categorySlug}}',
					},
				},
			},
		],
		default: 'get',
	},
	...categoryGetDescription,
	...categoryGetBySlugDescription,
	...categoryBatchGetDescription,
];
