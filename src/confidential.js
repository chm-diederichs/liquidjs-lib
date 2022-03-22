'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : new P(function(resolve) {
              resolve(result.value);
            }).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importStar =
  (this && this.__importStar) ||
  function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result['default'] = mod;
    return result;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const bufferutils = __importStar(require('./bufferutils'));
const crypto = __importStar(require('./crypto'));
function nonceHash(pubkey, privkey) {
  throw new Error('Confidential transactions are not supported.')
}
function valueBlindingFactor(
  inValues,
  outValues,
  inGenerators,
  outGenerators,
  inFactors,
  outFactors,
) {
  throw new Error('Confidential transactions are not supported.')
}
exports.valueBlindingFactor = valueBlindingFactor;
function valueCommitment(value, gen, factor) {
  throw new Error('Confidential transactions are not supported.')
}
exports.valueCommitment = valueCommitment;
function assetCommitment(asset, factor) {
  throw new Error('Confidential transactions are not supported.')
}
exports.assetCommitment = assetCommitment;
function unblindOutputWithKey(out, blindingPrivKey) {
  throw new Error('Confidential transactions are not supported.')
}
exports.unblindOutputWithKey = unblindOutputWithKey;
function unblindOutputWithNonce(out, nonce) {
  throw new Error('Confidential transactions are not supported.')
}
exports.unblindOutputWithNonce = unblindOutputWithNonce;
function rangeProofInfo(proof) {
  throw new Error('Confidential transactions are not supported.')
}
exports.rangeProofInfo = rangeProofInfo;
/**
 *  nonceHash from blinding key + ephemeral key and then rangeProof computation
 */
function rangeProofWithNonceHash(
  value,
  blindingPubkey,
  ephemeralPrivkey,
  asset,
  assetBlindingFactor,
  valueBlindFactor,
  valueCommit,
  scriptPubkey,
  minValue,
  exp,
  minBits,
) {
  throw new Error('Confidential transactions are not supported.')
}
exports.rangeProofWithNonceHash = rangeProofWithNonceHash;
/**
 *  rangeProof computation without nonceHash step.
 */
function rangeProof(
  value,
  nonce,
  asset,
  assetBlindingFactor,
  valueBlindFactor,
  valueCommit,
  scriptPubkey,
  minValue,
  exp,
  minBits,
) {
  throw new Error('Confidential transactions are not supported.')
}
exports.rangeProof = rangeProof;
function surjectionProof(
  outputAsset,
  outputAssetBlindingFactor,
  inputAssets,
  inputAssetBlindingFactors,
  seed,
) {
  throw new Error('Confidential transactions are not supported.')
}
exports.surjectionProof = surjectionProof;
const CONFIDENTIAL_VALUE = 9; // explicit size of confidential values
function confidentialValueToSatoshi(value) {
  if (!isUnconfidentialValue(value)) {
    throw new Error(
      'Value must be unconfidential, length or the prefix are not valid',
    );
  }
  const reverseValueBuffer = Buffer.allocUnsafe(CONFIDENTIAL_VALUE - 1);
  value.slice(1, CONFIDENTIAL_VALUE).copy(reverseValueBuffer, 0);
  bufferutils.reverseBuffer(reverseValueBuffer);
  return bufferutils.readUInt64LE(reverseValueBuffer, 0);
}
exports.confidentialValueToSatoshi = confidentialValueToSatoshi;
function satoshiToConfidentialValue(amount) {
  const unconfPrefix = Buffer.allocUnsafe(1);
  const valueBuffer = Buffer.allocUnsafe(CONFIDENTIAL_VALUE - 1);
  unconfPrefix.writeUInt8(1, 0);
  bufferutils.writeUInt64LE(valueBuffer, amount, 0);
  return Buffer.concat([unconfPrefix, bufferutils.reverseBuffer(valueBuffer)]);
}
exports.satoshiToConfidentialValue = satoshiToConfidentialValue;
function isUnconfidentialValue(value) {
  return value.length === CONFIDENTIAL_VALUE && value.readUInt8(0) === 1;
}
exports.isUnconfidentialValue = isUnconfidentialValue;
