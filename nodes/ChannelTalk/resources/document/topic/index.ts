import type { INodeProperties } from 'n8n-workflow';
import { topicListDescription } from './list';
import { topicGetDescription } from './get';
import { topicBatchGetDescription } from './batchGet';
import { topicSearchDescription } from './search';

const showOnlyForTopics = {
	resource: ['topic'],
};

export const topicDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForTopics,
		},
		options: [
			{
				name: 'Batch Get',
				value: 'batchGet',
				action: 'Batch get many topics',
				description: 'Retrieve many topics by their IDs (up to 25)',
				routing: {
					request: {
						method: 'GET',
						url: '/open/v1/spaces/$me/topics/batch',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a topic',
				description: 'Retrieve a topic by ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/open/v1/spaces/$me/topics/{{$parameter.topicId}}',
					},
				},
			},
			{
				name: 'List',
				value: 'list',
				action: 'List all topics',
				description: 'Retrieve a paginated list of topics in a space',
				routing: {
					request: {
						method: 'GET',
						url: '/open/v1/spaces/$me/topics',
					},
				},
			},
			{
				name: 'Search',
				value: 'search',
				action: 'Search topics',
				description: 'Search topics matching a query (at most 10 results)',
				routing: {
					request: {
						method: 'GET',
						url: '/open/v1/spaces/$me/topics/search',
					},
				},
			},
		],
		default: 'list',
	},
	...topicGetDescription,
	...topicBatchGetDescription,
	...topicListDescription,
	...topicSearchDescription,
];
