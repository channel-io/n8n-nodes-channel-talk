import type { INodeProperties } from 'n8n-workflow';

const showOnlyForManagerGet = {
	resource: ['manager'],
	operation: ['get'],
};

export const managerGetDescription: INodeProperties[] = [
	{
		displayName: 'Manager ID',
		name: 'managerId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForManagerGet,
		},
		description: 'The unique identifier of the manager',
	},
];
