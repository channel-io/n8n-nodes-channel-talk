import type { INodeProperties } from 'n8n-workflow';

const showOnlyForCategoryGet = {
	resource: ['category'],
	operation: ['get'],
};

export const categoryGetDescription: INodeProperties[] = [
	{
		displayName: 'Category ID',
		name: 'categoryId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForCategoryGet,
		},
		description: 'The unique identifier of the category',
	},
];
