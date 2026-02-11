import type { INodeProperties } from 'n8n-workflow';

const showOnlyForCategoryGetBySlug = {
	resource: ['category'],
	operation: ['getBySlug'],
};

export const categoryGetBySlugDescription: INodeProperties[] = [
	{
		displayName: 'Category Slug',
		name: 'categorySlug',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForCategoryGetBySlug,
		},
		description: 'The slug of the category to retrieve',
	},
];
