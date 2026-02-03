import type { INodeProperties } from 'n8n-workflow';

const showOnlyForManagerUpdateStatus = {
	resource: ['manager'],
	operation: ['updateStatus'],
};

export const managerUpdateStatusDescription: INodeProperties[] = [
	{
		displayName: 'Manager ID',
		name: 'managerId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForManagerUpdateStatus,
		},
		description: 'The unique identifier of the manager',
	},
	{
		displayName: 'Status',
		name: 'status',
		type: 'options',
		default: 'active',
		required: true,
		displayOptions: {
			show: showOnlyForManagerUpdateStatus,
		},
		options: [
			{ name: 'Active', value: 'active' },
			{ name: 'Away', value: 'away' },
			{ name: 'Offline', value: 'offline' },
		],
		description: 'The new status of the manager',
		routing: {
			send: {
				type: 'body',
				property: 'status',
			},
		},
	},
];
