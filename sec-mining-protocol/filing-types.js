#!/usr/bin/env node

// SEC Filing Types - What They Really Mean

const filingTypes = {
    // Annual/Quarterly
    '10-K': {
        surface: 'Annual report',
        reality: 'Yearly intent reset - major strategy signals',
        alpha: 'HIGH - Complex document, slow human parse'
    },
    '10-Q': {
        surface: 'Quarterly report',
        reality: 'Incremental state update',
        alpha: 'MEDIUM - Smaller than 10-K'
    },
    
    // Material Events
    '8-K': {
        surface: 'Current report',
        reality: 'URGENT state change - acquisitions, departures, defaults',
        alpha: 'EXTREME - Immediate market impact'
    },
    
    // Insider Activity
    'Form 4': {
        surface: 'Insider transaction',
        reality: 'Direct intent signal from management',
        alpha: 'EXTREME - Insiders know first'
    },
    'Form 3': {
        surface: 'Initial insider ownership',
        reality: 'New player enters the game',
        alpha: 'HIGH - Position establishment'
    },
    
    // Institutional Signals
    '13F': {
        surface: 'Institutional holdings',
        reality: 'Smart money position broadcast',
        alpha: 'HIGH - 45-day delay creates arbitrage'
    },
    '13D': {
        surface: 'Major ownership change',
        reality: 'Activist/takeover signal',
        alpha: 'EXTREME - Corporate control play'
    },
    
    // Capital Events
    'S-1': {
        surface: 'IPO registration',
        reality: 'New entity entering matrix',
        alpha: 'HIGH - Price discovery phase'
    },
    'S-3': {
        surface: 'Shelf registration',
        reality: 'Future dilution warning',
        alpha: 'HIGH - Delayed capital raise'
    },
    
    // Proxy Materials
    'DEF 14A': {
        surface: 'Proxy statement',
        reality: 'Governance battle signals',
        alpha: 'MEDIUM - Unless activist involved'
    },
    
    // Going Concern
    'NT 10-K': {
        surface: 'Late filing notice',
        reality: 'DISTRESS signal - accounting issues',
        alpha: 'EXTREME - Possible fraud/bankruptcy'
    }
};

// Display the truth
console.log('[*] SEC Filing Types Decoded:');
console.log('');

for (const [type, data] of Object.entries(filingTypes)) {
    console.log(`[${type}]`);
    console.log(`  Surface: ${data.surface}`);
    console.log(`  Reality: ${data.reality}`);
    console.log(`  Alpha:   ${data.alpha}`);
    console.log('');
}

console.log('[*] Remember:');
console.log('    - Humans read the "surface"');
console.log('    - Machines parse the "reality"');
console.log('    - You mine the time delta');

module.exports = filingTypes;
