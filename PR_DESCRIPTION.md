# Fix frontend debug logging, accessibility, dead code, and backend pagination

## Summary

This PR addresses four frontend and backend issues:
- Removes debug console logging from SSE event handling and stream-detail page
- Removes unused `users` query parameter that the backend ignores
- Adds accessible ARIA label to the top-up amount input field
- Removes dead legacy Dashboard component
- Adds `page` parameter support to the stream events endpoint for consistent pagination

## Fixes

Closes #509
Closes #512
Closes #514
Closes #517

## Changes

### Frontend (fix/issues-509-512-514-517)

**Issue #509: Remove debug console logging**
- Removed `console.log('SSE connected:', data.clientId)` from useStreamEvents hook
- Removed `console.error()` calls from SSE message and event parsing
- Removed `console.log()` call from reconnect retry logic
- Removed debug logging from stream-detail event handler
- Simplified onmessage handler which wasn't being used for event processing

**Issue #512: Add accessible label to top-up input**
- Added `aria-label="Top-up amount"` to the number input field on stream detail page
- Maintains existing placeholder as a visual hint, not the sole accessible label
- No visual changes to the UI

**Issue #514: Remove dead components**
- Deleted `frontend/src/components/Dashboard.tsx` which contained hardcoded mock stream data
- This was a legacy component not used by the application (live dashboard is at `app/dashboard/page.tsx`)
- Kept `Progressbar.tsx` and `Livecounter.tsx` as they are actively used in the stream-detail page

### Backend (fix/issues-509-512-514-517)

**Issue #517: Add page parameter support**
- Updated `getStreamEvents` controller to accept optional `page` query parameter
- Maps 1-based page number to offset: `offset = (page - 1) * limit`
- Page parameter is only used when `offset` and `cursor` are not provided
- Maintains full backward compatibility with existing offset/cursor-based pagination
- Mirrors the behavior of the sibling `/v1/events` endpoint

## Test Plan

- [ ] Frontend builds successfully: `cd frontend && npm run build`
- [ ] Backend builds successfully: `cd backend && npm run build`
- [ ] Frontend lint passes: `cd frontend && npm run lint`
- [ ] Backend tests pass: `cd backend && npm run test`
- Manually verify:
  - [ ] Stream detail page loads without console errors
  - [ ] SSE events update stream state without debug logs in browser console
  - [ ] Top-up input is properly labeled in accessibility tools (e.g., browser dev tools, screen readers)
  - [ ] Stream event pagination works with page parameter (e.g., `/v1/streams/123/events?page=2&limit=10`)
  - [ ] Backward compatibility: offset/cursor-based pagination still works

## Architecture Notes

- No schema or API contract changes (page parameter is additive)
- User-scoped events continue to arrive via server-side user subscription (via authenticated public key)
- Removed unused `users` parameter reduces noise in URL construction and server processing

## Branch

`fix/issues-509-512-514-517`

Push ready. Manual PR creation needed.
