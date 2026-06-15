"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Cpu,
  Layers,
  Sparkles,
  Zap,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Database,
  Globe2,
  Terminal,
  Activity,
  ArrowRightLeft,
  Radio,
  FileCode,
  Workflow
} from "lucide-react";

interface IndustryData {
  title: string;
  desc: string;
  bg: string;
  themeColor: string;
  glowColor: string;
  tags: string[];
  challenges: { title: string; desc: string }[];
  solutions: { title: string; desc: string }[];
  metrics: { value: string; label: string }[];
  architecture: {
    source: string;
    process: string;
    target: string;
    description: string;
  };
}

const industryContent: Record<string, IndustryData> = {
  fintech: {
    title: "FinTech",
    desc: "Secure, compliant, and high-frequency trading platforms and digital banking solutions.",
    bg: "from-slate-900 via-blue-950 to-slate-950",
    themeColor: "sky",
    glowColor: "rgba(14,165,233,0.25)",
    tags: ["Blockchain", "Digital Payments", "Trading Systems"],
    challenges: [
      {
        title: "Speed Up Transaction Processing",
        desc: "Processing millions of transactions per second requires microsecond-level precision and minimal network congestion.",
      },
      {
        title: "Meet Financial Security Standards",
        desc: "Failing to secure financial ledgers and sensitive user metadata can lead to massive penalties and brand damage.",
      },
      {
        title: "Detect & Prevent Transaction Fraud",
        desc: "Cyber threats continuously adapt, requiring immediate AI threat modeling at transaction validation time.",
      },
    ],
    solutions: [
      {
        title: "Ultra-Fast Ledger Clearing (<15ms)",
        desc: "We design distributed ledger transaction pools executing atomic processing in under 15ms.",
      },
      {
        title: "Intelligent AI Fraud Shield",
        desc: "Intelligent scoring pipelines integrated directly into verification middleware to flag malicious operations instantly.",
      },
      {
        title: "Secure Compliance Sandboxing",
        desc: "Fully secure sandbox structures adhering to stringent compliance standards without slowing down deployment speeds.",
      },
    ],
    metrics: [
      { value: "99.99%", label: "System Uptime" },
      { value: "15ms", label: "Ledger Settlement" },
      { value: "100%", label: "Audit Compliance Rate" },
    ],
    architecture: {
      source: "Client POS / API Gateway",
      process: "Distributed Kafka Streams & AI Fraud Middleware",
      target: "PCI-Compliant Atomic Ledgers",
      description: "Secure ingress filters incoming card operations, passes them through sub-10ms risk models, and registers final states on zero-trust transactional DBs.",
    },
  },
  healthcare: {
    title: "Healthcare",
    desc: "HIPAA-compliant patient portals, telemedicine apps, and electronic health records.",
    bg: "from-blue-950 via-cyan-950 to-slate-950",
    themeColor: "cyan",
    glowColor: "rgba(6,182,212,0.25)",
    tags: ["HIPAA", "Telemedicine", "EHR Systems"],
    challenges: [
      {
        title: "Connect Fragmented Medical Records",
        desc: "Doctors and clinics operate on isolated databases, causing dangerous delay times in emergency patient care.",
      },
      {
        title: "Secure Patient Health Privacy",
        desc: "Strict compliance standards necessitate end-to-end data encryption in transit and at rest.",
      },
      {
        title: "Reliable Telehealth Video Calling",
        desc: "Low network conditions routinely drop patient-doctor consultation calls in crucial clinical times.",
      },
    ],
    solutions: [
      {
        title: "Unified Medical Database Integrators",
        desc: "Secure translation engines unifying disparate databases into standard, rapid electronic schemas.",
      },
      {
        title: "Secure Encrypted Patient Record Vaults",
        desc: "Advanced cryptographic data locks ensuring all EHR queries are traced, fully validated, and encrypted.",
      },
      {
        title: "Smart Low-Bandwidth Video Pipelines",
        desc: "Robust WebRTC audio/video feeds adjusting dynamically to low-bandwidth states to preserve connection quality.",
      },
    ],
    metrics: [
      { value: "100%", label: "HIPAA-HITECH Compliant" },
      { value: "92%", label: "Patient Consultation Score" },
      { value: "10x", label: "Faster Record Access" },
    ],
    architecture: {
      source: "WebRTC Telehealth Client",
      process: "Token-Authenticated HL7 Translation Layer",
      target: "Secure FHIR EHR Databases",
      description: "Consultation portals request dynamic access tokens, authorize records through HL7 middleware, and store telemetry logs securely.",
    },
  },
  "e-commerce": {
    title: "E-Commerce",
    desc: "Omnichannel retail platforms with advanced inventory management and AI recommendations.",
    bg: "from-slate-950 via-indigo-950 to-slate-950",
    themeColor: "indigo",
    glowColor: "rgba(99,102,241,0.25)",
    tags: ["Omnichannel", "AI Personalization", "Inventory"],
    challenges: [
      {
        title: "Handle Sudden Holiday Traffic Spikes",
        desc: "Sudden seasonal flash sales overwhelm traditional hosting, causing downtime and lost revenue.",
      },
      {
        title: "Sync Store & Online Inventories",
        desc: "Siloed retail databases cause product overselling and critical supply chain friction.",
      },
      {
        title: "Personalize Product Recommendations",
        desc: "Static retail grids fail to personalize results, reducing average order values and buyer engagement.",
      },
    ],
    solutions: [
      {
        title: "Auto-Scaling Global Storefronts",
        desc: "Serverless global edge networks designed to scale seamlessly during massive consumer spikes.",
      },
      {
        title: "Real-Time Catalog Sync Engines",
        desc: "Automated, real-time message streams keeping physical, web, and distributor catalogs in absolute sync.",
      },
      {
        title: "AI-Driven Smart Recommendation Engines",
        desc: "AI recommendation systems analyzing client history to surface hyper-personalized product lists.",
      },
    ],
    metrics: [
      { value: "2.4s", label: "Faster Page Interactive" },
      { value: "+35%", label: "Average Order Value Increase" },
      { value: "100%", label: "Inventory Synchronization" },
    ],
    architecture: {
      source: "Global Edge Storefront Cart",
      process: "Redis Cache Sync & Recommendation Engine",
      target: "Elastic Inventory & Payment Gateway",
      description: "Distributed frontends process transactions through elastic caching channels and trigger instant localized delivery sequences.",
    },
  },
  logistics: {
    title: "Logistics",
    desc: "Real-time tracking, warehouse automation, and route optimization systems.",
    bg: "from-sky-950 via-slate-950 to-slate-950",
    themeColor: "sky",
    glowColor: "rgba(14,165,233,0.25)",
    tags: ["Supply Chain", "Fleet MGMT", "Warehouse AI"],
    challenges: [
      {
        title: "Optimize Delivery Fleet Routes",
        desc: "Inefficient fleet routes waste fuel, increase transit times, and cause scheduling friction.",
      },
      {
        title: "Handle Real-Time IoT GPS Data",
        desc: "Handling real-time tracking signals from thousands of IoT trackers causes dashboard lag.",
      },
      {
        title: "Automate Sorting & Packing Workflows",
        desc: "Manual inventory audits slow sorting speeds and cause bottlenecks at delivery stations.",
      },
    ],
    solutions: [
      {
        title: "Smart Traffic & Weather Routing",
        desc: "Intelligent routing pipelines computing live updates based on weather, traffic, and vehicle load.",
      },
      {
        title: "High-Speed Live Fleet Dashboards",
        desc: "High-throughput data pipelines parsing telemetry streams instantly for real-time dashboards.",
      },
      {
        title: "AI-Guided Warehouse Picker Systems",
        desc: "Automated picking dashboards showing exact item placements, reducing packing times.",
      },
    ],
    metrics: [
      { value: "-18%", label: "Fuel Cost Reductions" },
      { value: "99.4%", label: "On-Time Dispatch Rate" },
      { value: "4.8x", label: "Sorting Queue Throughput" },
    ],
    architecture: {
      source: "GPS Fleet IoT Sensors",
      process: "AWS Kinesis Streams & Routing Engines",
      target: "Live Fleet Optimization Dashboard",
      description: "Raw GPS payloads feed into streaming engines, recalculate route dispatches, and trigger real-time warehouse sync warnings.",
    },
  },
  "real-estate": {
    title: "Real Estate",
    desc: "End-to-end property management platforms, listing portals, and smart building automation solutions.",
    bg: "from-amber-950 via-orange-950 to-slate-950",
    themeColor: "orange",
    glowColor: "rgba(249,115,22,0.25)",
    tags: ["PropTech", "Smart Buildings", "CRM"],
    challenges: [
      {
        title: "Keep Property Listings Updated",
        desc: "Outdated property boards cause buyer frustration and waste precious sales outreach resources.",
      },
      {
        title: "Automate Buyer Lead Filtering",
        desc: "Agents spend hours sorting cold leads, slowing down high-value negotiation closures.",
      },
      {
        title: "Show Property Walkthroughs Online",
        desc: "Traditional flat images fail to engage distant premium clients or show spatial layouts.",
      },
    ],
    solutions: [
      {
        title: "Real-Time MLS Sync Engines",
        desc: "Advanced sync engines standardizing property schemas and updating boards in real time.",
      },
      {
        title: "AI Agent Qualification Assistants",
        desc: "AI bots qualifying buyers on listing pages and instantly scheduling priority viewings.",
      },
      {
        title: "Interactive 3D Spatial Property Tours",
        desc: "Stunning browser-based spatial viewers offering seamless digital walkthroughs.",
      },
    ],
    metrics: [
      { value: "3x", label: "Faster Sync Speed" },
      { value: "+40%", label: "Agent Deal Productivity" },
      { value: "2.5x", label: "Visitor Conversion Increase" },
    ],
    architecture: {
      source: "Spatial Listing Client",
      process: "RESO-Sync Middleware & CRM Scorer",
      target: "Unified Property & CRM Database",
      description: "Interactive visitors query dynamic visual assets, triggering live MLS synchronization and automated high-priority agent alerts.",
    },
  },
  education: {
    title: "Education",
    desc: "Interactive LMS platforms, virtual classrooms, and AI-powered personalized learning experiences.",
    bg: "from-emerald-950 via-teal-950 to-slate-950",
    themeColor: "emerald",
    glowColor: "rgba(16,185,129,0.25)",
    tags: ["LMS", "Virtual Classroom", "EdTech"],
    challenges: [
      {
        title: "Centralize Student Grades & Work",
        desc: "Siloed content channels cause classroom communication drops and grade tracking errors.",
      },
      {
        title: "Ensure Low-Lag Virtual Classrooms",
        desc: "Unstable media connections during large-scale lectures disrupt lessons and impact learning.",
      },
      {
        title: "Personalize Learning Speeds for Students",
        desc: "Uniform teaching formats leave struggling students behind and bore advanced learners.",
      },
    ],
    solutions: [
      {
        title: "Unified Course Management System",
        desc: "Robust architecture unifying course objects, progress analytics, and class registries.",
      },
      {
        title: "Instant Whiteboard & Chat Networks",
        desc: "Real-time communication engines ensuring fluid group chats, whiteboards, and screensharing.",
      },
      {
        title: "Smart Learning Roadmap Generators",
        desc: "Intelligent analytics modules serving customized learning tracks based on quiz scores.",
      },
    ],
    metrics: [
      { value: "99.8%", label: "Classroom Session Reliability" },
      { value: "+25%", label: "Module Completion Speed" },
      { value: "12ms", label: "Interaction Latency Rate" },
    ],
    architecture: {
      source: "Student Web Portal",
      process: "WebSocket Hub & Progress Scorer",
      target: "Adaptive LMS Analytics Core",
      description: "Classrooms run on instant signaling hubs, recording engagement signals to customize the next learning module.",
    },
  },
  manufacturing: {
    title: "Manufacturing",
    desc: "IoT-enabled factory automation, predictive maintenance, and supply chain visibility systems.",
    bg: "from-zinc-900 via-slate-950 to-slate-950",
    themeColor: "zinc",
    glowColor: "rgba(113,113,122,0.25)",
    tags: ["Industry 4.0", "IoT", "Automation"],
    challenges: [
      {
        title: "Connect Factory Floor Data to Cloud",
        desc: "Industrial networks trap vital operating metrics inside physical devices, preventing unified reporting.",
      },
      {
        title: "Predict & Prevent Equipment Failures",
        desc: "Unexpected breakdowns halt assembly lines, costing thousands of dollars in lost productivity.",
      },
      {
        title: "Track Raw Material Shipments Live",
        desc: "Opaque delivery pipelines make raw material tracking and production forecasting difficult.",
      },
    ],
    solutions: [
      {
        title: "SCADA-to-Cloud Translation Hubs",
        desc: "Secure software translators converting SCADA/Modbus streams into secure cloud signals.",
      },
      {
        title: "AI Machinery Vibration Forecasters",
        desc: "Machine learning engines monitoring temperature and vibration to trigger predictive maintenance tasks.",
      },
      {
        title: "Live Parts Location Dashboards",
        desc: "Comprehensive tracking systems giving real-time visibility into parts location and transit states.",
      },
    ],
    metrics: [
      { value: "-30%", label: "Assembly Queue Downtime" },
      { value: "95%", label: "Asset Telemetry Precision" },
      { value: "+22%", label: "Operating Yield Increase" },
    ],
    architecture: {
      source: "SCADA Hardware Gateways",
      process: "IoT Anomaly Stream Translators",
      target: "Predictive Assembly Dashboards",
      description: "Factory floor telemetry is securely extracted, analyzed for anomalies by cloud models, and displayed on operational dashboards.",
    },
  },
  "travel-hospitality": {
    title: "Travel & Hospitality",
    desc: "Booking engines, dynamic pricing tools, and guest experience platforms for hotels and airlines.",
    bg: "from-sky-950 via-cyan-950 to-slate-950",
    themeColor: "sky",
    glowColor: "rgba(14,165,233,0.25)",
    tags: ["Booking Engines", "SaaS", "Hospitality AI"],
    challenges: [
      {
        title: "Sync Hotel & Flight Availability Live",
        desc: "Slow GDS booking syncs cause double-bookings and display inaccurate pricing.",
      },
      {
        title: "Maximize Profit via Dynamic Rates",
        desc: "Inflexible pricing structures miss out on high-demand windows and occupancy optimization.",
      },
      {
        title: "Personalize Guest Support & Stays",
        desc: "Disconnected guest histories make it difficult to offer personalized stays and rewards.",
      },
    ],
    solutions: [
      {
        title: "Direct Reservation Booking Interfaces",
        desc: "Direct integration channels providing instant reservation syncs across global networks.",
      },
      {
        title: "AI-Driven Smart Room Rate Adjusters",
        desc: "AI pricing models adjusting rates automatically based on local demand, occupancy, and season.",
      },
      {
        title: "Central Guest Profile & Support Desks",
        desc: "Centralized client profiles organizing booking history, room preferences, and support tickets.",
      },
    ],
    metrics: [
      { value: "5.2x", label: "Reservation Sync Speed" },
      { value: "+15%", label: "Yield Revenue Increase" },
      { value: "98%", label: "Guest Satisfaction Rating" },
    ],
    architecture: {
      source: "Guest Direct Portals",
      process: "Amadeus API Sync & Pricing Matrices",
      target: "Unified Reservations Database",
      description: "Portals pull live room rates, process instant transactions, and update global GDS channels to prevent double-bookings.",
    },
  },
  "banking-insurance": {
    title: "Banking & Insurance",
    desc: "Core banking systems, insurance automation, fraud detection, and financial risk platforms.",
    bg: "from-indigo-950 via-slate-950 to-slate-950",
    themeColor: "indigo",
    glowColor: "rgba(99,102,241,0.25)",
    tags: ["InsurTech", "Risk Analysis", "Banking"],
    challenges: [
      {
        title: "Speed Up Core Banking Operations",
        desc: "Legacy ledger databases delay payment validations and make real-time financial tracking difficult.",
      },
      {
        title: "Speed Up Insurance Claims Checking",
        desc: "Manual claims verification processes frustrate policyholders and increase operational costs.",
      },
      {
        title: "Improve Loan Risk Evaluations",
        desc: "Static risk scoring models fail to predict modern default patterns and portfolio threats.",
      },
    ],
    solutions: [
      {
        title: "Atomic Double-Entry Banking Ledgers",
        desc: "Atomic ledgers designed to handle complex transactions with zero risk of processing mismatch.",
      },
      {
        title: "Auto-Processed Claim Workflows (90%)",
        desc: "Intelligent processing pipelines automating up to 90% of simple claims validation checks.",
      },
      {
        title: "AI-Driven Instant Credit Scoring",
        desc: "Advanced data models analyzing financial patterns to score credit applicants instantly.",
      },
    ],
    metrics: [
      { value: "90%", label: "Auto-Processed Claims" },
      { value: "-40%", label: "Operational Overhead" },
      { value: "99.99%", label: "Core Transaction Security" },
    ],
    architecture: {
      source: "Consumer Banking Interface",
      process: "Verification Ledgers & Risk Models",
      target: "Secure Core Financial Database",
      description: "Direct customer transactions are routed through validation pipelines and instantly logged in secure, audit-ready databases.",
    },
  },
  cybersecurity: {
    title: "Cybersecurity",
    desc: "Threat detection systems, identity management, SOC dashboards, and data protection solutions.",
    bg: "from-red-950 via-slate-950 to-slate-950",
    themeColor: "red",
    glowColor: "rgba(239,68,68,0.25)",
    tags: ["SOC", "Identity MGMT", "Threat Detection"],
    challenges: [
      {
        title: "Filter Out False Security Alarms",
        desc: "Security teams are overwhelmed by thousands of false alerts, delaying response to real threats.",
      },
      {
        title: "Isolate Cyber Attacks Automatically",
        desc: "Manual threat isolation steps give attackers precious time to move through sensitive corporate networks.",
      },
      {
        title: "Replace Weak Password Access Systems",
        desc: "Traditional password systems leave enterprise gates vulnerable to social engineering and phishing.",
      },
    ],
    solutions: [
      {
        title: "Real-Time SIEM Anomaly Scoring",
        desc: "Real-time anomaly scoring systems weeding out noise and highlighting critical system threats.",
      },
      {
        title: "Automated Device Isolation Playbooks",
        desc: "Automated playbooks isolating compromised endpoints and resetting credentials in seconds.",
      },
      {
        title: "Zero-Trust Biometric Access Gateways",
        desc: "Secure single sign-on modules using contextual biometrics and device verification.",
      },
    ],
    metrics: [
      { value: "<5m", label: "Threat Response Time" },
      { value: "99.99%", label: "Threat Interception Rate" },
      { value: "100%", label: "Authorized Device Verification" },
    ],
    architecture: {
      source: "Endpoint Security Telemetry",
      process: "SIEM Threat Analysis Engine",
      target: "Zero-Trust Containment Gateways",
      description: "System telemetry is continuously checked for threats, triggers automated containment systems, and updates security team screens.",
    },
  },
  telecom: {
    title: "Telecom",
    desc: "Network management, 5G systems, billing platforms, and customer support automation.",
    bg: "from-purple-950 via-slate-950 to-slate-950",
    themeColor: "purple",
    glowColor: "rgba(168,85,247,0.25)",
    tags: ["5G", "Network Infra", "Automation"],
    challenges: [
      {
        title: "Fix Customer Billing Discrepancies",
        desc: "Slow database pipelines cause billing mismatches and delay monthly revenue reconciliation.",
      },
      {
        title: "Optimize 5G Data Traffic Speeds",
        desc: "Inefficient traffic controllers delay connections in high-density consumer neighborhoods.",
      },
      {
        title: "Deploy Network Updates Safely",
        desc: "Manual network updates require service windows and risk causing massive outages.",
      },
    ],
    solutions: [
      {
        title: "Real-Time Stream Billing Software",
        desc: "Real-time data streaming engines calculating data usage and processing payments instantly.",
      },
      {
        title: "Smart Low-Latency Signal Routers",
        desc: "Low-latency microservices ensuring steady connections for real-time applications.",
      },
      {
        title: "Zero-Downtime Safe Deploy Pipelines",
        desc: "Automated verification pipelines testing and deploying network updates without service downtime.",
      },
    ],
    metrics: [
      { value: "5ms", label: "Edge Signal Routing Latency" },
      { value: "99.99%", label: "Network Uptime Rate" },
      { value: "+45%", label: "Billing System Speed" },
    ],
    architecture: {
      source: "End-User 5G Devices",
      process: "Low-Latency Traffic Routers",
      target: "Billing & OSS/BSS Databases",
      description: "User network data flows through intelligent routers, recalculates signal priorities, and updates billing databases.",
    },
  },
  automotive: {
    title: "Automotive",
    desc: "EV systems, connected car platforms, fleet management, and smart mobility solutions.",
    bg: "from-gray-900 via-slate-950 to-slate-950",
    themeColor: "slate",
    glowColor: "rgba(100,116,139,0.25)",
    tags: ["EV Systems", "Connected Cars", "Mobility"],
    challenges: [
      {
        title: "Process Connected Car Diagnostics",
        desc: "Connected car systems must process massive amounts of raw sensor data with zero latency.",
      },
      {
        title: "Predict EV Battery Health & Lifespan",
        desc: "Without battery health tracking, fleet managers face sudden vehicle breakdowns.",
      },
      {
        title: "Sync GPS & Safety Signals Live",
        desc: "Delayed GPS and safety telemetry updates slow down fleet operations and crash response times.",
      },
    ],
    solutions: [
      {
        title: "Optimized On-Vehicle Edge Parsers",
        desc: "Highly-optimized edge software designed to filter and parse vehicle diagnostic signals.",
      },
      {
        title: "AI Predictive Cell-Degradation Models",
        desc: "Predictive models monitoring cell voltage and temperature to forecast battery life.",
      },
      {
        title: "High-Speed Connected Vehicle Ingress",
        desc: "High-frequency tracking pipelines feeding instant telematics data to central fleet systems.",
      },
    ],
    metrics: [
      { value: "98%", label: "Diagnostic Accuracy" },
      { value: "10x", label: "Telemetry Processing Speed" },
      { value: "+30%", label: "Fleet Productivity Increase" },
    ],
    architecture: {
      source: "Vehicle CAN Bus Sensors",
      process: "Edge Ingestion & Battery Scorer",
      target: "Central Fleet Telematics Hub",
      description: "Sensor data is captured at the vehicle edge, checked for safety anomalies, and streamed to central tracking dashboards.",
    },
  },
  "media-entertainment": {
    title: "Media & Entertainment",
    desc: "OTT platforms, streaming systems, content delivery networks, and recommendation engines.",
    bg: "from-pink-950 via-slate-950 to-slate-950",
    themeColor: "pink",
    glowColor: "rgba(236,72,153,0.25)",
    tags: ["OTT", "Streaming", "Content AI"],
    challenges: [
      {
        title: "Reduce Video Buffering & Lag",
        desc: "Laggy buffering spikes during peak hours frustrate viewers, increasing user unsubscribe rates.",
      },
      {
        title: "Reduce High Video Encoding Costs",
        desc: "Encoding high-resolution video streams across multiple codecs strains backend server resources.",
      },
      {
        title: "Increase Viewer Platform Watch-Times",
        desc: "Static video grids fail to engage viewers, reducing watch times and platform subscription retention.",
      },
    ],
    solutions: [
      {
        title: "Adaptive Multi-Bitrate Video Players",
        desc: "Adaptive video players dynamically adjusting streaming quality to preserve playback.",
      },
      {
        title: "Auto-Scaling Video Encoding Clusters",
        desc: "Autoscaling cloud queues processing video files across multiple formats efficiently.",
      },
      {
        title: "AI Platform Recommendation Algorithms",
        desc: "Intelligent analytics systems tracking viewer history to recommend high-match content.",
      },
    ],
    metrics: [
      { value: "99.99%", label: "Playback Session Stability" },
      { value: "-35%", label: "Bandwidth Delivery Costs" },
      { value: "3x", label: "Viewer Watch Time Increase" },
    ],
    architecture: {
      source: "Viewer Web/App Client",
      process: "CDN Edges & Transcoder Queues",
      target: "Dynamic Video Storage System",
      description: "Stream requests are matched to nearby edge servers, served using adaptive codecs, and log usage details to content engines.",
    },
  },
  "food-restaurant-tech": {
    title: "Food & Restaurant Tech",
    desc: "Food delivery apps, POS systems, restaurant management, and inventory tracking solutions.",
    bg: "from-orange-950 via-slate-950 to-slate-950",
    themeColor: "orange",
    glowColor: "rgba(249,115,22,0.25)",
    tags: ["Food Delivery", "POS", "Inventory"],
    challenges: [
      {
        title: "Combine Orders from Multiple Delivery Apps",
        desc: "Managing orders from multiple delivery apps on separate tablets slows down busy kitchens.",
      },
      {
        title: "Match Drivers with Delivery Orders Faster",
        desc: "Inefficient driver matching delays dispatches, causing orders to arrive cold.",
      },
      {
        title: "Keep Kitchen Screens Working Offline",
        desc: "System drops during busy dinner rushes cause lost orders and database updates to fail.",
      },
    ],
    solutions: [
      {
        title: "Single-Screen Unified POS Dashboards",
        desc: "Central software endpoints combining orders from all delivery services into one kitchen screen.",
      },
      {
        title: "Smart Kitchen-to-Driver Matching Engine",
        desc: "Intelligent matching engines coordinating dispatches based on driver location and kitchen prep speeds.",
      },
      {
        title: "Resilient Offline Syncing Kitchen Screens",
        desc: "Resilient local software keeping ordering screens running and syncing data once connection returns.",
      },
    ],
    metrics: [
      { value: "99.2%", label: "Kitchen Order Precision" },
      { value: "-15%", label: "Customer Wait Time" },
      { value: "100%", label: "Offline Ordering Stability" },
    ],
    architecture: {
      source: "Customer Ordering App",
      process: "Unified POS Gateway & Driver Dispatch",
      target: "Kitchen Dashboard Database",
      description: "Orders are unified at POS gateways, routed to kitchen screens, and match drivers based on live cooking speeds.",
    },
  },
  "government-public-sector": {
    title: "Government & Public Sector",
    desc: "e-Governance systems, digital identity platforms, tax portals, and citizen services.",
    bg: "from-green-950 via-slate-950 to-slate-950",
    themeColor: "green",
    glowColor: "rgba(34,197,94,0.25)",
    tags: ["e-Governance", "Digital ID", "Public Services"],
    challenges: [
      {
        title: "Optimize Web Layouts for Disabled Citizens",
        desc: "Outdated, complex web designs block disabled citizens from accessing essential services.",
      },
      {
        title: "Secure Citizen Tax & ID Records",
        desc: "Traditional logins risk compromise, exposing sensitive citizen tax and health records.",
      },
      {
        title: "Track Citizen Service Status Live",
        desc: "Clunky processing queues leave citizens in the dark about the status of applications.",
      },
    ],
    solutions: [
      {
        title: "WCAG 2.1 Screen-Reader Compliant Portals",
        desc: "Highly-accessible web structures optimized for screen readers and keyboard navigation.",
      },
      {
        title: "Zero-Trust Centralized ID Verifiers",
        desc: "Zero-trust verification protocols protecting user data and verifying logins securely.",
      },
      {
        title: "Central Citizen Application Tracker Dashboards",
        desc: "Centralized tracking portals offering real-time progress updates on all applications.",
      },
    ],
    metrics: [
      { value: "100%", label: "WCAG 2.1 AA Compliance" },
      { value: "10x", label: "Service Request Processing" },
      { value: "100%", label: "Identity Data Security" },
    ],
    architecture: {
      source: "Citizen Web Portal Interface",
      process: "Federated Digital Identity Gateways",
      target: "Protected Citizen Records DB",
      description: "Citizens log in securely using dynamic ID protocols, access accessible service portals, and track applications.",
    },
  },
};

