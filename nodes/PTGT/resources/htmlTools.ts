import type { INodeProperties } from 'n8n-workflow';

const showHtmlTools = { resource: ['htmlTools'] };

export const htmlToolsDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showHtmlTools,
		},
		options: [
			{
				name: 'Encode HTML',
				value: 'encode',
				action: 'Html escape a string',
				description: 'HTML-escape a string',
			},
			{
				name: 'Decode HTML',
				value: 'decode',
				action: 'Html unescape a string',
				description: 'HTML-unescape a string',
			},
			{
				name: 'Normalize HTML',
				value: 'normalize',
				action: 'Normalize HTML',
				description: 'Decode then encode a string',
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
				...showHtmlTools,
				operation: ['encode', 'decode', 'normalize'],
			},
		},
	},
];
