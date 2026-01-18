import type { INodeProperties } from 'n8n-workflow';

const showHexTools = { resource: ['hexTools'] };

export const hexToolsDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showHexTools,
		},
		options: [
			{
				name: 'Encode Hex',
				value: 'encode',
				action: 'Hex encode a string',
				description: 'Hex-encode a string',
			},
			{
				name: 'Decode Hex',
				value: 'decode',
				action: 'Hex decode a string',
				description: 'Hex-decode a string',
			},
			{
				name: 'Normalize Hex',
				value: 'normalize',
				action: 'Normalize hex',
				description: 'Validate and normalize a hex string',
			},
		],
		default: 'encode',
	},
	{
		displayName: 'Value',
		name: 'data',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				...showHexTools,
				operation: ['encode', 'decode', 'normalize'],
			},
		},
	},
];
