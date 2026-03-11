import type { INodeProperties } from 'n8n-workflow';

const showOnlyForNavigationGetPathByEntity = {
	resource: ['navigation'],
	operation: ['getPathByEntity'],
};

export const navigationGetPathByEntityDescription: INodeProperties[] = [
	{
		displayName: 'Entity Type',
		name: 'entityTypes',
		type: 'options',
		default: 'categories',
		required: true,
		displayOptions: {
			show: showOnlyForNavigationGetPathByEntity,
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
			show: showOnlyForNavigationGetPathByEntity,
		},
		description: 'The ID of the entity connected to the navigation node',
	},
	{
		displayName: 'Language',
		name: 'language',
		type: 'string',
		default: '',
		displayOptions: {
			show: showOnlyForNavigationGetPathByEntity,
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
