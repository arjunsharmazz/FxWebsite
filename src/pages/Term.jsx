import React from "react";
import styles from "./css/Term.module.css";
import { motion } from "framer-motion";
export default function Terms() {
const sections = [
  {
    title: "14. Intellectual Property Rights",
    text: "All content, software, design, logos, and trademarks displayed on PayKuberFX are owned by us or licensed to us. You agree not to copy, distribute, reproduce, or exploit any intellectual property without prior written consent. Unauthorized use of our intellectual property is strictly prohibited and may result in legal action. You may use our services only for personal trading purposes and not for redistribution or commercial resale."
  },
  {
    title: "15. Third-Party Services",
    text: "Our platform may integrate or provide access to third-party tools, liquidity providers, and payment gateways. While we take reasonable steps to ensure reliability, PayKuberFX is not responsible for failures, delays, or errors caused by third-party systems. You acknowledge that any transactions involving external service providers are at your own risk, and you should read and agree to their respective terms and policies before using their services."
  },
  {
    title: "16. Trading Hours & Market Availability",
    text: "Forex markets generally operate 24 hours, five days a week. However, specific assets such as commodities, indices, and cryptocurrencies may have different availability and trading hours. PayKuberFX does not guarantee continuous access to all assets at all times. Maintenance, server updates, or unexpected technical issues may result in temporary unavailability. You agree that such downtimes do not constitute a breach of contract."
  },
  {
    title: "17. Fees, Spreads & Commissions",
    text: "We may charge spreads, swaps, commissions, or other applicable fees depending on your account type and trading activity. All fees are clearly displayed on our platform, and you are responsible for reviewing them before initiating trades. PayKuberFX reserves the right to revise its pricing models at any time, with prior notice to users. Failure to check fee schedules before trading is not a valid reason for reimbursement."
  },
  {
    title: "18. Order Execution Policy",
    text: "All trades placed on our platform are executed on a best-effort basis under market conditions. During times of high volatility, orders may be subject to slippage, delays, or partial fills. PayKuberFX does not guarantee execution at the requested price. By using our services, you acknowledge that market risks, liquidity, and external conditions may affect order execution, and we are not liable for variations between quoted and executed prices."
  },
  {
    title: "19. Data Security & Privacy",
    text: "Protecting your personal and financial data is our highest priority. We employ advanced encryption technologies, firewalls, and access controls to safeguard information. However, no system is 100% secure. By using PayKuberFX, you acknowledge that data transmission over the internet carries risks, and you agree to notify us immediately if you suspect unauthorized access to your account. Please review our Privacy Policy for detailed practices."
  },
  {
    title: "20. User Responsibilities",
    text: "You are responsible for maintaining the confidentiality of your login credentials and for all activity under your account. Sharing access with third parties or using multiple accounts for fraudulent purposes is strictly prohibited. If you suspect unauthorized use, you must inform PayKuberFX immediately. Any losses arising from your failure to secure your account are solely your responsibility, and we shall not be liable for such incidents."
  },
  {
    title: "21. Communication & Notifications",
    text: "By registering with PayKuberFX, you consent to receive communications via email, SMS, push notifications, or other digital channels. These may include trade confirmations, policy updates, promotional offers, and security alerts. While we strive to ensure prompt delivery, we are not responsible for delays or non-delivery caused by network providers. You may opt out of promotional communications, but essential updates will always be sent."
  },
  {
    title: "22. Platform Updates & Maintenance",
    text: "To ensure optimal performance, we may periodically perform updates, upgrades, and maintenance on the platform. During these times, some services may be unavailable. While we aim to provide prior notice for scheduled maintenance, emergency fixes may occur without warning. You agree that PayKuberFX is not responsible for any losses or disruptions caused by temporary downtime resulting from system improvements or security measures."
  },
  {
    title: "23. Promotional Offers & Bonuses",
    text: "PayKuberFX may provide promotional bonuses, rewards, or referral incentives from time to time. These offers are subject to specific eligibility requirements and terms. Abuse or misuse of promotions, including multiple account creation or fraudulent activity, may result in disqualification and account suspension. Bonuses cannot be withdrawn directly unless explicitly stated and may have trading volume requirements before eligibility for withdrawal."
  },
  {
    title: "24. Prohibited Activities",
    text: "You agree not to use PayKuberFX for any unlawful activities, including money laundering, fraud, market manipulation, or funding terrorism. Automated trading systems, bots, or scripts that manipulate the platform are strictly forbidden unless explicitly authorized. Violation of these restrictions will result in account suspension, termination, and possible reporting to relevant authorities. We maintain a zero-tolerance policy toward illegal conduct."
  },
  {
    title: "25. Tax Obligations",
    text: "It is your sole responsibility to comply with tax laws applicable in your jurisdiction. PayKuberFX does not provide tax advice and will not be held responsible for your failure to declare profits, losses, or related obligations. You agree to maintain proper records of your trading activity and report earnings to relevant authorities. We may provide transaction statements, but final reporting is your responsibility as a registered trader."
  },
  {
    title: "26. Indemnification",
    text: "By using PayKuberFX, you agree to indemnify and hold harmless our company, directors, employees, and partners from any claims, liabilities, damages, or expenses arising from your use of our services. This includes losses due to negligence, misuse of the platform, or violation of applicable laws. You accept that indemnification extends to third-party claims resulting from your trading activity or breach of these Terms & Conditions."
  },
  {
    title: "27. Force Majeure",
    text: "PayKuberFX shall not be held liable for any delay, interruption, or failure to perform obligations due to events beyond our reasonable control. Such events may include natural disasters, wars, government restrictions, power outages, cyberattacks, or communication failures. In such cases, obligations may be temporarily suspended until conditions normalize. You acknowledge that force majeure events do not entitle you to compensation or damages."
  },
  {
    title: "28. Account Inactivity & Dormancy",
    text: "If your account remains inactive for an extended period, PayKuberFX reserves the right to classify it as dormant. Inactive accounts may be subject to maintenance fees or eventual closure after due notice. Dormant funds may be transferred to a secure holding account until the rightful owner claims them. To avoid inactivity charges, we recommend logging in periodically and keeping your account information up to date."
  },
  {
    title: "29. Conflict of Interest",
    text: "PayKuberFX strives to maintain transparency and fairness in all operations. However, certain situations may create potential conflicts of interest, such as when we act as both broker and counterparty to trades. We implement strict internal policies to manage such conflicts and disclose them when necessary. By using our services, you acknowledge and accept that conflicts may arise and agree that PayKuberFX will act in good faith."
  },
  {
    title: "30. Educational Material Disclaimer",
    text: "PayKuberFX may provide tutorials, webinars, market insights, or research tools for educational purposes. These materials are not financial advice and should not be relied upon as investment recommendations. You acknowledge that trading decisions are solely your responsibility, and any reliance on provided educational resources is at your own risk. We strongly encourage independent research or consulting with licensed financial advisors."
  },
  {
    title: "31. API Access & Automation",
    text: "PayKuberFX may provide limited access to APIs for automated trading strategies. Use of APIs must comply with platform policies, and abusive practices such as excessive requests, market manipulation, or unauthorized integrations are strictly forbidden. We reserve the right to revoke or limit API access without prior notice if misuse is detected. Any damages caused by automated systems are the sole responsibility of the user."
  },
  {
    title: "32. Withdrawal Limitations",
    text: "Withdrawals are subject to verification, anti-fraud checks, and regulatory compliance. Large transactions may require additional documentation before approval. PayKuberFX reserves the right to delay or deny withdrawals if suspicious activity is detected. While we aim to process requests quickly, processing times may vary depending on third-party providers. You acknowledge that delays do not entitle you to compensation or legal claims."
  },
  {
    title: "33. Multi-Currency Accounts",
    text: "We may allow you to hold balances in multiple currencies, including USD, EUR, GBP, and cryptocurrencies. Conversions between currencies are subject to prevailing exchange rates and applicable fees. You are responsible for understanding conversion risks, including fluctuations and liquidity limitations. PayKuberFX is not liable for losses caused by unfavorable exchange rates during deposits, withdrawals, or account transfers."
  },
  {
    title: "34. KYC & Verification Obligations",
    text: "To comply with international AML regulations, users may be required to submit identification documents, proof of address, or financial statements. Failure to provide requested documents may result in account suspension or transaction limits. By registering, you consent to PayKuberFX conducting verification checks through authorized agencies. Misrepresentation or falsified information may lead to permanent account termination and legal action."
  },
  {
    title: "35. Termination by User",
    text: "You may request to close your account at any time by contacting our support team. Before termination, all outstanding trades must be settled, and all fees must be cleared. PayKuberFX will process account closure requests within a reasonable timeframe. Please note that historical transaction data may be retained for regulatory purposes, even after account closure, in compliance with applicable financial and legal requirements."
  },
  {
    title: "36. Dispute Resolution",
    text: "In the event of disputes, users should first contact PayKuberFX support for resolution. If unresolved, disputes may be escalated to arbitration in accordance with applicable laws. Both parties agree to attempt good faith negotiation before pursuing legal remedies. Arbitration decisions will be final and binding. You acknowledge that disputes must be raised within a reasonable time frame, and failure to do so may forfeit your rights."
  },
  {
    title: "37. Entire Agreement",
    text: "These Terms & Conditions constitute the entire agreement between you and PayKuberFX, superseding any prior discussions, representations, or agreements. No oral or written statement outside this document shall alter its meaning unless formally amended and published by PayKuberFX. By using our platform, you acknowledge that you have read, understood, and agreed to these Terms in their entirety without reliance on any external representations."
  },
  {
    title: "38. Severability",
    text: "If any provision of these Terms is found to be invalid, unlawful, or unenforceable by a court of competent jurisdiction, the remaining provisions shall remain in full force and effect. The invalid portion shall be replaced with a valid and enforceable clause that most closely reflects the original intent. This ensures that the overall agreement remains binding and continues to govern your use of PayKuberFX services effectively."
  }
];


 return (
    <div className={styles.page}>
      <div className={styles.container}>
        <motion.h1
          className={styles.heading}
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Terms & Conditions
        </motion.h1>

        <motion.p
          className={styles.intro}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          Welcome to <span className={styles.brand}>PayKuberFX</span>, your
          trusted platform for Forex and CFD trading. Please read these Terms &
          Conditions carefully, as they explain your rights, obligations, and
          risks while using our services.
        </motion.p>

        <div className={styles.sections}>
          {sections.map((sec, i) => (
            <motion.div
              key={i}
              className={styles.section}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <h2>{sec.title}</h2>
              <p>{sec.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
