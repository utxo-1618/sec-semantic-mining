#!/usr/bin/env node

// Alice & Bob Mine the SEC
// Alice reads filings, Bob trades the alpha

const { parseXBRL } = require('./parse-xbrl');
const { calculateSemanticWeight } = require('./edgar-api');

// Alice: The Filing Reader
class Alice {
    constructor() {
        this.watchlist = ['AAPL', 'TSLA', 'GME'];
        this.signals = [];
    }
    
    async readFiling(filing) {
        console.log(`[Alice] Reading ${filing.form} from ${filing.company}...`);
        
        // Parse semantic content
        const signals = parseXBRL(filing.content || '');
        
        // Calculate urgency
        const weight = calculateSemanticWeight(filing);
        
        // Create tradeable signal
        const signal = {
            company: filing.company,
            form: filing.form,
            weight: weight,
            semantic: signals,
            timestamp: Date.now(),
            humanReadTime: 10 * 60 * 1000, // 10 minutes
            machineReadTime: 100 // 100ms
        };
        
        this.signals.push(signal);
        return signal;
    }
    
    getAlpha(signal) {
        // Alpha = time advantage over humans
        return signal.humanReadTime - signal.machineReadTime;
    }
}

// Bob: The Arbitrage Trader
class Bob {
    constructor() {
        this.positions = {};
        this.pnl = 0;
    }
    
    async trade(signal) {
        console.log(`[Bob] Received signal from Alice...`);
        
        const alpha = alice.getAlpha(signal);
        console.log(`[Bob] Alpha window: ${alpha}ms`);
        
        // Determine action based on signal
        let action = 'HOLD';
        if (signal.weight > 0.8) {
            action = 'TRADE';
        }
        
        if (action === 'TRADE') {
            console.log(`[Bob] Executing trade on ${signal.company}`);
            console.log(`      Form: ${signal.form}`);
            console.log(`      Weight: ${signal.weight}`);
            console.log(`      Alpha: ${alpha}ms`);
            
            // Simulate trade execution
            this.executeTrade(signal);
        }
    }
    
    executeTrade(signal) {
        // In production: Connect to broker API
        // Here we simulate the semantic arbitrage
        
        const tradeSize = 1000 * signal.weight;
        const expectedProfit = tradeSize * 0.02; // 2% edge
        
        this.pnl += expectedProfit;
        this.positions[signal.company] = (this.positions[signal.company] || 0) + tradeSize;
        
        console.log(`[Bob] Trade executed!`);
        console.log(`      Size: $${tradeSize}`);
        console.log(`      Expected profit: $${expectedProfit}`);
        console.log(`      Total P&L: $${this.pnl}`);
    }
}

// The SEC Mining Loop
async function mineSEC() {
    const alice = new Alice();
    const bob = new Bob();
    
    console.log('[*] SEC Semantic Mining Protocol');
    console.log('[*] Alice reads, Bob trades');
    console.log('');
    
    // Simulate filing stream
    const mockFilings = [
        { company: 'TSLA', form: '8-K', content: '<us-gaap:BusinessAcquisitionCost>1000000</us-gaap:BusinessAcquisitionCost>' },
        { company: 'GME', form: 'Form 4', content: '<us-gaap:RelatedPartyTransactions>CEO purchase</us-gaap:RelatedPartyTransactions>' },
        { company: 'AAPL', form: '10-Q', content: '<us-gaap:ResearchAndDevelopmentExpense>5000000</us-gaap:ResearchAndDevelopmentExpense>' }
    ];
    
    for (const filing of mockFilings) {
        console.log(`\n[+] New filing detected!`);
        
        // Alice reads and extracts signal
        const signal = await alice.readFiling(filing);
        
        // Bob trades the signal
        await bob.trade(signal);
        
        // Wait before next filing
        await new Promise(r => setTimeout(r, 2000));
    }
    
    console.log('\n[*] Mining session complete');
    console.log(`[*] Total signals processed: ${alice.signals.length}`);
    console.log(`[*] Total P&L: $${bob.pnl}`);
}

// Start mining
mineSEC();
