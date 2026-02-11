import type { INodeProperties } from 'n8n-workflow';

const showOnlyForNavigationGetChildren = {
	resource: ['navigation'],
	operation: ['getChildren'],
};

export const navigationGetChildrenDescription: INodeProperties[] = [
	{
		displayName: 'Navigation Node ID',
		name: 'navNodeID',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForNavigationGetChildren,
		},
		description: 'The unique identifier of the navigation node',
	},
	{
		displayName: 'Language',
		name: 'language',
		type: 'string',
		default: '',
		displayOptions: {
			show: showOnlyForNavigationGetChildren,
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
