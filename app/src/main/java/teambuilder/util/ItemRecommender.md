# ItemRecommender

## What it does

This algorithm recommends which missing items you should acquire next, based on how frequently they appear alongside items you already own.

## Inputs

- **ownedItems** – the set of items you already have.
- **objects** – a list of groups, each containing exactly 4 items.

## How it works

1. For each object, calculate a **weight** = the number of items in that object you already own.
2. For each item in that object that you **don't** own, add the weight to that item's score.
3. Rank all missing items by their total score (highest first).

## Why the weighting matters

Objects that share more items with your owned list are considered more relevant to you. A missing item that frequently co-occurs with items you already have gets a higher score than one that only appears in objects with no overlap.

## Example

Owned: `{A, B, C}`

| Object | Weight | Missing items scored |
|--------|--------|---------------------|
| {A, B, D, E} | 2 | D +2, E +2 |
| {A, C, D, F} | 2 | D +2, F +2 |
| {X, Y, Z, D} | 0 | X +0, Y +0, Z +0, D +0 |
| {B, C, D, G} | 2 | D +2, G +2 |

**Result:** D scores 6, E/F/G score 2, X/Y/Z score 0. The algorithm recommends **D** as the best next item.
