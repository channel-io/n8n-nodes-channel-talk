import type { INodeProperties } from 'n8n-workflow';

const showOnlyForTeamChatUpdate = {
	resource: ['teamChat'],
	operation: ['update'],
};

export const teamChatUpdateDescription: INodeProperties[] = [
	{
		displayName: 'Group ID',
		name: 'groupId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForTeamChatUpdate,
		},
		description: 'The unique identifier of the group to update',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: showOnlyForTeamChatUpdate,
		},
		options: [
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				description: 'New title for the group',
				routing: {
					send: {
						type: 'body',
						property: 'title',
						value: '={{ $parameter.updateFields?.title?.trim() || undefined }}',
					},
				},
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'New description for the group',
				routing: {
					send: {
						type: 'body',
						property: 'description',
						value: '={{ $parameter.updateFields?.description?.trim() || undefined }}',
					},
				},
			},
			{
				displayName: 'Scope',
				name: 'scope',
				type: 'options',
				default: 'private',
				description: 'Visibility scope of the group',
				options: [
					{ name: 'Private', value: 'private' },
					{ name: 'Public', value: 'public' },
				],
				routing: {
					send: {
						type: 'body',
						property: 'scope',
						value: '={{ $parameter.updateFields?.scope ?? undefined }}',
					},
				},
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'New name for the group (used in @mentions)',
				routing: {
					send: {
						type: 'body',
						property: 'name',
						value: '={{ $parameter.updateFields?.name?.trim() || undefined }}',
					},
				},
			},
		],
	},
];
