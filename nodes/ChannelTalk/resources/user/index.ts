import type { INodeProperties } from 'n8n-workflow';
import { userBlockDescription } from './block';
import { userCrudDescription } from './crud';
import { userTokenDescription } from './token';
import { userTouchDescription } from './touch';

const showOnlyForUser = {
	resource: ['user'],
};

export const userDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForUser,
		},
		options: [
			{
				name: 'Block',
				value: 'block',
				action: 'Block a user',
				description: 'Block a user by user ID',
				routing: {
					request: {
						method: 'POST',
						url: '=/open/v5/users/{{$parameter.userId}}/block',
					},
				},
			},
			{
				name: 'Create',
				value: 'create',
				action: 'Create a user',
				description: 'Create a new lead by profile',
				routing: {
					request: {
						method: 'POST',
						url: '/open/v5/users',
					},
				},
			},
			{
				name: 'Create or Update',
				value: 'upsert',
				action: 'Create or update a user by member id',
				description: 'Create a new record, or update the current one if it already exists (upsert)',
				routing: {
					request: {
						method: 'PUT',
						url: '=/open/v5/users/@{{$parameter.memberId}}',
					},
				},
			},
			{
				name: 'Delete (by Member ID)',
				value: 'deleteByMemberId',
				action: 'Delete a user by member id',
				description: 'Delete a user by member ID',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/open/v5/users/@{{$parameter.memberId}}',
					},
				},
			},
			{
				name: 'Delete (by User ID)',
				value: 'deleteByUserId',
				action: 'Delete a user by user id',
				description: 'Delete a user by user ID',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/open/v5/users/{{$parameter.userId}}',
					},
				},
			},
			{
				name: 'Get (by Member ID)',
				value: 'getByMemberId',
				action: 'Get a user by member id',
				description: 'Get a user by member ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/open/v5/users/@{{$parameter.memberId}}',
					},
				},
			},
			{
				name: 'Get (by User ID)',
				value: 'getByUserId',
				action: 'Get a user by user id',
				description: 'Get a user by user ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/open/v5/users/{{$parameter.userId}}',
					},
				},
			},
			{
				name: 'Issue Session JWT',
				value: 'issueSessionJwt',
				action: 'Issue session jwt',
				description: 'Issue a session JWT for a member',
				routing: {
					request: {
						method: 'PUT',
						url: '=/open/v5/users/@{{$parameter.memberId}}/session-jwt/issue',
					},
				},
			},
			{
				name: 'Issue User Token (by Member ID)',
				value: 'issueUserTokenByMemberId',
				action: 'Issue user token by member id',
				description: 'Issue a user token by member ID',
				routing: {
					request: {
						method: 'PUT',
						url: '=/open/v5/users/@{{$parameter.memberId}}/user-token/issue',
					},
				},
			},
			{
				name: 'Issue User Token (by User ID)',
				value: 'issueUserToken',
				action: 'Issue user token by user id',
				description: 'Issue a user token by user ID',
				routing: {
					request: {
						method: 'PUT',
						url: '=/open/v5/users/{{$parameter.userId}}/user-token/issue',
					},
				},
			},
			{
				name: 'Touch',
				value: 'touch',
				action: 'Touch a user',
				description: 'Updates user lastSeenAt, sessionsCount, and daily unique user statistics',
				routing: {
					request: {
						method: 'POST',
						url: '=/open/v5/users/{{$parameter.userId}}/touch',
					},
				},
			},
			{
				name: 'Unblock',
				value: 'unblock',
				action: 'Unblock a user',
				description: 'Unblock a user by user ID',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/open/v5/users/{{$parameter.userId}}/block',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a user',
				description: 'Update a user by user ID',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/open/v5/users/{{$parameter.userId}}',
					},
				},
			},
		],
		default: 'getByUserId',
	},
	...userBlockDescription,
	...userCrudDescription,
	...userTokenDescription,
	...userTouchDescription,
];