// Strict Tailwind CSS theme mapper to avoid dynamic string issues
interface ThemeStyles {
  text: string;
  bg: string;
  bgLight: string;
  bgSuperLight: string;
  border: string;
  borderHover: string;
  ring: string;
  glow: string;
  gradientText: string;
}

const themeStylesMap: Record<string, ThemeStyles> = {
  sky: {
    text: "text-sky-500",
    bg: "bg-sky-500",
    bgLight: "bg-sky-50",
    bgSuperLight: "from-sky-50/70 via-white to-slate-50/50",
    border: "border-sky-100",
    borderHover: "group-hover:border-sky-300",
    ring: "focus:ring-sky-500",
    glow: "rgba(14,165,233,0.18)",
    gradientText: "from-slate-900 to-sky-500"
  },
  cyan: {
    text: "text-cyan-500",
    bg: "bg-cyan-500",
    bgLight: "bg-cyan-50",
    bgSuperLight: "from-cyan-50/70 via-white to-slate-50/50",
    border: "border-cyan-100",
    borderHover: "group-hover:border-cyan-300",
    ring: "focus:ring-cyan-500",
    glow: "rgba(6,182,212,0.18)",
    gradientText: "from-cyan-600 via-teal-600 to-emerald-600"
  },
  indigo: {
    text: "text-indigo-500",
    bg: "bg-indigo-500",
    bgLight: "bg-indigo-50",
    bgSuperLight: "from-indigo-50/70 via-white to-slate-50/50",
    border: "border-indigo-100",
    borderHover: "group-hover:border-indigo-300",
    ring: "focus:ring-indigo-500",
    glow: "rgba(99,102,241,0.18)",
    gradientText: "from-indigo-600 via-purple-600 to-pink-600"
  },
  orange: {
    text: "text-orange-500",
    bg: "bg-orange-500",
    bgLight: "bg-orange-50",
    bgSuperLight: "from-orange-50/70 via-white to-slate-50/50",
    border: "border-orange-100",
    borderHover: "group-hover:border-orange-300",
    ring: "focus:ring-orange-500",
    glow: "rgba(249,115,22,0.18)",
    gradientText: "from-orange-600 via-amber-600 to-yellow-500"
  },
  emerald: {
    text: "text-emerald-500",
    bg: "bg-emerald-500",
    bgLight: "bg-emerald-50",
    bgSuperLight: "from-emerald-50/70 via-white to-slate-50/50",
    border: "border-emerald-100",
    borderHover: "group-hover:border-emerald-300",
    ring: "focus:ring-emerald-500",
    glow: "rgba(16,185,129,0.18)",
    gradientText: "from-emerald-600 via-teal-600 to-cyan-600"
  },
  zinc: {
    text: "text-zinc-500",
    bg: "bg-zinc-500",
    bgLight: "bg-zinc-100",
    bgSuperLight: "from-zinc-100/50 via-white to-slate-50/50",
    border: "border-zinc-200",
    borderHover: "group-hover:border-zinc-400",
    ring: "focus:ring-zinc-500",
    glow: "rgba(113,113,122,0.18)",
    gradientText: "from-slate-800 via-zinc-700 to-slate-600"
  },
  red: {
    text: "text-red-500",
    bg: "bg-red-500",
    bgLight: "bg-red-50",
    bgSuperLight: "from-red-50/60 via-white to-slate-50/50",
    border: "border-red-100",
    borderHover: "group-hover:border-red-300",
    ring: "focus:ring-red-500",
    glow: "rgba(239,68,68,0.18)",
    gradientText: "from-red-600 via-rose-600 to-orange-500"
  },
  purple: {
    text: "text-purple-500",
    bg: "bg-purple-500",
    bgLight: "bg-purple-50",
    bgSuperLight: "from-purple-50/70 via-white to-slate-50/50",
    border: "border-purple-100",
    borderHover: "group-hover:border-purple-300",
    ring: "focus:ring-purple-500",
    glow: "rgba(168,85,247,0.18)",
    gradientText: "from-purple-600 via-violet-600 to-indigo-600"
  },
  slate: {
    text: "text-slate-500",
    bg: "bg-slate-500",
    bgLight: "bg-slate-100",
    bgSuperLight: "from-slate-100/60 via-white to-slate-50/50",
    border: "border-slate-200",
    borderHover: "group-hover:border-slate-400",
    ring: "focus:ring-slate-500",
    glow: "rgba(100,116,139,0.18)",
    gradientText: "from-slate-800 via-slate-600 to-zinc-500"
  },
  pink: {
    text: "text-pink-500",
    bg: "bg-pink-500",
    bgLight: "bg-pink-50",
    bgSuperLight: "from-pink-50/70 via-white to-slate-50/50",
    border: "border-pink-100",
    borderHover: "group-hover:border-pink-300",
    ring: "focus:ring-pink-500",
    glow: "rgba(236,72,153,0.18)",
    gradientText: "from-pink-600 via-rose-500 to-red-500"
  },
  green: {
    text: "text-green-500",
    bg: "bg-green-500",
    bgLight: "bg-green-50",
    bgSuperLight: "from-green-50/70 via-white to-slate-50/50",
    border: "border-green-100",
    borderHover: "group-hover:border-green-300",
    ring: "focus:ring-green-500",
    glow: "rgba(34,197,94,0.18)",
    gradientText: "from-green-600 via-emerald-600 to-teal-500"
  }
};

