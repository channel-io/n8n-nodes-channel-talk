import type { INodeProperties } from 'n8n-workflow';
import { navigationGetFullTreeDescription } from './getFullTree';
import { navigationGetChildrenByEntityDescription } from './getChildrenByEntity';
import { navigationGetPathByEntityDescription } from './getPathByEntity';
import { navigationGetChildrenDescription } from './getChildren';
import { navigationGetPathDescription } from './getPath';

const showOnlyForNavigation = {
	resource: ['navigation'],
};

export const navigationDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForNavigation,
		},
		options: [
			{
				name: 'Get Children',
				value: 'getChildren',
				action: 'Get children of a navigation node',
				description: 'Retrieve the direct children of a navigation node by ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/open/v1/spaces/$me/nav-nodes/{{$parameter.navNodeID}}/$children',
					},
				},
			},
			{
				name: 'Get Children by Entity',
				value: 'getChildrenByEntity',
				action: 'Get children of a navigation node by entity',
				description: 'Retrieve the direct children of a navigation node by entity type and ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/open/v1/spaces/$me/nav-nodes/${{$parameter.entityTypes}}/{{$parameter.entityID}}/$children',
					},
				},
			},
			{
				name: 'Get Full Tree',
				value: 'getFullTree',
				action: 'Get full navigation tree',
				description: 'Retrieve all navigation nodes in the space',
				routing: {
					request: {
						method: 'GET',
						url: '/open/v1/spaces/$me/nav-nodes/$all',
					},
				},
			},
			{
				name: 'Get Path',
				value: 'getPath',
				action: 'Get path of a navigation node',
				description: 'Retrieve the path from root to a navigation node by ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/open/v1/spaces/$me/nav-nodes/{{$parameter.navNodeID}}/$path',
					},
				},
			},
			{
				name: 'Get Path by Entity',
				value: 'getPathByEntity',
				action: 'Get path of a navigation node by entity',
				description: 'Retrieve the path from root to a navigation node by entity type and ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/open/v1/spaces/$me/nav-nodes/${{$parameter.entityTypes}}/{{$parameter.entityID}}/$path',
					},
				},
			},
		],
		default: 'getFullTree',
	},
	...navigationGetFullTreeDescription,
	...navigationGetChildrenByEntityDescription,
	...navigationGetPathByEntityDescription,
	...navigationGetChildrenDescription,
	...navigationGetPathDescription,
];
