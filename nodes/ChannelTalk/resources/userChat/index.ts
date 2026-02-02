import type { INodeProperties } from 'n8n-workflow';
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