// CountUpMetric component for interactive statistics
const CountUpMetric = ({
  value,
  className = "",
}: {
  value: string;
  className?: string;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  const prefixMatch = value.match(/^([+\-<]+)/);
  const prefix = prefixMatch ? prefixMatch[1] : "";

  const suffixMatch = value.match(/([%a-zA-Z\s]+)$/);
  const suffix = suffixMatch ? suffixMatch[1] : "";

  const numericString = value.replace(/[^0-9.]/g, "");
  const numericValue = parseFloat(numericString) || 0;

  const decimalMatch = numericString.split(".");
  const decimalPlaces = decimalMatch[1] ? decimalMatch[1].length : 0;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const duration = 2000;
          const steps = duration / 16;
          const increment = numericValue / steps;
          const timer = setInterval(() => {
            start += increment;
            if (start >= numericValue) {
              setCount(numericValue);
              clearInterval(timer);
            } else {
              setCount(start);
            }
          }, 16);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [numericValue]);

  const displayValue = decimalPlaces > 0 ? count.toFixed(decimalPlaces) : Math.floor(count);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
};

// Word-by-word reveal for premium feel
const StaggeredReveal = ({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) => {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: delay + i * 0.05,
            ease: "easeOut",
          }}
          className="inline-block mr-1.5 last:mr-0"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

