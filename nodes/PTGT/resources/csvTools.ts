import type { INodeProperties } from 'n8n-workflow';

const showCsvTools = { resource: ['csvTools'] };

export const csvToolsDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showCsvTools,
		},
		options: [
			{
				name: 'Pretty CSV',
				value: 'pretty',
				action: 'Prettify CSV text',
				description: 'Normalize CSV formatting',
			},
		],
		default: 'pretty',
	},
	{
		displayName: 'Input Mode',
		name: 'inputMode',
		type: 'options',
		options: [
			{ name: 'Text', value: 'text' },
			{ name: 'Binary', value: 'binary' },
		],
		default: 'text',
		displayOptions: {
			show: {
				...showCsvTools,
				operation: ['pretty'],
			},
		},
	},
	{
		displayName: 'Text',
		name: 'text',
		type: 'string',
		default: '',
		description: 'CSV text payload',
		displayOptions: {
			show: {
				...showCsvTools,
				operation: ['pretty'],
				inputMode: ['text'],
			},
		},
		typeOptions: {
			rows: 6,
		},
	},
	{
		displayName: 'Binary Property',
		name: 'binaryProperty',
		type: 'string',
		default: 'data',
		description: 'Binary property name to read text from',
		displayOptions: {
			show: {
				...showCsvTools,
				operation: ['pretty'],
				inputMode: ['binary'],
			},
		},
	},
	{
		displayName: 'Response Format',
		name: 'responseFormat',
		type: 'options',
		options: [
			{ name: 'JSON', value: 'json' },
			{ name: 'Text', value: 'text' },
		],
		default: 'json',
		description: 'Choose JSON or text/plain response',
		displayOptions: {
			show: {
				...showCsvTools,
				operation: ['pretty'],
			},
		},
	},
];
