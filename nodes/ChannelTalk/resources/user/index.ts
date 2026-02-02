import type { INodeProperties } from 'n8n-workflow';
import { userBlockDescription } from './block';
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
		],
		default: 'block',
	},
	...userBlockDescription,
	...userTokenDescription,
	...userTouchDescription,
];
