import type { INodeProperties } from 'n8n-workflow';
import { userChatOpenDescription } from './open';
import { userChatListDescription } from './list';
import { userChatSnoozeDescription } from './snooze';
import { userChatRemoveDescription } from './remove';
import { userChatGetMessagesFileDescription } from './getMessagesFile';
import { userChatCreateMessageDescription } from './createMessage';
import { userChatGetMeetsMessagesDescription } from './getMeetsMessages';
import { userChatGetMessagesDescription } from './getMessages';
import { userChatGetSessionsDescription } from './getSessions';
import { userChatGetMeetsRecordingDescription } from './getMeetsRecording';
import { userChatAssignToManagerDescription } from './assignToManager';
import { userChatInviteDescription } from './invite';
import { userChatGetCasesDescription } from './getCases';
import { userChatUpdateDescription } from './update';
import { userChatDeleteDescription } from './delete';
import { userChatGetDescription } from './get';
import { userChatCloseDescription } from './close';

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
			{
				name: 'List',
				value: 'list',
				action: 'List user chats',
				description: 'List of user chats in managed state',
				routing: {
					request: {
						method: 'GET',
						url: '=/open/v5/user-chats',
					},
				},
			},
			{
				name: 'Snooze',
				value: 'snooze',
				action: 'Snooze a user chat',
				description: 'Snooze a user chat',
				routing: {
					request: {
						method: 'PUT',
						url: '=/open/v5/user-chats/{{$parameter.userChatId}}/snooze',
					},
				},
			},
			{
				name: 'Remove',
				value: 'remove',
				action: 'Remove a user chat',
				description: 'Remove a user chat',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/open/v5/user-chats/{{$parameter.userChatId}}/remove',
					},
				},
			},
			{
				name: 'Get Messages File',
				value: 'getMessagesFile',
				action: 'Get signed file URL',
				description: 'Get signed file URL using file key',
				routing: {
					request: {
						method: 'GET',
						url: '=/open/v5/user-chats/{{$parameter.userChatId}}/messages/file',
					},
				},
			},
			{
				name: 'Create Message',
				value: 'createMessage',
				action: 'Send a message to a chat',
				description: 'Send a new message to a chat',
				routing: {
					request: {
						method: 'POST',
						url: '=/open/v5/user-chats/{{$parameter.userChatId}}/messages',
					},
				},
			},
			{
				name: 'Get Meets Messages',
				value: 'getMeetsMessages',
				action: 'List messages in STT chat',
				description: 'Retrieve a list of messages in a stt chat',
				routing: {
					request: {
						method: 'GET',
						url: '=/open/v5/user-chats/{{$parameter.userChatId}}/meets/{{$parameter.messageId}}/messages',
					},
				},
			},
			{
				name: 'Get Messages',
				value: 'getMessages',
				action: 'List messages in chat',
				description: 'Retrieve a list of messages in a chat',
				routing: {
					request: {
						method: 'GET',
						url: '=/open/v5/user-chats/{{$parameter.userChatId}}/messages',
					},
				},
			},
			{
				name: 'Get Sessions',
				value: 'getSessions',
				action: 'List members in user chat',
				description: 'List of members in a user chat',
				routing: {
					request: {
						method: 'GET',
						url: '=/open/v5/user-chats/{{$parameter.userChatId}}/sessions',
					},
				},
			},
			{
				name: 'Get Meets Recording',
				value: 'getMeetsRecording',
				action: 'Download call recording',
				description: 'Download a recording of a call meet',
				routing: {
					request: {
						method: 'GET',
						url: '=/open/v5/user-chats/{{$parameter.userChatId}}/meets/{{$parameter.messageId}}/recording',
					},
				},
			},
			{
				name: 'Assign to Manager',
				value: 'assignToManager',
				action: 'Assign a manager to user chat',
				description: 'Assign a manager to a user chat',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/open/v5/user-chats/{{$parameter.userChatId}}/assign-to/managers/{{$parameter.managerId}}',
					},
				},
			},
			{
				name: 'Invite',
				value: 'invite',
				action: 'Invite managers to user chat',
				description: 'Invite managers to a user chat',
				routing: {
					request: {
						method: 'PATCH',
						url: "=/open/v5/user-chats/{{$parameter.userChatId}}/invite?botName={{ encodeURIComponent($parameter.botName || '') }}{{ (() => { const ids = ($parameter.additionalOptions?.managerIds ?? '').toString().split(',').map((id) => id.trim()).filter(Boolean); return ids.length ? '&' + ids.map((id) => 'managerIds=' + encodeURIComponent(id)).join('&') : ''; })() }}",
					},
				},
			},
			{
				name: 'Get Cases',
				value: 'getCases',
				action: 'List user chat cases',
				description: 'List user chat cases within a time range',
				routing: {
					request: {
						method: 'GET',
						url: '=/open/v5/user-chats/cases',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update user chat description',
				description: 'Update user chat description',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/open/v5/user-chats/{{$parameter.userChatId}}',
						body: '={{ $parameter.sendBody !== false && $parameter.requestBody ? { description: $parameter.requestBody.description ?? "" } : undefined }}',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a user chat',
				description: 'Delete a user chat',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/open/v5/user-chats/{{$parameter.userChatId}}',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Retrieve a user chat',
				description: 'Retrieve a user chat',
				routing: {
					request: {
						method: 'GET',
						url: "=/open/v5/user-chats/{{ String($parameter.userChatId ?? '') }}",
					},
				},
			},
			{
				name: 'Close',
				value: 'close',
				action: 'Close a user chat',
				description: 'Close the user chat',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/open/v5/user-chats/{{$parameter.userChatId}}/close',
					},
				},
			},
		],
		default: 'open',
	},
	...userChatOpenDescription,
	...userChatListDescription,
	...userChatSnoozeDescription,
	...userChatRemoveDescription,
	...userChatGetMessagesFileDescription,
	...userChatCreateMessageDescription,
	...userChatGetMeetsMessagesDescription,
	...userChatGetMessagesDescription,
	...userChatGetSessionsDescription,
	...userChatGetMeetsRecordingDescription,
	...userChatAssignToManagerDescription,
	...userChatInviteDescription,
	...userChatGetCasesDescription,
	...userChatUpdateDescription,
	...userChatDeleteDescription,
	...userChatGetDescription,
	...userChatCloseDescription,
];
