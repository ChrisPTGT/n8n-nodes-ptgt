import type { INodeProperties } from 'n8n-workflow';

const showJsonTools = { resource: ['jsonTools'] };

const textInputFields: INodeProperties[] = [
	{
		displayName: 'Input Mode',
		name: 'inputMode',
		type: 'options',
		options: [
			{ name: 'Text', value: 'text' },
			{ name: 'Binary', value: 'binary' },
		],
		default: 'text',
	},
	{
		displayName: 'Text',
		name: 'text',
		type: 'string',
		default: '',
		description: 'Plain text payload',
		displayOptions: {
			show: {
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
				inputMode: ['binary'],
			},
		},
	},
];

export const jsonToolsDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showJsonTools,
		},
		options: [
			{
				name: 'Extract Key/Value Pairs',
				value: 'extract',
				action: 'Extract key value pairs from text',
				description: 'Parse text lines like "key: value" into JSON',
			},
			{
				name: 'Fix JSON',
				value: 'fix',
				action: 'Fix malformed JSON',
				description: 'Repair malformed JSON string',
			},
			{
				name: 'Flatten JSON',
				value: 'flatten',
				action: 'Flatten JSON to dot notation',
				description: 'Flatten a JSON object or array',
			},
			{
				name: 'JSON to CSV',
				value: 'toCsv',
				action: 'Convert JSON to CSV',
				description: 'Convert JSON to CSV',
			},
			{
				name: 'JSON to HTML',
				value: 'toHtml',
				action: 'Convert JSON to HTML',
				description: 'Convert JSON to HTML',
			},
			{
				name: 'Pretty JSON',
				value: 'pretty',
				action: 'Prettify JSON text',
				description: 'Format JSON text',
			},
		],
		default: 'fix',
	},
	{
		...textInputFields[0],
		displayOptions: {
			show: {
				...showJsonTools,
				operation: ['fix', 'extract', 'pretty'],
			},
		},
	},
	{
		...textInputFields[1],
		displayOptions: {
			show: {
				...showJsonTools,
				operation: ['fix', 'extract', 'pretty'],
				inputMode: ['text'],
			},
		},
	},
	{
		...textInputFields[2],
		displayOptions: {
			show: {
				...showJsonTools,
				operation: ['fix', 'extract', 'pretty'],
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
				...showJsonTools,
				operation: ['pretty'],
			},
		},
	},
	{
		displayName: 'Data (JSON)',
		name: 'data',
		type: 'json',
		default: '',
		required: true,
		description: 'JSON object or array',
		displayOptions: {
			show: {
				...showJsonTools,
				operation: ['flatten', 'toCsv', 'toHtml'],
			},
		},
	},
	{
		displayName: 'Mode',
		name: 'mode',
		type: 'options',
		options: [
			{ name: 'Full Document', value: 'full' },
			{ name: 'Body Only', value: 'body' },
		],
		default: 'full',
		displayOptions: {
			show: {
				...showJsonTools,
				operation: ['toHtml'],
			},
		},
	},
	{
		displayName: 'Options (JSON)',
		name: 'options',
		type: 'json',
		default: '',
		description: 'Optional formatting options',
		displayOptions: {
			show: {
				...showJsonTools,
				operation: ['toHtml'],
			},
		},
	},
];
