import type { INodeProperties } from 'n8n-workflow';

const showPercentTools = { resource: ['percentTools'] };

export const percentToolsDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showPercentTools,
		},
		options: [
			{
				name: 'Encode Percent',
				value: 'encode',
				action: 'Percent-encode a string',
				description: 'Percent-encode a string',
			},
			{
				name: 'Decode Percent',
				value: 'decode',
				action: 'Percent-decode a string',
				description: 'Percent-decode a string',
			},
			{
				name: 'Normalize Percent',
				value: 'normalize',
				action: 'Normalize percent encoding',
				description: 'Decode then re-encode a string',
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
				...showPercentTools,
				operation: ['encode', 'decode', 'normalize'],
			},
		},
	},
];
