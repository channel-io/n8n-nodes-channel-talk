import type { INodeProperties } from 'n8n-workflow';
import { messageCreateDescription } from './create';

const showOnlyForMessages = {
	resource: ['message'],
};

export const messageDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForMessages,
		},
		options: [
			{
				name: 'Create (Plain Text)',
				value: 'createPlainText',
				action: 'Send a plain text message',
				description: 'Send a new plain text message to a chat',
				routing: {
					request: {
						method: 'POST',
						url: '=/open/v5/groups/{{$parameter.groupId}}/messages',
					},
				},
			},
			{
				name: 'Create (Blocks)',
				value: 'createBlocks',
				action: 'Send a blocks message',
				description: 'Send a new blocks message to a chat',
				routing: {
					request: {
						method: 'POST',
						url: '=/open/v5/groups/{{$parameter.groupId}}/messages',
					},
				},
			},
		],
		default: 'createPlainText',
	},
	...messageCreateDescription,
];
