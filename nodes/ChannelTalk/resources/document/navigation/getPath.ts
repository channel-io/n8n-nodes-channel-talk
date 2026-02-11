import type { INodeProperties } from 'n8n-workflow';

const showOnlyForNavigationGetPath = {
	resource: ['navigation'],
	operation: ['getPath'],
};

export const navigationGetPathDescription: INodeProperties[] = [
	{
		displayName: 'Navigation Node ID',
		name: 'navNodeID',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForNavigationGetPath,
		},
		description: 'The unique identifier of the navigation node',
	},
	{
		displayName: 'Language',
		name: 'language',
		type: 'string',
		default: '',
		displayOptions: {
			show: showOnlyForNavigationGetPath,
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
