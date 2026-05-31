## Description

Removes two pieces of dead frontend code that were unused or incorrectly shaped, reducing maintenance surface and preventing future misuse.

## Type of Change

- [x] 🐛 Bug fix (non-breaking change which fixes an issue)
- [ ] ✨ New feature (non-breaking change which adds functionality)
- [ ] 💥 Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] 📚 Documentation update
- [x] 🔧 Refactoring (no functional changes)
- [ ] ⚡ Performance improvement
- [x] 🧪 Test addition or update

## Related Issues

Closes #554
Closes #555

## Changes Made

### #554 — Remove dead `fetchUserEvents` from `lib/dashboard.ts`

- Confirmed `fetchUserEvents` has no importers (activity page fetches `/v1/events` directly).
- Removed the function along with its unused `BackendStreamEvent` import and `API_BASE_URL` constant.
- The removed helper returned `await res.json()` typed as `BackendStreamEvent[]`, but `GET /v1/users/:publicKey/events` returns `{ data, total, hasMore, limit, offset }` — any future caller would have silently received the wrong shape.

### #555 — Remove orphaned `LiveCounter` component

- Confirmed `Livecounter.tsx` is only referenced by tests; the stream-detail page implements its live claimable counter inline via `setInterval`.
- Deleted `frontend/src/components/Livecounter.tsx`.
- Removed the `LiveCounter` test suite from `components.test.tsx`.

## Testing

### Test Coverage

- [x] Unit tests added/updated
- [ ] Integration tests added/updated
- [x] Manual testing performed

### Test Steps

1. `cd frontend && npm run build` — passes (TypeScript + Next.js production build).
2. `cd frontend && npm test` — all 70 tests pass (16 in `components.test.tsx` after LiveCounter removal).

## Breaking Changes

None. Removed code was not imported by any production path.

## Checklist

- [x] My code follows the project's style guidelines
- [x] I have performed a self-review of my own code
- [x] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [x] My changes generate no new warnings
- [x] I have added tests that prove my fix is effective or that my feature works
- [x] New and existing unit tests pass locally with my changes
- [x] Any dependent changes have been merged and published
- [x] I have checked for breaking changes and documented them if applicable

## Additional Notes

- Activity page fetch logic and the inline stream-detail counter were intentionally left unchanged (out of scope per issue descriptions).
- Commits are split per file for review clarity:
  - `fix(frontend): remove dead fetchUserEvents from dashboard lib (#554)`
  - `fix(frontend): remove orphaned LiveCounter component (#555)`
  - `test(frontend): drop LiveCounter test suite after component removal (#555)`
