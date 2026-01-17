import type {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';
import { base64Description } from './resources/base64';
import { csvToolsDescription } from './resources/csvTools';
import { hexToolsDescription } from './resources/hexTools';
import { htmlToolsDescription } from './resources/htmlTools';
import { jsonToolsDescription } from './resources/jsonTools';
import { kvDescription } from './resources/kv';
import { ocrToolsDescription } from './resources/ocrTools';
import { pdfToolsDescription } from './resources/pdfTools';
import { percentToolsDescription } from './resources/percentTools';
import { textToolsDescription } from './resources/textTools';
import { urlToolsDescription } from './resources/urlTools';
import { utilitiesDescription } from './resources/utilities';
import { buildRequest } from './shared/requests';
import { ptgtApiRequest } from './shared/transport';

export class PTGT implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'PostThat -> GetThis',
		name: 'ptgt',
		icon: { light: 'file:../../icons/ptgt.svg', dark: 'file:../../icons/ptgt.dark.svg' },
		group: ['input'],
		version: 1,
		subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
		description: 'PostThat -> GetThis (PTGT) API',
		defaults: {
			name: 'PTGT',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'ptgtApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Base64', value: 'base64' },
					{ name: 'CSV Tools', value: 'csvTools' },
					{ name: 'Hex Tools', value: 'hexTools' },
					{ name: 'HTML Tools', value: 'htmlTools' },
					{ name: 'JSON Tools', value: 'jsonTools' },
					{ name: 'KV', value: 'kv' },
					{ name: 'OCR Tools', value: 'ocrTools' },
					{ name: 'PDF Tools', value: 'pdfTools' },
					{ name: 'Percent Tools', value: 'percentTools' },
					{ name: 'Text Tools', value: 'textTools' },
					{ name: 'URL Tools', value: 'urlTools' },
					{ name: 'Utilities', value: 'utilities' },
				],
				default: 'jsonTools',
			},
			...jsonToolsDescription,
			...csvToolsDescription,
			...textToolsDescription,
			...ocrToolsDescription,
			...utilitiesDescription,
			...base64Description,
			...pdfToolsDescription,
			...kvDescription,
			...urlToolsDescription,
			...htmlToolsDescription,
			...hexToolsDescription,
			...percentToolsDescription,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
			try {
				const { options, responseFormat } = await buildRequest.call(
					this,
					resource,
					operation,
					itemIndex,
				);

				const response = await ptgtApiRequest.call(this, options);

				let output: unknown = response;
				if (responseFormat === 'json' && typeof response === 'string') {
					try {
						output = JSON.parse(response) as unknown;
					} catch (error) {
						throw new NodeOperationError(
							this.getNode(),
							'The API returned text when JSON was expected.',
							{ itemIndex },
						);
					}
				} else if (responseFormat === 'text' && typeof response !== 'string') {
					output = JSON.stringify(response);
				}

				returnData.push({
					json: responseFormat === 'text' ? { text: output } : (output as IDataObject),
				});
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ json: this.getInputData(itemIndex)[0].json, error, pairedItem: itemIndex });
				} else {
					if (error.context) {
						error.context.itemIndex = itemIndex;
						throw error;
					}
					throw new NodeOperationError(this.getNode(), error, { itemIndex });
				}
			}
		}

		return [returnData];
	}
}
