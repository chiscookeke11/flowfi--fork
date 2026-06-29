## Summary
Fixed 4 frontend issues related to testing, modal rendering, and settings functionality.

## Changes Made

### Issue #867 - TopUpModal Unit Tests
- Added comprehensive unit tests for TopUpModal component
- Tests cover input validation, precision filtering, new-total preview, and Enter-to-confirm

### Issue #866 - ScheduleStep Rate Calculation Tests  
- Added unit tests for ScheduleStep rate calculation logic
- Tests verify ratePerSecond/total-seconds for different time units
- Tests confirm EURC uses Euro symbol and XLM uses token suffix in rate/day preview
- Tests validate sec/min/hr formatting threshold branches

### Issue #864 - StreamDetailsModal & CancelConfirmModal Token Amount Rendering
- Fixed raw token amount rendering in StreamDetailsModal and CancelConfirmModal
- Implemented shared formatAmount utility for consistent decimal formatting
- Fixed floating-point subtraction artifacts in remaining balance calculation
- All modals now match formatting used on stream-detail page

### Issue #865 - Settings Display Preferences Implementation
- Implemented functional Display Preferences (Default Token, Amount Format, Decimal Places)
- Created useSettings hook to manage and expose user preferences
- Integrated preferences throughout dashboard and stream detail views
- Settings now properly affect displayed amounts across the app

Closes #867
Closes #866  
Closes #864
Closes #865
