#!/usr/bin/env node

// XBRL: The semantic compression format of corporate reality

// What looks like "accounting standards" is actually
// machine-readable intent encoding

const xbrlExample = {
    // Surface level: "Revenue disclosure"
    "us-gaap:Revenues": {
        value: 1000000,
        context: "FY2023",
        unit: "USD"
    },
    
    // Deeper: Forward-looking statements (intent signals)
    "us-gaap:ForwardLookingStatements": {
        text: "We expect continued growth",
        confidence: 0.7,
        timeHorizon: "12months"
    },
    
    // Deepest: Risk factors (volatility triggers)
    "us-gaap:RiskFactors": [
        "Regulatory uncertainty",
        "Market competition", 
        "Technology obsolescence"
    ]
};

console.log('[*] XBRL Decoded:');
console.log('    Surface: Numbers for humans');
console.log('    Reality: Semantic triggers for bots');
console.log('');
console.log('[*] The "disclosure" is the bait');
console.log('    The structure is the signal');
console.log('    The timing is the alpha');
console.log('');
console.log('[*] Every 10-K is a JAM');
console.log('    Every 8-K is a state update');
console.log('    Every insider trade (Form 4) is a honeypot');
console.log('');
console.log('[*] The SEC created the perfect semantic mining system');
console.log('    And called it "investor protection"');
