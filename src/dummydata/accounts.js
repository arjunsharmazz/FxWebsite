const accounts = [
  {
    name: "Standard",
    deposit: "$100",
    spreads: "From 1.0 pips",
    leverage: "1:500",
    commission: "No commission",
    features: ["Beginner friendly", "24/7 support", "MT4/MT5 access"],
    highlight: false
  },
  {
    name: "ECN",
    deposit: "$500",
    spreads: "From 0.0 pips",
    leverage: "1:400",
    commission: "$5 per lot",
    features: ["Direct market access", "Low latency", "Fast execution"],
    highlight: true
  },
  {
    name: "Islamic",
    deposit: "$250",
    spreads: "From 1.2 pips",
    leverage: "1:300",
    commission: "Swap-free",
    features: ["Shariah compliant", "No overnight fees", "Trusted globally"],
    highlight: false
  },
  {
    name: "VIP",
    deposit: "$10,000",
    spreads: "From 0.0 pips",
    leverage: "1:200",
    commission: "Custom pricing",
    features: ["Dedicated manager", "Priority withdrawals", "Exclusive perks"],
    highlight: true
  }
];
export default accounts;