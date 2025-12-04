# Truco Rules Implementation Review

## Issues Identified

### 1. **Critical: Inconsistent Manilha Implementation**

There's a major contradiction between the documented rules and the actual code implementation:

#### Rules Documentation (`src/data/rules.ts`):
- **Line 15**: States "manilhas são fixas (não existe 'vira')"
- Claims fixed hierarchy: 7 Espadas > 1 Paus > 1 Espadas > 7 Ouros
- **This is CORRECT for Truco Gaucho**

#### Code Implementation (`src/utils/cardComparison.ts`):
- **Lines 29-52**: Implements dynamic manilhas based on a vira card
- Uses `isManilha(card, vira)` function
- Manilhas are determined by the card immediately above the vira in the same suit
- **This is WRONG for Truco Gaucho**

#### Game Logic (`src/utils/gameLogic.ts`):
- **Line 44**: Creates a vira card during game initialization
- **This contradicts Truco Gaucho rules**

**Impact**: The game is actually playing Truco with vira (standard Brazilian Truco), NOT Truco Gaucho.

---

### 2. **Missing Envido Implementation**

Envido is only documented in rules but never implemented:

#### Current State:
- Envido mentioned in `src/data/rules.ts` lines 26-37
- Basic scoring rules documented
- **NO implementation in game logic, store, or UI**

#### Missing Features:
- Envido betting mechanics
- "Envido real" (exactly 30 points)
- "Falta envido" (envido against)
- Envido score calculation
- Integration with Truco betting
- UI controls for envido challenges

#### Incomplete Rules Documentation:
Current envido description lacks:
- How envido interacts with Truco challenges
- What happens when both teams call envido
- Scoring for envido (when it's worth 1 point, when 2 points, etc.)
- Flor (three cards of same suit) - may not apply to Gaucho variant

---

### 3. **Card Structure Issues**

#### In `src/data/cards.ts`:
- **Line 9**: Has `isManilha: boolean` field
- **Line 44**: Sets `isManilha: false` initially (to be updated based on vira)
- **This field is unnecessary for Truco Gaucho**

#### Multiple Conflicting Hierarchy Systems:
1. Fixed hierarchy in rankValues (lines 21-32)
2. Dynamic hierarchy based on vira (cardComparison.ts)
3. Fixed manilha hierarchy mentioned in rules

---

## Correct Truco Gaucho Implementation

### Fixed Manilha Hierarchy:
1. **7 of Espadas (Espadão)** - Highest card
2. **1 of Bastos (Pauzão)**
3. **1 of Espadas (Espadilha)**
4. **7 of Ouros (Sete Belo)**

### Manilha Suit Order (among manilhas):
**Ouros < Espadas < Copas < Bastos**

### Non-Manilha Hierarchy (highest to lowest):
**3 > 2 > A > K > Q > J > 10 > 7 > 6 > 5 > 4**
*(Note: 7s and 1s that are manilhas are excluded from this list)*

---

## Recommendations

### Priority 1: Fix Manilha System
1. Remove vira-based logic from `cardComparison.ts`
2. Update `initializeGame()` to remove vira card
3. Implement fixed manilha hierarchy
4. Remove `isManilha` field from Card interface
5. Update game store to remove vira state

### Priority 2: Implement Envido
1. Add envido state to game store
2. Create envido calculation utilities
3. Add envido betting mechanics
4. Create envido UI controls
5. Integrate with existing Truco betting system

### Priority 3: Update Documentation
1. Clarify that this is Truco Gaucho (fixed manilhas)
2. Complete envido rules documentation
3. Add examples for edge cases
4. Document the difference from standard Truco

---

## Files Requiring Changes

### Core Logic:
- `src/utils/cardComparison.ts` - Complete rewrite for fixed manilhas
- `src/utils/gameLogic.ts` - Remove vira initialization
- `src/store/gameStore.ts` - Remove vira state, add envido state

### Data Structures:
- `src/data/cards.ts` - Remove isManilha field, update Card interface
- `src/data/rules.ts` - Fix manilha description, complete envido rules

### UI Components:
- May need envido betting controls
- Update rule display to match actual implementation

---

## Verification Steps

After implementing fixes, verify:

1. **Manilhas are fixed and don't change**
   - Test that 7♠ always beats 1♣
   - Test that 1♣ always beats 1♠
   - Test that 1♠ always beats 7♦
   - Test that 7♦ beats all non-manilhas

2. **No vira card is used**
   - Confirm game initializes without vira
   - Verify card comparison doesn't use vira

3. **Envido works correctly**
   - Calculate envido scores accurately
   - Implement envido betting
   - Handle envido real (30 points)
   - Score envido points correctly

---

**Status**: Critical issues identified that prevent correct Truco Gaucho gameplay.