// SpotlightCard for cursor tracking glowing layout
function SpotlightCard({
  children,
  className = "",
  glowColor = "rgba(14,165,233,0.12)",
}: {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const onMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative overflow-hidden ${className}`}
    >
      {hovered && (
        <div
          className="pointer-events-none absolute z-0 rounded-full transition-opacity duration-300"
          style={{
            width: 350,
            height: 350,
            background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
            left: pos.x - 175,
            top: pos.y - 175,
          }}
        />
      )}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}

export default function IndustryDetailsPage() {
  const { slug } = useParams() as { slug: string };
  const data = industryContent[slug];

  // Active challenge selected inside the tab terminal
  const [activeTab, setActiveTab] = useState(0);

  const bgImageMap: Record<string, string> = {
    fintech: "/moonshot_images/Fintech.jpg",
    healthcare: "/moonshot_images/healthcare.webp",
    "e-commerce": "/moonshot_images/E-commerce.jpeg",
    logistics: "/moonshot_images/logistics.jpg",
    "real-estate": "/moonshot_images/real-estate.png",
    education: "/moonshot_images/education.jpeg",
    manufacturing: "/moonshot_images/manufacturing.webp",
    "travel-hospitality": "/moonshot_images/travel-hospitality.png",
    "banking-insurance": "/moonshot_images/banking.jpeg",
    cybersecurity: "/moonshot_images/Cybersecurity.webp",
    telecom: "/moonshot_images/telecom.jpg",
    automotive: "/moonshot_images/Automotive.jpg",
    "media-entertainment": "/moonshot_images/Media & Entertainment.webp",
    "food-restaurant-tech": "/moonshot_images/food-restaurant-tech.jpg",
    "government-public-sector": "/moonshot_images/government-public-sector.jpg",
  };
  const bgImage = bgImageMap[slug] ? encodeURI(bgImageMap[slug]).replace(/&/g, "%26") : undefined;

  if (!data) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-8">
        <AlertCircle className="w-16 h-16 text-rose-500 mb-4 animate-bounce" />
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Sector Not Found</h1>
        <p className="text-slate-500 mb-6">The requested industry sector information path does not exist.</p>
        <Link
          href="/industries"
          className="btn-primary inline-flex items-center gap-2"
        >
          <ArrowLeft size={18} /> Back to Industries
        </Link>
      </div>
    );
  }

  // Always use the logo's primary brand theme (Sky Blue & Deep Navy) to ensure consistent brand identity
  const styles = themeStylesMap.sky;

  const leftIconMap: Record<string, React.ReactNode> = {
    fintech: <Database className="w-6 h-6 text-sky-500" />,
    healthcare: <Activity className="w-6 h-6 text-cyan-500" />,
    "e-commerce": <Zap className="w-6 h-6 text-indigo-500" />,
    logistics: <Cpu className="w-6 h-6 text-sky-500" />,
    "real-estate": <Globe2 className="w-6 h-6 text-orange-500" />,
    education: <Layers className="w-6 h-6 text-emerald-500" />,
    manufacturing: <Cpu className="w-6 h-6 text-zinc-500" />,
    "travel-hospitality": <Globe2 className="w-6 h-6 text-sky-500" />,
    "banking-insurance": <ShieldCheck className="w-6 h-6 text-indigo-500" />,
    cybersecurity: <ShieldCheck className="w-6 h-6 text-red-500" />,
    telecom: <Activity className="w-6 h-6 text-purple-500" />,
    automotive: <Cpu className="w-6 h-6 text-slate-500" />,
    "media-entertainment": <Layers className="w-6 h-6 text-pink-500" />,
    "food-restaurant-tech": <Zap className="w-6 h-6 text-orange-500" />,
    "government-public-sector": <Database className="w-6 h-6 text-green-500" />,
  };

  const rightIconMap: Record<string, React.ReactNode> = {
    fintech: <ShieldCheck className="w-6 h-6 text-sky-400" />,
    healthcare: <ShieldCheck className="w-6 h-6 text-cyan-400" />,
    "e-commerce": <Layers className="w-6 h-6 text-indigo-400" />,
    logistics: <Globe2 className="w-6 h-6 text-sky-400" />,
    "real-estate": <Layers className="w-6 h-6 text-orange-400" />,
    education: <Globe2 className="w-6 h-6 text-emerald-400" />,
    manufacturing: <Database className="w-6 h-6 text-zinc-400" />,
    "travel-hospitality": <Layers className="w-6 h-6 text-sky-400" />,
    "banking-insurance": <Database className="w-6 h-6 text-indigo-400" />,
    cybersecurity: <Terminal className="w-6 h-6 text-red-400" />,
    telecom: <Globe2 className="w-6 h-6 text-purple-400" />,
    automotive: <Zap className="w-6 h-6 text-slate-400" />,
    "media-entertainment": <Sparkles className="w-6 h-6 text-pink-400" />,
    "food-restaurant-tech": <Database className="w-6 h-6 text-orange-400" />,
    "government-public-sector": <ShieldCheck className="w-6 h-6 text-green-400" />,
  };

  const leftIconRaw = leftIconMap[slug] || <Cpu className="w-6 h-6 text-sky-500" />;
  const rightIconRaw = rightIconMap[slug] || <Globe2 className="w-6 h-6 text-sky-400" />;

  // Force logo brand colors (Sky Blue) for all industry icons
  const leftIcon = React.cloneElement(leftIconRaw as React.ReactElement, {
    className: "w-6 h-6 text-sky-500"
  });
  const rightIcon = React.cloneElement(rightIconRaw as React.ReactElement, {
    className: "w-6 h-6 text-sky-400"
  });

  return (
    <div className="bg-slate-50/30 min-h-screen overflow-hidden">
      {/* ══════════════════ HERO SECTION (PREMIUM LIGHT THEME) ══════════════════ */}
      <section className={`relative bg-gradient-to-br ${styles.bgSuperLight} py-28 md:py-36 overflow-hidden border-b border-slate-100/80`}>
        {/* Soft background glow orbs */}
        <div className={`absolute top-1/4 left-[5%] w-96 h-96 rounded-full blur-[100px] pointer-events-none`}
             style={{ background: `radial-gradient(circle, ${styles.glow} 0%, transparent 75%)` }} />
        <div className="absolute bottom-1/4 right-[5%] w-[450px] h-[450px] bg-slate-200/40 rounded-full blur-[100px] pointer-events-none" />

        {/* Animated background tech matrix grid */}
        <div className="absolute inset-0 pointer-events-none opacity-60 overflow-hidden">
          <motion.div
            animate={{
              x: [0, 40, -20, 0],
              y: [0, -30, 20, 0],
              scale: [1, 1.05, 0.98, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`absolute top-10 left-[8%] h-48 w-48 rounded-full blur-3xl`}
            style={{ backgroundColor: `${styles.glow}` }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(14,165,233,0.03) 1px, transparent 1px),
                                linear-gradient(to bottom, rgba(14,165,233,0.03) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        {/* Floating Sparks/Fireflies Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: `${10 + Math.random() * 80}%`,
                y: "105%",
                opacity: 0,
                scale: 0.3 + Math.random() * 0.7,
              }}
              animate={{
                y: ["105%", "-10%"],
                opacity: [0, 0.5, 0.5, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 10 + Math.random() * 8,
                repeat: Infinity,
                ease: "linear",
                delay: i * 1.2,
              }}
              className={`absolute w-4 h-4 ${styles.text} opacity-40`}
            >
              <Sparkles size={14} className="animate-pulse" />
            </motion.div>
          ))}
        </div>

        {/* Left Floating Industry Icon Orb */}
        <motion.div
          initial={{ opacity: 0, x: -50, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute left-[8%] top-[40%] hidden xl:flex z-20"
        >
          <motion.div
            animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className={`w-16 h-16 bg-white rounded-3xl shadow-[0_15px_40px_rgba(0,0,0,0.06)] border border-slate-100 flex items-center justify-center hover:scale-110 hover:border-slate-200 transition-all duration-300 cursor-pointer`}
          >
            {leftIcon}
          </motion.div>
        </motion.div>

        {/* Right Floating Industry Icon Orb */}
        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute right-[8%] top-[40%] hidden xl:flex z-20"
        >
          <motion.div
            animate={{ y: [0, 15, 0], rotate: [0, -5, 5, 0] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className={`w-16 h-16 bg-white rounded-3xl shadow-[0_15px_40px_rgba(0,0,0,0.06)] border border-slate-100 flex items-center justify-center hover:scale-110 hover:border-slate-200 transition-all duration-300 cursor-pointer`}
          >
            {rightIcon}
          </motion.div>
        </motion.div>

        {/* Full-width dynamic background image integrated very lightly */}
        {bgImage && (
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none opacity-[0.06] mix-blend-multiply">
            <img
              src={bgImage}
              alt={data.title}
              className="w-full h-full object-cover scale-105 select-none pointer-events-none filter saturate-50"
            />
          </div>
        )}

        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`inline-flex items-center gap-2 bg-white border border-slate-100 shadow-[0_5px_15px_rgba(0,0,0,0.02)] rounded-full px-5 py-2.5 mb-8`}
          >
            <Sparkles className={`w-4 h-4 ${styles.text} animate-pulse`} />
            <span className={`text-xs font-black tracking-[0.2em] uppercase text-slate-500`}>Sector Intelligence Blueprint</span>
          </motion.div>

          <h1 className={`text-5xl md:text-7xl font-black mb-6 tracking-tighter leading-none bg-gradient-to-r ${styles.gradientText} bg-clip-text text-transparent`}>
            <StaggeredReveal text={data.title} />
          </h1>

          {/* Styled Underline Accent with Shimmering Laser effect */}
          <div className="relative mb-8">
            <div className={`w-32 h-1.5 bg-gradient-to-r ${styles.gradientText} rounded-full`} />
            <motion.div
              animate={{ x: [-64, 64] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-12 h-full bg-gradient-to-r from-transparent via-white/70 to-transparent blur-[1px] pointer-events-none"
            />
          </div>

          <p className="text-lg md:text-2xl text-slate-600 font-medium leading-relaxed mb-10 max-w-2xl mx-auto">
            <StaggeredReveal text={data.desc} delay={0.2} />
          </p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-wrap gap-2.5 justify-center mb-12"
          >
            {data.tags.map((tag, idx) => (
              <motion.span
                key={tag}
                whileHover={{ y: -3, scale: 1.05 }}
                className={`px-5 py-2 rounded-full text-xs font-bold bg-white border border-slate-150 shadow-[0_5px_10px_rgba(0,0,0,0.02)] tracking-wide text-slate-600 hover:border-slate-350 hover:text-slate-900 cursor-default transition-all duration-200`}
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Link
              href="/industries"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-slate-200 hover:border-sky-300 hover:text-sky-600 text-xs font-bold text-slate-600 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <ArrowLeft size={14} /> Back to Sectors
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════ INTERACTIVE SWITCHER TERMINAL (CHALLENGES VS SOLUTIONS) ══════════════════ */}
      <section className="py-24 bg-slate-50/60 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[140px] pointer-events-none"
             style={{ background: `radial-gradient(circle, ${styles.glow} 0%, transparent 75%)` }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-100 shadow-sm mb-3`}
            >
              <Workflow className={`w-3.5 h-3.5 ${styles.text}`} />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Interactive Guide</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Business Goals & Custom Solutions</h3>
            <p className="text-slate-500 text-sm mt-3">Select a key business objective below to see how our custom technology drives efficiency and security.</p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Column: Challenges selector */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1 px-1">Select an Objective</span>
              {data.challenges.map((challenge, idx) => {
                const isActive = activeTab === idx;
                return (
                  <motion.button
                    key={challenge.title}
                    onClick={() => setActiveTab(idx)}
                    whileHover={{ x: isActive ? 0 : 5 }}
                    whileTap={{ scale: 0.98 }}
                    className={`text-left p-6 rounded-[2rem] border transition-all duration-300 flex items-start gap-4 shadow-sm hover:shadow-md relative overflow-hidden ${
                      isActive 
                        ? `bg-white border-sky-300 ring-2 ring-sky-100` 
                        : "bg-white/80 border-slate-100/80 hover:bg-white hover:border-slate-200"
                    }`}
                  >
                    {/* Active accent side strip */}
                    {isActive && (
                      <motion.div 
                        layoutId="activeSideStrip"
                        className={`absolute left-0 inset-y-0 w-1.5 ${styles.bg}`}
                      />
                    )}
                    
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${
                      isActive 
                        ? `${styles.bg} text-white` 
                        : "bg-sky-50 text-sky-500 group-hover:bg-sky-500 group-hover:text-white"
                    }`}>
                      <Zap size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm md:text-base leading-snug">{challenge.title}</h4>
                      <p className="text-slate-400 text-xs mt-1 leading-normal font-semibold">Use Case {idx + 1}</p>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Right Column: Dynamic Remedy detail card */}
            <div className="lg:col-span-7">
              <div className="h-full bg-white rounded-[2.5rem] border border-slate-100 p-8 md:p-12 shadow-md relative overflow-hidden flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-32 h-32 blur-3xl pointer-events-none rounded-bl-full"
                     style={{ backgroundColor: `${styles.glow}` }} />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="flex flex-col h-full justify-between"
                  >
                    <div>
                      {/* Active tag info */}
                      <div className="flex items-center gap-3 mb-6">
                        <span className="text-[10px] font-black text-sky-600 bg-sky-50 border border-sky-100 px-3 py-1 rounded-full uppercase tracking-wider">
                          Use Case: {data.challenges[activeTab].title}
                        </span>
                        <ArrowRightLeft className="w-4 h-4 text-slate-300" />
                        <span className={`text-[10px] font-black ${styles.text} ${styles.bgLight} border ${styles.border} px-3 py-1 rounded-full uppercase tracking-wider`}>
                          Our Solution Ready
                        </span>
                      </div>

                      <h4 className="text-2xl md:text-3xl font-extrabold text-slate-850 tracking-tight leading-snug mb-4">
                        {data.solutions[activeTab].title}
                      </h4>
                      
                      <div className="w-12 h-1 bg-slate-100 rounded-full mb-6" />

                      <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6 font-medium">
                        {data.solutions[activeTab].desc}
                      </p>

                      <div className="bg-slate-50 rounded-2xl border border-slate-100 p-5 mt-6">
                        <span className="text-slate-400 text-xs font-bold uppercase tracking-widest block mb-2">Why This Matters</span>
                        <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                          {data.challenges[activeTab].desc}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 items-center justify-between mt-8 pt-6 border-t border-slate-50 shrink-0">
                      <div className="flex items-center gap-2">
                        <div className={`w-2.5 h-2.5 rounded-full ${styles.bg} animate-ping`} />
                        <span className="text-xs font-bold text-slate-700">Solution Ready to Implement</span>
                      </div>
                      <Link
                        href="/contact"
                        className={`inline-flex items-center gap-2 text-xs font-bold ${styles.text} hover:opacity-85 transition-opacity`}
                      >
                        Implement This Solution <ArrowRight size={14} />
                      </Link>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ SIMULATED ARCHITECTURE FLOW (BLUEPRINT DESIGN) ══════════════════ */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-100 shadow-sm mb-3`}
            >
              <FileCode className={`w-3.5 h-3.5 ${styles.text}`} />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">System Topologies</span>
            </motion.div>
            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Representative Data Pipeline</h3>
            <p className="text-slate-500 text-sm mt-3">An engineering breakdown of component validation nodes as transaction signals ingest to database files.</p>
          </div>

          <div className="max-w-4xl mx-auto bg-slate-50/40 rounded-[2.5rem] border border-slate-100/80 p-8 md:p-12 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 blur-3xl pointer-events-none rounded-bl-full"
                 style={{ backgroundColor: `${styles.glow}` }} />

            <div className="grid md:grid-cols-3 gap-8 items-center text-center relative z-10">
              {/* Step 1 */}
              <motion.div
                initial={{ opacity: 0, x: -35 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 80 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`flex flex-col items-center p-6 bg-white rounded-2xl border border-slate-100/80 group hover:border-${styles.text.split("-")[1]}-200 transition-all shadow-sm`}
              >
                <div className={`w-10 h-10 rounded-full ${styles.bgLight} ${styles.text} flex items-center justify-center mb-4`}>
                  <Globe2 size={20} className="animate-spin-slow" />
                </div>
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-1.5">Source Ingress</span>
                <h4 className="text-sm font-extrabold text-slate-800 leading-tight">{data.architecture.source}</h4>
              </motion.div>

              {/* Step 2 */}
              <motion.div
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, type: "spring", stiffness: 80 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="flex flex-col items-center p-6 bg-white rounded-2xl border border-slate-100/80 group hover:border-sky-200 transition-all shadow-sm relative"
              >
                {/* Laser connections with continuous line movement */}
                <div className="absolute top-1/2 -left-6 -translate-y-1/2 w-4 h-4 hidden md:flex items-center justify-center text-sky-400">
                  <motion.div
                    animate={{ x: [-8, 8, -8] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ArrowRight size={14} />
                  </motion.div>
                </div>
                <div className="absolute top-1/2 -right-6 -translate-y-1/2 w-4 h-4 hidden md:flex items-center justify-center text-sky-400">
                  <motion.div
                    animate={{ x: [-8, 8, -8] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
                  >
                    <ArrowRight size={14} />
                  </motion.div>
                </div>

                <div className="w-10 h-10 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center mb-4">
                  <Cpu size={20} className="animate-pulse" />
                </div>
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-1.5">Middleware Hub</span>
                <h4 className="text-sm font-extrabold text-slate-800 leading-tight">{data.architecture.process}</h4>
              </motion.div>

              {/* Step 3 */}
              <motion.div
                initial={{ opacity: 0, x: 35 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, type: "spring", stiffness: 80 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="flex flex-col items-center p-6 bg-white rounded-2xl border border-slate-100/80 group hover:border-slate-350 transition-all shadow-sm"
              >
                <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center mb-4">
                  <Database size={20} />
                </div>
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-1.5">Target Vault</span>
                <h4 className="text-sm font-extrabold text-slate-800 leading-tight">{data.architecture.target}</h4>
              </motion.div>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-100 text-center text-slate-500 text-sm leading-relaxed max-w-2xl mx-auto relative z-10">
              <span className="font-bold text-slate-700 block mb-2 text-xs uppercase tracking-widest">Architectural Execution</span>
              <p className="text-slate-500 text-xs md:text-sm font-medium">{data.architecture.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ CTA CARD ══════════════════ */}
      <section className="py-24 bg-slate-50/50 border-t border-slate-100/60 relative">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-[2.5rem] overflow-hidden bg-white border border-slate-100/80 p-12 md:p-16 text-center shadow-md hover:shadow-xl hover:border-slate-200 transition-all duration-500 group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-sky-50/5 via-transparent to-sky-50/5 animate-shimmer opacity-20 pointer-events-none" />

            <div className="relative z-10">
              <motion.div
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-slate-100"
              >
                <Terminal size={30} className={styles.text} />
              </motion.div>

              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
                Engineering your custom <span className={styles.text}>{data.title}</span> solution
              </h2>
              
              <p className="text-slate-500 text-sm md:text-base max-w-xl mx-auto mb-10 leading-relaxed font-semibold">
                Our specialists coordinate with your key stakeholders to construct high-performance, compliant systems matching your exact scale targets.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/contact"
                    className={`btn-primary flex items-center justify-center gap-2 text-sm px-8 py-4 rounded-xl ${styles.bg} hover:brightness-105 shadow-sm text-white`}
                  >
                    Request Consultation Call{" "}
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                    >
                      <ArrowRight size={16} />
                    </motion.span>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/industries"
                    className="btn-outline flex items-center justify-center gap-2 text-sm px-8 py-4 rounded-xl bg-white border border-slate-150 hover:bg-slate-50 text-slate-600 font-bold"
                  >
                    All Industry Sectors
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
