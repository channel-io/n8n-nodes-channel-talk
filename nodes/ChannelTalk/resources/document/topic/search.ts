import type { INodeProperties } from 'n8n-workflow';

const showOnlyForTopicSearch = {
	resource: ['topic'],
	operation: ['search'],
};

export const topicSearchDescription: INodeProperties[] = [
	{
		displayName: 'Query',
		name: 'searchQuery',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForTopicSearch,
		},
		description: 'Search query to find matching topics (returns at most 10 results)',
		routing: {
			send: {
				type: 'query',
				property: 'query',
			},
		},
	},
];
