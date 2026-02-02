import type { INodeProperties } from 'n8n-workflow';
import { userChatOpenDescription } from './open';
import { userChatListDescription } from './list';

const showOnlyForUserChats = {
	resource: ['userChat'],
};

export const userChatDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForUserChats,
		},
		options: [
			{
				name: 'Open',
				value: 'open',
				action: 'Open a user chat',
				description: 'Open a user chat',
				routing: {
					request: {
						method: 'PUT',
						url: '=/open/v5/user-chats/{{$parameter.userChatId}}/open',
					},
				},
			},
		],
		default: 'open',
	},
	...userChatOpenDescription,
				name: 'List',
				value: 'list',
				action: 'List user chats',
				description: 'List user chats in managed state',
				routing: {
					request: {
						method: 'GET',
						url: '/open/v5/user-chats',
					},
				},
			},
		],
		default: 'list',
	},
	...userChatListDescription,
];
