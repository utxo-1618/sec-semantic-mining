#!/usr/bin/env node

// XBRL Parser - Extract machine-readable intent from filings

// Semantic triggers hidden in accounting tags
const semanticTriggers = {
    // Distress signals
    'us-gaap:GoingConcern': {
        weight: 0.95,
        action: 'SHORT',
        reason: 'Company questioning own survival'
    },
    'us-gaap:AccumulatedDeficit': {
        weight: 0.8,
        action: 'SHORT',
        reason: 'Chronic losses accumulating'
    },
    
    // Growth signals  
    'us-gaap:ResearchAndDevelopmentExpense': {
        weight: 0.7,
        action: 'LONG',
        reason: 'Investment in future'
    },
    'us-gaap:BusinessAcquisitionCost': {
        weight: 0.85,
        action: 'VOLATILITY',
        reason: 'M&A activity = price swings'
    },
    
    // Liquidity events
    'us-gaap:CashAndCashEquivalents': {
        weight: 0.6,
        action: 'CONDITIONAL',
        reason: 'Context dependent'
    },
    'us-gaap:DebtCurrent': {
        weight: 0.75,
        action: 'MONITOR',
        reason: 'Near-term obligations'
    },
    
    // Hidden gems
    'us-gaap:RelatedPartyTransactions': {
        weight: 0.9,
        action: 'INVESTIGATE',
        reason: 'Potential self-dealing'
    },
    'us-gaap:RestatementCorrection': {
        weight: 0.95,
        action: 'SHORT',
        reason: 'Accounting fraud signal'
    }
};

// Parse XBRL for semantic signals
function parseXBRL(xbrlData) {
    const signals = [];
    
    for (const [tag, trigger] of Object.entries(semanticTriggers)) {
        if (xbrlData.includes(tag)) {
            signals.push({
                tag,
                ...trigger,
                timestamp: Date.now()
            });
        }
    }
    
    return signals;
}

// Calculate composite signal
function calculateSignal(signals) {
    if (signals.length === 0) return null;
    
    // Weight by recency and strength
    const totalWeight = signals.reduce((sum, s) => sum + s.weight, 0);
    const avgWeight = totalWeight / signals.length;
    
    // Determine primary action
    const actions = signals.map(s => s.action);
    const primaryAction = mode(actions);
    
    return {
        strength: avgWeight,
        action: primaryAction,
        signals: signals.length,
        confidence: avgWeight > 0.8 ? 'HIGH' : 'MEDIUM'
    };
}

// Helper - find most common element
function mode(arr) {
    const counts = {};
    let max = 0;
    let result = arr[0];
    
    for (const val of arr) {
        counts[val] = (counts[val] || 0) + 1;
        if (counts[val] > max) {
            max = counts[val];
            result = val;
        }
    }
    
    return result;
}

// Demo
const sampleXBRL = `
<xbrl>
    <us-gaap:GoingConcern>Substantial doubt exists</us-gaap:GoingConcern>
    <us-gaap:AccumulatedDeficit>-500000000</us-gaap:AccumulatedDeficit>
    <us-gaap:RelatedPartyTransactions>CEO loan to company</us-gaap:RelatedPartyTransactions>
</xbrl>
`;

console.log('[*] Parsing XBRL for semantic signals...');
const signals = parseXBRL(sampleXBRL);
const composite = calculateSignal(signals);

console.log('[+] Signals found:', signals.length);
signals.forEach(s => {
    console.log(`    ${s.tag}: ${s.reason}`);
});

console.log('');
console.log('[!] Composite signal:');
console.log(`    Action: ${composite.action}`);
console.log(`    Strength: ${composite.strength}`);
console.log(`    Confidence: ${composite.confidence}`);

module.exports = { parseXBRL, calculateSignal };
