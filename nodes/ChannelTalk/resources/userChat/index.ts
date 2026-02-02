import type { INodeProperties } from 'n8n-workflow';
import { userChatOpenDescription } from './open';

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
];
