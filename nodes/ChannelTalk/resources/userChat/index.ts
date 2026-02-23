import type { INodeProperties, IDataObject } from 'n8n-workflow';
import { userChatCreateByUserIdDescription } from './createByUserId';
import { userChatListByUserIdDescription } from './listByUserId';
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
			{
				name: 'Create (by User ID)',
				value: 'createByUserId',
				action: 'Create a user chat by user id',
				description: 'Create a new user chat for a specific user',
				routing: {
					request: {
						method: 'POST',
						url: '=/open/v5/users/{{$parameter.userId}}/user-chats',
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
				name: 'Get Meets Messages',
				value: 'getMeetsMessages',
				action: 'List messages in STT chat',
				description: 'Retrieve a list of messages in a stt chat',
				routing: {
					request: {
						method: 'GET',
						url: '=/open/v5/user-chats/{{$parameter.userChatId}}/meets/{{$parameter.messageId}}/messages',
					},
					output: {
						postReceive: [
							async function (this, items, responseData) {
								const returnAll = this.getNodeParameter('returnAll') as boolean;
								if (!returnAll) return items;

								const body = responseData.body as {
									messages?: unknown[];
									next?: string;
									[key: string]: unknown;
								};

								const allMessages: unknown[] = [...(body.messages ?? [])];
								let nextCursor = body.next;

								const userChatId = this.getNodeParameter('userChatId') as string;
								const messageId = this.getNodeParameter('messageId') as string;
								const sortOrder = this.getNodeParameter('sortOrder') as string;
								const baseUrl = `https://api.channel.io/open/v5/user-chats/${userChatId}/meets/${messageId}/messages`;

								while (nextCursor) {
									const nextResponse = (await this.helpers.httpRequestWithAuthentication.call(this, 'channelTalkApi', {
										method: 'GET',
										url: baseUrl,
										qs: {
											sortOrder,
											since: nextCursor,
										},
										json: true,
									})) as {
										messages?: unknown[];
										next?: string;
										[key: string]: unknown;
									};

									allMessages.push(...(nextResponse.messages ?? []));
									nextCursor = nextResponse.next;
								}

								return allMessages.map((message) => ({
									json: message as IDataObject,
								}));
							},
						],
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
				name: 'List (by User ID)',
				value: 'listByUserId',
				action: 'List user chats by user id',
				description: 'List user chats for a specific user',
				routing: {
					request: {
						method: 'GET',
						url: '=/open/v5/users/{{$parameter.userId}}/user-chats',
					},
				},
			},
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
		],
		default: 'open',
	},
	...userChatCreateByUserIdDescription,
	...userChatListByUserIdDescription,
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
