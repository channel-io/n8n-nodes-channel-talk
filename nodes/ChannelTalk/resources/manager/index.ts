import type { INodeProperties } from 'n8n-workflow';
import { managerListDescription } from './list';
import { managerGetDescription } from './get';

const showOnlyForManagers = {
	resource: ['manager'],
};

export const managerDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForManagers,
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				action: 'Get a manager',
				description: 'Retrieve a manager by ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/open/v5/managers/{{$parameter.managerId}}',
					},
				},
			},
			{
				name: 'List',
				value: 'list',
				action: 'List all managers',
				description: 'List all managers in the channel',
				routing: {
					request: {
						method: 'GET',
						url: '/open/v5/managers',
					},
				},
			},
		],
		default: 'list',
	},
	...managerGetDescription,
	...managerListDescription,
];
