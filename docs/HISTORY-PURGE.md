# History purge runbook

Status: executed on October 26, 2026. `main` was rewritten and force-pushed. The rewritten tip before the follow-up checklist update was `9080341994513e03014f49e8afdd9fbb3c4b7bfc`. Do not run this rewrite again. GitHub `refs/pull/1/head` can still reach the pre-rewrite commits until GitHub Support clears cached objects.

The commands below are the record of the rewrite that was run. Do not run them again.

The working tree no longer contains the third-party screenshots or the reference pages, and those paths are not reachable from `main`.

## Paths found in history

Every commit and every remote branch was checked (`git rev-list --all`, `git ls-tree -r` on each commit, `git ls-remote --heads origin`). The only remote branch is `main`. There are no tags.

`ed6a55cfcdef9c78663bca12fb0158794820b93d` ("Initialize PantryShop project documentation") contains none of the paths below. Its `README.md` already describes them.

`ba6096cf19dd460ee560405db8182e729b83212c` and `89657c1a9861637da908dd61b058b845af419bda` (current `origin/main`) both contain exactly these paths:

| Path | Blob | What it is |
| --- | --- | --- |
| `docs/faceprints/build_mise_faceprints.py` | `da03a05f2f209c0415f2d09314e8663702eaca50` | Script that measured another product's screens |
| `docs/faceprints/mise-annotated-contact-sheet.png` | `543dbdf11f14436f45c9736f4af9b829d8a46539` | Contact sheet of those screens |
| `docs/faceprints/mise-screen-map.json` | `3fc76065de449ba9f70c3a0b8f201a164203efb9` | Screen map, crops, and visual hashes |
| `docs/faceprints/food-photography-prompts.json` | `851405d66214ddf0215a13b52f702a4c6d1e3d55` | Original photo prompts, stored under the old directory |
| `docs/faceprints/pumpkin-photography-prompts.json` | `591f2847d7c5094f5a355e2411be0174d5113220` | Original photo prompts, stored under the old directory |
| `public/reference/mise-annotated-contact-sheet.png` | `543dbdf11f14436f45c9736f4af9b829d8a46539` | Same contact-sheet blob as the docs copy |
| `public/reference/mise-faceprint.html` | `97d21bc561bfe68f8e3a175f762c66c83f4c237d` | Public page that displayed the screens |
| `public/reference/mise-screen-map.json` | `3fc76065de449ba9f70c3a0b8f201a164203efb9` | Same screen-map blob as the docs copy |

The two PNG paths share one blob. The two JSON paths share one blob. Removing only one path leaves the other path in history.

This cleanup moves the two prompt files to `docs/photography/`. Those new paths are not third-party assets. They must survive the purge. That only happens if the purge runs on history that already contains this cleanup commit. Purging `docs/faceprints/` before this commit is on the branch deletes the only copy of the prompt records.

## Prose that path deletion does not remove

These commits mention the other product in files that this purge should keep:

- `README.md` in `ed6a55c`, `ba6096c`, and `89657c1`
- `docs/APP_STORE_RELEASE_CHECKLIST.md` and `docs/APP_STORE_RELEASE_TRACKER.csv` in `89657c1` only

Do not replace the four letters `mise` globally. They are the last four letters of `Promise`, and a substring replace would corrupt the source. Use the full lines in the replacements file below.

## Commands

Install `git-filter-repo` locally. Run this on a mirror clone, not on a normal working copy, and not from the agent environment.

```bash
git clone --mirror git@github.com:pmaxx2023/PantryShop.git pantryshop-mirror.git
cd pantryshop-mirror.git

git filter-repo --invert-paths \
  --path docs/faceprints/build_mise_faceprints.py \
  --path docs/faceprints/food-photography-prompts.json \
  --path docs/faceprints/mise-annotated-contact-sheet.png \
  --path docs/faceprints/mise-screen-map.json \
  --path docs/faceprints/pumpkin-photography-prompts.json \
  --path public/reference/mise-annotated-contact-sheet.png \
  --path public/reference/mise-faceprint.html \
  --path public/reference/mise-screen-map.json
```

Save the following as `/tmp/pshop-history-replacements.txt`. Each line is `literal==>replacement`. The apostrophe in `mise’s` is U+2019, the character that is actually in the old README.

```
A mise-inspired meal planner==>A meal planner
The source faceprint covers five published mise mobile views and 39 measured regions, with source URLs, crop coordinates, normalized geometry and DCT visual hashes. See docs/faceprints/ or the published /reference/mise-faceprint.html.==>
Published screenshots establish visible layout and controls, not hidden behavior or complete incumbent parity. ==>
This implementation does not include mise’s proprietary recipe catalog==>This implementation does not include a third-party recipe catalog
docs/faceprints/pumpkin-photography-prompts.json==>docs/photography/pumpkin-photography-prompts.json
mise screenshots, faceprint reference pages and competitor branding==>third-party product screenshots, screen maps, and competitor branding
```

`filter-repo` removes `origin` after the first run so a later push is deliberate. The second run needs `--force` for that reason. `--force` here only rewrites the local mirror.

```bash
git filter-repo --force --replace-text /tmp/pshop-history-replacements.txt
```

Check the mirror before any push:

```bash
git rev-list --all --objects | awk 'NF>1 {print $2}' | grep -E 'mise|faceprint' || echo 'no mise/faceprint paths'
git log --all -S 'mise-inspired' --oneline
git log --all -S 'faceprint' --oneline
git log -1 --stat
```

The path search should print `no mise/faceprint paths`. The two `-S` searches should print nothing. `docs/photography/` should still be in the tip commit. `git log -1 --stat` should show the cleanup, not an empty root.

## What a force-push changes

Checked October 26, 2026:

| Item | State |
| --- | --- |
| Remote branches | `main` only (`origin/HEAD` → `main`) |
| Tags | None |
| Open pull requests | None (`gh pr list --state all` was empty; `open_issues_count` was 0) |
| Forks | 0 |
| Visibility | Public |

A force-push of the rewritten `main` replaces every commit SHA on that branch, from the root through the cleanup. Anyone with a clone of the public repository already has the old commits. A force-push does not erase those clones, search-engine copies, or GitHub's cached views of unreachable commits. GitHub keeps dangling commits until garbage collection. Purging them from github.com means a GitHub Support request to clear cached objects, after the force-push.

This cleanup is opened as a pull request. GitHub stores that pull request as `refs/pull/<n>/head` (and a merge ref). Those refs keep the parent commits, including the screenshot blobs, reachable even after `main` is rewritten. Force-pushing only `main` does not update the pull-request branch. Merging an unrebased pull-request branch back into the purged `main` puts the files into history again.

Do this in order:

1. Merge the cleanup so the tip of `main` no longer has the files and does have `docs/photography/`.
2. Run the mirror commands above on that resulting `main`.
3. Review the checks.
4. Re-add the remote and force-push only when that review looks right:

```bash
git remote add origin git@github.com:pmaxx2023/PantryShop.git
git push --force origin refs/heads/main:refs/heads/main
```

5. Do not merge any branch that was created from the old history. Rebase it onto the rewritten `main`, or delete it.
6. After the push, ask GitHub Support to drop the unreachable objects and the pull-request cache if the screenshots must be unrecoverable from github.com. Then make the repository private, which is a separate owner step.

That force-push has been done. Immediately before it, the remote had only `main`, no tags, no open pull requests, and no forks. Pull request #1 was already merged. `refs/pull/1/head` still points at the pre-rewrite commits.
