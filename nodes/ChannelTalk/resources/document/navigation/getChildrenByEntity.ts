import type { INodeProperties } from 'n8n-workflow';

const showOnlyForNavigationGetChildrenByEntity = {
	resource: ['navigation'],
	operation: ['getChildrenByEntity'],
};

export const navigationGetChildrenByEntityDescription: INodeProperties[] = [
	{
		displayName: 'Entity Type',
		name: 'entityTypes',
		type: 'options',
		default: 'categories',
		required: true,
		displayOptions: {
			show: showOnlyForNavigationGetChildrenByEntity,
		},
		options: [
			{ name: 'Articles', value: 'articles' },
			{ name: 'Categories', value: 'categories' },
		],
		description: 'The type of entity connected to the navigation node',
	},
	{
		displayName: 'Entity ID',
		name: 'entityID',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForNavigationGetChildrenByEntity,
		},
		description: 'The ID of the entity connected to the navigation node',
	},
	{
		displayName: 'Language',
		name: 'language',
		type: 'string',
		default: '',
		displayOptions: {
			show: showOnlyForNavigationGetChildrenByEntity,
		},
		description: 'Language code to filter results (e.g. "en", "ko")',
		routing: {
			send: {
				type: 'query',
				property: 'language',
				value: '={{ $value?.trim() || undefined }}',
			},
		},
	},
];
