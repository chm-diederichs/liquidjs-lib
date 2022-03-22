import * as bufferutils from './bufferutils';
import * as crypto from './crypto';

import { Output } from './transaction';

async function nonceHash(pubkey: Buffer, privkey: Buffer): Promise<Buffer> {
  throw new Error('Confidential transactions are not supported.')
}

export async function valueBlindingFactor(
  inValues: string[],
  outValues: string[],
  inGenerators: Buffer[],
  outGenerators: Buffer[],
  inFactors: Buffer[],
  outFactors: Buffer[],
): Promise<Buffer> {
  throw new Error('Confidential transactions are not supported.')
}

export async function valueCommitment(
  value: string,
  gen: Buffer,
  factor: Buffer,
): Promise<Buffer> {
  throw new Error('Confidential transactions are not supported.')
}

export async function assetCommitment(
  asset: Buffer,
  factor: Buffer,
): Promise<Buffer> {
  throw new Error('Confidential transactions are not supported.')
}

export interface UnblindOutputResult {
  value: string;
  valueBlindingFactor: Buffer;
  asset: Buffer;
  assetBlindingFactor: Buffer;
}

export async function unblindOutputWithKey(
  out: Output,
  blindingPrivKey: Buffer,
): Promise<UnblindOutputResult> {
  throw new Error('Confidential transactions are not supported.')
}

export async function unblindOutputWithNonce(
  out: Output,
  nonce: Buffer,
): Promise<UnblindOutputResult> {
  throw new Error('Confidential transactions are not supported.')
}

export interface RangeProofInfoResult {
  ctExp: number;
  ctBits: number;
  minValue: number;
  maxValue: number;
}

export async function rangeProofInfo(
  proof: Buffer,
): Promise<RangeProofInfoResult> {
  throw new Error('Confidential transactions are not supported.')
}

/**
 *  nonceHash from blinding key + ephemeral key and then rangeProof computation
 */
export async function rangeProofWithNonceHash(
  value: string,
  blindingPubkey: Buffer,
  ephemeralPrivkey: Buffer,
  asset: Buffer,
  assetBlindingFactor: Buffer,
  valueBlindFactor: Buffer,
  valueCommit: Buffer,
  scriptPubkey: Buffer,
  minValue?: string,
  exp?: number,
  minBits?: number,
): Promise<Buffer> {
  throw new Error('Confidential transactions are not supported.')
}

/**
 *  rangeProof computation without nonceHash step.
 */
export async function rangeProof(
  value: string,
  nonce: Buffer,
  asset: Buffer,
  assetBlindingFactor: Buffer,
  valueBlindFactor: Buffer,
  valueCommit: Buffer,
  scriptPubkey: Buffer,
  minValue?: string,
  exp?: number,
  minBits?: number,
): Promise<Buffer> {
  throw new Error('Confidential transactions are not supported.')
}

export async function surjectionProof(
  outputAsset: Buffer,
  outputAssetBlindingFactor: Buffer,
  inputAssets: Buffer[],
  inputAssetBlindingFactors: Buffer[],
  seed: Buffer,
): Promise<Buffer> {
  throw new Error('Confidential transactions are not supported.')
}

const CONFIDENTIAL_VALUE = 9; // explicit size of confidential values

export function confidentialValueToSatoshi(value: Buffer): number {
  if (!isUnconfidentialValue(value)) {
    throw new Error(
      'Value must be unconfidential, length or the prefix are not valid',
    );
  }
  const reverseValueBuffer: Buffer = Buffer.allocUnsafe(CONFIDENTIAL_VALUE - 1);
  value.slice(1, CONFIDENTIAL_VALUE).copy(reverseValueBuffer, 0);
  bufferutils.reverseBuffer(reverseValueBuffer);
  return bufferutils.readUInt64LE(reverseValueBuffer, 0);
}

export function satoshiToConfidentialValue(amount: number): Buffer {
  const unconfPrefix: Buffer = Buffer.allocUnsafe(1);
  const valueBuffer: Buffer = Buffer.allocUnsafe(CONFIDENTIAL_VALUE - 1);
  unconfPrefix.writeUInt8(1, 0);
  bufferutils.writeUInt64LE(valueBuffer, amount, 0);
  return Buffer.concat([unconfPrefix, bufferutils.reverseBuffer(valueBuffer)]);
}

export function isUnconfidentialValue(value: Buffer): boolean {
  return value.length === CONFIDENTIAL_VALUE && value.readUInt8(0) === 1;
}
