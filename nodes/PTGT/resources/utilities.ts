import type { INodeProperties } from 'n8n-workflow';

const showUtilities = { resource: ['utilities'] };

export const utilitiesDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showUtilities,
		},
		options: [
			{
				name: 'Generate MD5',
				value: 'md5',
				action: 'Generate an MD5 hash',
				description: 'Generate an MD5 hash for a string',
			},
			{
				name: 'Generate UUID',
				value: 'uuidGenerate',
				action: 'Generate a UUID',
				description: 'Generate a UUID v4',
			},
		],
		default: 'md5',
	},
	{
		displayName: 'Value',
		name: 'data',
		type: 'string',
		default: '',
		required: true,
		description: 'Value to hash.',
		displayOptions: {
			show: {
				...showUtilities,
				operation: ['md5'],
			},
		},
	},
];
