# On-device recognition

| Item | Value |
| --- | --- |
| Runtime | `@huggingface/transformers@3.8.1`, Apache-2.0 |
| Weights | `HuggingFaceTB/SmolVLM-256M-Instruct`, Apache-2.0 |
| Files | q4 ONNX: `vision_encoder_q4.onnx`, `decoder_model_merged_q4.onnx`, `embed_tokens_q4.onnx`, plus the tokenizer and config files listed in `scripts/fetch-model.mjs` |
| Device | WASM. Not WebGPU. |
| Local id | `SmolVLM-256M-Instruct` under `/models/` |
| License notice | Ship the Apache-2.0 text with the binary. Base models cited by the card include SmolLM2-135M-Instruct and SigLIP, both Apache-2.0. `HuggingFaceM4/the_cauldron` has no license field. See `docs/LICENSES-AUDIT.md`. |

The model card says not to use the model for high-stakes decisions and not to present unreliable text as fact. PShop shows suggestions for confirmation only.

## Build

```bash
node scripts/stage-recognition.mjs
node scripts/fetch-model.mjs
PSHOP_FETCH_MODEL=1 npm run build:ios
npx cap sync ios
```

`stage-recognition` copies `transformers.js` and `ort-wasm-simd-threaded.jsep.wasm` into `public/vendor/transformers/`. `fetch-model` writes `models/CHECKSUMS.sha256` and the weights into `public/models/`. Both directories are gitignored. The installed app never requests them.

If either step is skipped, the worker fails closed and tells the customer to type the foods.

## Rollback

Keep the previous `public/vendor` and `public/models` directories from the last accepted archive. Point the next archive at those files. Do not change `lib/launch-library.mjs` recipe revisions in the same build unless locked plans are snapshotted, which they are when a week is locked.

## Not done

No iPhone latency, memory, or battery measurement. No 100-photo benchmark. Those remain open on the tracker.
