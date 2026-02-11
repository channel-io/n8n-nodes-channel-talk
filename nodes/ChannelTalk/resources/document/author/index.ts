import type { INodeProperties } from 'n8n-workflow';
import { authorListDescription } from './list';
import { authorGetDescription } from './get';
import { authorBatchGetDescription } from './batchGet';

const showOnlyForAuthors = {
	resource: ['author'],
};

export const authorDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForAuthors,
		},
		options: [
			{
				name: 'Batch Get',
				value: 'batchGet',
				action: 'Batch get many authors',
				description: 'Retrieve many authors by their IDs (up to 25)',
				routing: {
					request: {
						method: 'GET',
						url: '/open/v1/spaces/$me/authors/batch',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get an author',
				description: 'Retrieve an author by ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/open/v1/spaces/$me/authors/{{$parameter.authorId}}',
					},
				},
			},
			{
				name: 'List',
				value: 'list',
				action: 'List all authors',
				description: 'Retrieve a paginated list of authors in a space',
				routing: {
					request: {
						method: 'GET',
						url: '/open/v1/spaces/$me/authors',
					},
				},
			},
		],
		default: 'list',
	},
	...authorGetDescription,
	...authorBatchGetDescription,
	...authorListDescription,
];
