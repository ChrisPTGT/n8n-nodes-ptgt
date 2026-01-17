import type { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

export async function getTextInput(
	this: IExecuteFunctions,
	itemIndex: number,
	inputModeParam = 'inputMode',
	textParam = 'text',
	binaryParam = 'binaryProperty',
): Promise<string> {
	const inputMode = this.getNodeParameter(inputModeParam, itemIndex) as string;

	if (inputMode === 'binary') {
		const binaryPropertyName = this.getNodeParameter(binaryParam, itemIndex) as string;
		this.helpers.assertBinaryData(itemIndex, binaryPropertyName);
		const buffer = await this.helpers.getBinaryDataBuffer(itemIndex, binaryPropertyName);
		return buffer.toString('utf8');
	}

	return this.getNodeParameter(textParam, itemIndex) as string;
}

export async function getBase64Input(
	this: IExecuteFunctions,
	itemIndex: number,
	inputModeParam = 'base64InputMode',
	textParam = 'base64',
	binaryParam = 'binaryProperty',
): Promise<string> {
	const inputMode = this.getNodeParameter(inputModeParam, itemIndex) as string;

	if (inputMode === 'binary') {
		const binaryPropertyName = this.getNodeParameter(binaryParam, itemIndex) as string;
		this.helpers.assertBinaryData(itemIndex, binaryPropertyName);
		const buffer = await this.helpers.getBinaryDataBuffer(itemIndex, binaryPropertyName);
		return buffer.toString('base64');
	}

	return this.getNodeParameter(textParam, itemIndex) as string;
}

export function getOptionalParameter<T>(
	this: IExecuteFunctions,
	name: string,
	itemIndex: number,
): T | undefined {
	const value = this.getNodeParameter(name, itemIndex);
	if (value === '' || value === undefined || value === null) {
		return undefined;
	}
	return value as T;
}

export function parseJsonValue(
	this: IExecuteFunctions,
	name: string,
	itemIndex: number,
	required = false,
): IDataObject | IDataObject[] | string | number | boolean | null | undefined {
	const value = this.getNodeParameter(name, itemIndex) as
		| IDataObject
		| IDataObject[]
		| string
		| number
		| boolean
		| null
		| undefined;

	if (value === '' || value === undefined || value === null) {
		if (required) {
			throw new NodeOperationError(this.getNode(), `Parameter "${name}" is required.`, {
				itemIndex,
			});
		}
		return undefined;
	}

	if (typeof value !== 'string') {
		return value;
	}

	try {
		return JSON.parse(value) as IDataObject | IDataObject[] | string | number | boolean | null;
	} catch (error) {
		throw new NodeOperationError(this.getNode(), `Parameter "${name}" must be valid JSON.`, {
			itemIndex,
		});
	}
}

export function requireStringParameter(
	this: IExecuteFunctions,
	name: string,
	itemIndex: number,
): string {
	const value = this.getNodeParameter(name, itemIndex) as string;
	if (!value || value.trim() === '') {
		throw new NodeOperationError(this.getNode(), `Parameter "${name}" is required.`, {
			itemIndex,
		});
	}
	return value;
}
