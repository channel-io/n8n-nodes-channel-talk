import type { INodeProperties } from 'n8n-workflow';
import { teamChatListDescription } from './list';
import { teamChatGetDescription } from './get';
import { teamChatGetByNameDescription } from './getByName';
import { teamChatUpdateDescription } from './update';
import { teamChatGetSessionsDescription } from './getSessions';
import { teamChatGetMessagesDescription } from './getMessages';
import { teamChatGetMessagesByNameDescription } from './getMessagesByName';
import { teamChatGetMessagesFileDescription } from './getMessagesFile';
import { teamChatGetMessagesFileByNameDescription } from './getMessagesFileByName';
import { teamChatCreateMessageDescription } from './createMessage';
import { teamChatCreateMessageByNameDescription } from './createMessageByName';

const showOnlyForTeamChats = {
	resource: ['teamChat'],
};

export const teamChatDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForTeamChats,
		},
		options: [
			{
				name: 'Create Message (Blocks, by Name)',
				value: 'createMessageBlocksByName',
				action: 'Send a blocks message to a group by name',
				description: 'Send a new blocks message to a team chat group by name',
				routing: {
					request: {
						method: 'POST',
						url: '=/open/v5/groups/@{{$parameter.groupName}}/messages',
					},
				},
			},
			{
				name: 'Create Message (Blocks)',
				value: 'createMessageBlocks',
				action: 'Send a blocks message to a group',
				description: 'Send a new blocks message to a team chat group by ID',
				routing: {
					request: {
						method: 'POST',
						url: '=/open/v5/groups/{{$parameter.groupId}}/messages',
					},
				},
			},
			{
				name: 'Create Message (Plain Text, by Name)',
				value: 'createMessagePlainTextByName',
				action: 'Send a plain text message to a group by name',
				description: 'Send a new plain text message to a team chat group by name',
				routing: {
					request: {
						method: 'POST',
						url: '=/open/v5/groups/@{{$parameter.groupName}}/messages',
					},
				},
			},
			{
				name: 'Create Message (Plain Text)',
				value: 'createMessagePlainText',
				action: 'Send a plain text message to a group',
				description: 'Send a new plain text message to a team chat group by ID',
				routing: {
					request: {
						method: 'POST',
						url: '=/open/v5/groups/{{$parameter.groupId}}/messages',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a group by ID',
				description: 'Retrieve a team chat group by ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/open/v5/groups/{{$parameter.groupId}}',
					},
				},
			},
			{
				name: 'Get (by Name)',
				value: 'getByName',
				action: 'Get a group by name',
				description: 'Retrieve a team chat group by name',
				routing: {
					request: {
						method: 'GET',
						url: '=/open/v5/groups/@{{$parameter.groupName}}',
					},
				},
			},
			{
				name: 'Get Messages',
				value: 'getMessages',
				action: 'List messages in a group',
				description: 'Retrieve a list of messages in a team chat group by ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/open/v5/groups/{{$parameter.groupId}}/messages',
					},
				},
			},
			{
				name: 'Get Messages (by Name)',
				value: 'getMessagesByName',
				action: 'List messages in a group by name',
				description: 'Retrieve a list of messages in a team chat group by name',
				routing: {
					request: {
						method: 'GET',
						url: '=/open/v5/groups/@{{$parameter.groupName}}/messages',
					},
				},
			},
			{
				name: 'Get Messages File',
				value: 'getMessagesFile',
				action: 'Get signed file URL by group ID',
				description: 'Get signed file URL using file key and group ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/open/v5/groups/{{$parameter.groupId}}/messages/file',
					},
				},
			},
			{
				name: 'Get Messages File (by Name)',
				value: 'getMessagesFileByName',
				action: 'Get signed file URL by group name',
				description: 'Get signed file URL using file key and group name',
				routing: {
					request: {
						method: 'GET',
						url: '=/open/v5/groups/@{{$parameter.groupName}}/messages/file',
					},
				},
			},
			{
				name: 'Get Sessions',
				value: 'getSessions',
				action: 'List members in a group',
				description: 'List of members in a team chat group',
				routing: {
					request: {
						method: 'GET',
						url: '=/open/v5/groups/{{$parameter.groupId}}/sessions',
					},
				},
			},
			{
				name: 'List',
				value: 'list',
				action: 'List all groups',
				description: 'List all team chat groups',
				routing: {
					request: {
						method: 'GET',
						url: '/open/v5/groups',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a group',
				description: 'Update a team chat group',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/open/v5/groups/{{$parameter.groupId}}',
					},
				},
			},
		],
		default: 'list',
	},
	...teamChatListDescription,
	...teamChatGetDescription,
	...teamChatGetByNameDescription,
	...teamChatUpdateDescription,
	...teamChatGetSessionsDescription,
	...teamChatGetMessagesDescription,
	...teamChatGetMessagesByNameDescription,
	...teamChatGetMessagesFileDescription,
	...teamChatGetMessagesFileByNameDescription,
	...teamChatCreateMessageDescription,
	...teamChatCreateMessageByNameDescription,
];
