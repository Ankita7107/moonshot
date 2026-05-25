"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
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
        title: "High-Latency Transaction Bottlenecks",
        desc: "Processing millions of transactions per second requires microsecond-level precision and minimal network congestion.",
      },
      {
        title: "Rigid Regulatory Compliance (PCI-DSS, GDPR)",
        desc: "Failing to secure financial ledgers and sensitive user metadata can lead to massive penalties and brand damage.",
      },
      {
        title: "Sophisticated Fraud & Sybil Vectors",
        desc: "Cyber threats continuously adapt, requiring immediate AI threat modeling at transaction validation time.",
      },
    ],
    solutions: [
      {
        title: "High-Frequency Ledger Consensus Layers",
        desc: "We design distributed ledger transaction pools executing atomic processing in under 15ms.",
      },
      {
        title: "Real-Time AI Fraud Scoring Engine",
        desc: "Intelligent scoring pipelines integrated directly into verification middleware to flag malicious operations instantly.",
      },
      {
        title: "Isolated Cryptographic Sandbox Architecture",
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
        title: "Fragmented EHR System Interoperability",
        desc: "Doctors and clinics operate on isolated databases, causing dangerous delay times in emergency patient care.",
      },
      {
        title: "Strict Privacy Safeguards (HIPAA/HITECH)",
        desc: "Strict compliance standards necessitate end-to-end data encryption in transit and at rest.",
      },
      {
        title: "Unstable Telehealth Communication Channels",
        desc: "Low network conditions routinely drop patient-doctor consultation calls in crucial clinical times.",
      },
    ],
    solutions: [
      {
        title: "HL7/FHIR Compliant API Gateways",
        desc: "Secure translation engines unifying disparate databases into standard, rapid electronic schemas.",
      },
      {
        title: "Zero-Trust Encrypted Cloud Data Vaults",
        desc: "Advanced cryptographic data locks ensuring all EHR queries are traced, fully validated, and encrypted.",
      },
      {
        title: "Adaptive Rate WebRTC Telehealth Pipelines",
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
        title: "Traffic Spikes and Storefront Crashes",
        desc: "Sudden seasonal flash sales overwhelm traditional hosting, causing downtime and lost revenue.",
      },
      {
        title: "Mismatched Omnichannel Inventories",
        desc: "Siloed retail databases cause product overselling and critical supply chain friction.",
      },
      {
        title: "Poor User Catalog Discovery",
        desc: "Static retail grids fail to personalize results, reducing average order values and buyer engagement.",
      },
    ],
    solutions: [
      {
        title: "Dynamic Autoscaling Edge Storefronts",
        desc: "Serverless global edge networks designed to scale seamlessly during massive consumer spikes.",
      },
      {
        title: "Event-Sourced Global Inventory Hubs",
        desc: "Automated, real-time message streams keeping physical, web, and distributor catalogs in absolute sync.",
      },
      {
        title: "Elasticsearch Personalization Pipelines",
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
        title: "Suboptimal Routing Routines",
        desc: "Inefficient fleet routes waste fuel, increase transit times, and cause scheduling friction.",
      },
      {
        title: "High-Volume Fleet Ingestion Latency",
        desc: "Handling real-time tracking signals from thousands of IoT trackers causes dashboard lag.",
      },
      {
        title: "Unsynchronized Warehouse Desks",
        desc: "Manual inventory audits slow sorting speeds and cause bottlenecks at delivery stations.",
      },
    ],
    solutions: [
      {
        title: "GIS-Driven Dynamic Routing Engines",
        desc: "Intelligent routing pipelines computing live updates based on weather, traffic, and vehicle load.",
      },
      {
        title: "AWS Kinesis IoT Ingestion Pipelines",
        desc: "High-throughput data pipelines parsing telemetry streams instantly for real-time dashboards.",
      },
      {
        title: "Dynamic Smart-Bin Warehouse Managers",
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
        title: "Stale Multi-Listing Syncs",
        desc: "Outdated property boards cause buyer frustration and waste precious sales outreach resources.",
      },
      {
        title: "Manual Agent Lead Qualification",
        desc: "Agents spend hours sorting cold leads, slowing down high-value negotiation closures.",
      },
      {
        title: "Static Property Visualization",
        desc: "Traditional flat images fail to engage distant premium clients or show spatial layouts.",
      },
    ],
    solutions: [
      {
        title: "RESO-Compliant Real-Time Feeds",
        desc: "Advanced sync engines standardizing property schemas and updating boards in real time.",
      },
      {
        title: "Automated Qualification CRMs",
        desc: "AI bots qualifying buyers on listing pages and instantly scheduling priority viewings.",
      },
      {
        title: "3D WebGL Property Visualizers",
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
        title: "Fragmented Learning Hub Standards",
        desc: "Siloed content channels cause classroom communication drops and grade tracking errors.",
      },
      {
        title: "Laggy Virtual Classrooms",
        desc: "Unstable media connections during large-scale lectures disrupt lessons and impact learning.",
      },
      {
        title: "Static One-Size Learning Speed",
        desc: "Uniform teaching formats leave struggling students behind and bore advanced learners.",
      },
    ],
    solutions: [
      {
        title: "SCORM/LTI Standard LMS Core",
        desc: "Robust architecture unifying course objects, progress analytics, and class registries.",
      },
      {
        title: "Low-Latency WebSockets Classrooms",
        desc: "Real-time communication engines ensuring fluid group chats, whiteboards, and screensharing.",
      },
      {
        title: "AI Adaptive Progress Builders",
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
        title: "Isolated Factory SCADA Networks",
        desc: "Industrial networks trap vital operating metrics inside physical devices, preventing unified reporting.",
      },
      {
        title: "High Costs of Sudden Machine Failure",
        desc: "Unexpected breakdowns halt assembly lines, costing thousands of dollars in lost productivity.",
      },
      {
        title: "Opaque Supply Chains",
        desc: "Opaque delivery pipelines make raw material tracking and production forecasting difficult.",
      },
    ],
    solutions: [
      {
        title: "Unified IoT Protocol Gateways",
        desc: "Secure software translators converting SCADA/Modbus streams into secure cloud signals.",
      },
      {
        title: "Predictive AI Failure Forecasters",
        desc: "Machine learning engines monitoring temperature and vibration to trigger predictive maintenance tasks.",
      },
      {
        title: "Supply Chain Tracking Maps",
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
        title: "Slow GDS Connection Pipelines",
        desc: "Outdated booking syncs cause double-bookings and display inaccurate pricing.",
      },
      {
        title: "Lost Revenue Due to Rigid Pricing",
        desc: "Inflexible pricing structures miss out on high-demand windows and occupancy optimization.",
      },
      {
        title: "Siloed Guest Profiles",
        desc: "Disconnected guest histories make it difficult to offer personalized stays and rewards.",
      },
    ],
    solutions: [
      {
        title: "Sabre & Amadeus Direct APIs",
        desc: "Direct integration channels providing instant reservation syncs across global networks.",
      },
      {
        title: "Dynamic Revenue Optimization Systems",
        desc: "AI pricing models adjusting rates automatically based on local demand, occupancy, and season.",
      },
      {
        title: "Unified Guest Experience Hubs",
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
        title: "Fragmented Core Banking Systems",
        desc: "Legacy ledger databases delay payment validations and make real-time financial tracking difficult.",
      },
      {
        title: "Slow and Manual Claims Validation",
        desc: "Manual claims verification processes frustrate policyholders and increase operational costs.",
      },
      {
        title: "Inaccurate Financial Risk Scoring",
        desc: "Static risk scoring models fail to predict modern default patterns and portfolio threats.",
      },
    ],
    solutions: [
      {
        title: "Distributed Core Ledger Hubs",
        desc: "Atomic ledgers designed to handle complex transactions with zero risk of processing mismatch.",
      },
      {
        title: "Automated Insurance Verification Flows",
        desc: "Intelligent processing pipelines automating up to 90% of simple claims validation checks.",
      },
      {
        title: "Dynamic AI Portfolio Risk Evaluators",
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
        title: "Telemetry Noise in Threat Databases",
        desc: "Security teams are overwhelmed by thousands of false alerts, delaying response to real threats.",
      },
      {
        title: "Slow Threat Mitigation Speeds",
        desc: "Manual threat isolation steps give attackers precious time to move through sensitive corporate networks.",
      },
      {
        title: "Vulnerable Access Points",
        desc: "Traditional password systems leave enterprise gates vulnerable to social engineering and phishing.",
      },
    ],
    solutions: [
      {
        title: "Intelligent Endpoint Telemetry Filters",
        desc: "Real-time anomaly scoring systems weeding out noise and highlighting critical system threats.",
      },
      {
        title: "Automated Incident Containment Engine",
        desc: "Automated playbooks isolating compromised endpoints and resetting credentials in seconds.",
      },
      {
        title: "Zero-Trust Identity Access Controllers",
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
        title: "Complex Multi-Tenant Billing Systems",
        desc: "Slow database pipelines cause billing mismatches and delay monthly revenue reconciliation.",
      },
      {
        title: "High Latency in 5G Traffic Routing",
        desc: "Inefficient traffic controllers delay connections in high-density consumer neighborhoods.",
      },
      {
        title: "Difficult Network Configuration Updates",
        desc: "Manual network updates require service windows and risk causing massive outages.",
      },
    ],
    solutions: [
      {
        title: "High-Throughput Billing Engines",
        desc: "Real-time data streaming engines calculating data usage and processing payments instantly.",
      },
      {
        title: "Low-Latency traffic Optimization",
        desc: "Low-latency microservices ensuring steady connections for real-time applications.",
      },
      {
        title: "Automated Network Configuration Controllers",
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
        title: "Processing High-Density CAN Bus Signals",
        desc: "Connected car systems must process massive amounts of raw sensor data with zero latency.",
      },
      {
        title: "Untracked EV Battery Degradation",
        desc: "Without battery health tracking, fleet managers face sudden vehicle breakdowns.",
      },
      {
        title: "High-Latency Vehicle Telematics",
        desc: "Delayed GPS and safety telemetry updates slow down fleet operations and crash response times.",
      },
    ],
    solutions: [
      {
        title: "Low-Latency CAN Bus Parsers",
        desc: "Highly-optimized edge software designed to filter and parse vehicle diagnostic signals.",
      },
      {
        title: "AI Battery Health Estimators",
        desc: "Predictive models monitoring cell voltage and temperature to forecast battery life.",
      },
      {
        title: "Real-Time Vehicle Tracking Gateways",
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
        title: "Slow Stream Start Times",
        desc: "Laggy buffering spikes during peak hours frustrate viewers, increasing user unsubscribe rates.",
      },
      {
        title: "High Global Transcoding Costs",
        desc: "Encoding high-resolution video streams across multiple codecs strains backend server resources.",
      },
      {
        title: "Rigid Content Recommendations",
        desc: "Static video grids fail to engage viewers, reducing watch times and platform subscription retention.",
      },
    ],
    solutions: [
      {
        title: "HLS/DASH Adaptive Streamers",
        desc: "Adaptive video players dynamically adjusting streaming quality to preserve playback.",
      },
      {
        title: "Distributed Video Transcoding Queues",
        desc: "Autoscaling cloud queues processing video files across multiple formats efficiently.",
      },
      {
        title: "Dynamic User Interest Parsers",
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
        title: "Order Consolidation Bottlenecks",
        desc: "Managing orders from multiple delivery apps on separate tablets slows down busy kitchens.",
      },
      {
        title: "Slow Delivery Dispatch Routing",
        desc: "Inefficient driver matching delays dispatches, causing orders to arrive cold.",
      },
      {
        title: "Unreliable Network Connections",
        desc: "System drops during busy dinner rushes cause lost orders and database updates to fail.",
      },
    ],
    solutions: [
      {
        title: "Unified Restaurant POS Gateways",
        desc: "Central software endpoints combining orders from all delivery services into one kitchen screen.",
      },
      {
        title: "Real-Time Driver Dispatch Engine",
        desc: "Intelligent matching engines coordinating dispatches based on driver location and kitchen prep speeds.",
      },
      {
        title: "Offline-First Kitchen Dashboards",
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
        title: "Inaccessible Web Layout Designs",
        desc: "Outdated, complex web designs block disabled citizens from accessing essential services.",
      },
      {
        title: "Vulnerable Access Points",
        desc: "Traditional logins risk compromise, exposing sensitive citizen tax and health records.",
      },
      {
        title: "Opaque Public Service Tracking",
        desc: "Clunky processing queues leave citizens in the dark about the status of applications.",
      },
    ],
    solutions: [
      {
        title: "WCAG 2.1 AA Compliant Layouts",
        desc: "Highly-accessible web structures optimized for screen readers and keyboard navigation.",
      },
      {
        title: "Federated Secure Digital ID Hubs",
        desc: "Zero-trust verification protocols protecting user data and verifying logins securely.",
      },
      {
        title: "Unified Citizen Service Portals",
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

// CountUpMetric component
const CountUpMetric = ({
  value,
  className = "",
}: {
  value: string;
  className?: string;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  // Extract prefix (e.g. "+", "-", "<")
  const prefixMatch = value.match(/^([+\-<]+)/);
  const prefix = prefixMatch ? prefixMatch[1] : "";

  // Extract suffix (e.g. "%", "ms", "x", "m")
  const suffixMatch = value.match(/([%a-zA-Z\s]+)$/);
  const suffix = suffixMatch ? suffixMatch[1] : "";

  // Extract numbers
  const numericString = value.replace(/[^0-9.]/g, "");
  const numericValue = parseFloat(numericString) || 0;

  // Count decimal places
  const decimalMatch = numericString.split(".");
  const decimalPlaces = decimalMatch[1] ? decimalMatch[1].length : 0;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const duration = 2000; // 2 seconds
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

// StaggeredReveal component
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
            delay: delay + i * 0.08,
            ease: "easeOut",
          }}
          className="inline-block mr-2 last:mr-0"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

// SpotlightCard component for cursor tracking glow
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
      {children}
    </div>
  );
}

export default function IndustryDetailsPage() {
  const { slug } = useParams() as { slug: string };
  const data = industryContent[slug];

  const bgImageMap: Record<string, string> = {
    fintech: "/moonshot_images/Fintech.jpg",
    healthcare: "/moonshot_images/healthcare.webp",
    "e-commerce": "/moonshot_images/E-commerce.jpeg",
    logistics: "/moonshot_images/logistics.jpg",
    "real-estate": "/moonshot_images/real-estate.png",
    education: "/moonshot_images/education.jpeg",
    manufacturing: "/moonshot_images/manufacturing.webp",
    "travel-hospitality": "/moonshot_images/Travel & Hospitality.png",
    "banking-insurance": "/moonshot_images/banking.jpeg",
    cybersecurity: "/moonshot_images/Cybersecurity.webp",
    telecom: "/moonshot_images/telecom.jpg",
    automotive: "/moonshot_images/Automotive.jpg",
    "media-entertainment": "/moonshot_images/Media & Entertainment.webp",
    "food-restaurant-tech": "/moonshot_images/FoodRestaurantTech.jpg",
    "government-public-sector": "/moonshot_images/Government & Public Sector.jpg",
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

  const borderThemeClass = `group-hover:border-${data.themeColor}-300`;
  const textThemeClass = `text-${data.themeColor}-500`;
  const bgThemeClass = `bg-${data.themeColor}-500`;
  const glowShadowStyle = {
    boxShadow: `0 0 50px -10px ${data.glowColor}`,
  };

  const lightBgMap: Record<string, string> = {
    sky: "from-sky-50/60 via-white to-slate-50/50",
    cyan: "from-cyan-50/60 via-white to-slate-50/50",
    indigo: "from-indigo-50/60 via-white to-slate-50/50",
    orange: "from-orange-50/60 via-white to-slate-50/50",
    emerald: "from-emerald-50/60 via-white to-slate-50/50",
    zinc: "from-zinc-100/50 via-white to-slate-50/50",
    red: "from-red-50/55 via-white to-slate-50/50",
    purple: "from-purple-50/60 via-white to-slate-50/50",
    slate: "from-slate-100/60 via-white to-slate-50/50",
    pink: "from-pink-50/60 via-white to-slate-50/50",
    green: "from-green-50/60 via-white to-slate-50/50",
  };
  const lightBg = lightBgMap[data.themeColor] || "from-sky-50/60 via-white to-slate-50/50";

  const textGradientMap: Record<string, string> = {
    sky: "from-sky-600 via-blue-600 to-indigo-600",
    cyan: "from-cyan-600 via-teal-600 to-emerald-600",
    indigo: "from-indigo-600 via-purple-600 to-pink-600",
    orange: "from-orange-600 via-amber-600 to-yellow-500",
    emerald: "from-emerald-600 via-teal-600 to-cyan-600",
    zinc: "from-slate-800 via-zinc-700 to-slate-600",
    red: "from-red-600 via-rose-600 to-orange-500",
    purple: "from-purple-600 via-violet-600 to-indigo-600",
    slate: "from-slate-800 via-slate-600 to-zinc-500",
    pink: "from-pink-600 via-rose-500 to-red-500",
    green: "from-green-600 via-emerald-600 to-teal-500",
  };
  const textGradient = textGradientMap[data.themeColor] || "from-sky-600 via-blue-600 to-indigo-600";

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

  const leftIcon = leftIconMap[slug] || <Cpu className="w-6 h-6 text-sky-500" />;
  const rightIcon = rightIconMap[slug] || <Globe2 className="w-6 h-6 text-sky-400" />;

  return (
    <div className="bg-white min-h-screen overflow-hidden">
      {/* ══════════════════ HERO SECTION (LIGHT THEME) ══════════════════ */}
      <section className={`relative bg-gradient-to-br ${lightBg} py-24 md:py-32 overflow-hidden border-b border-slate-100`}>
        {/* Soft background glow orbs */}
        <div className={`absolute top-1/4 left-[5%] w-80 h-80 bg-${data.themeColor}-200/30 rounded-full blur-3xl pointer-events-none`} />
        <div className="absolute bottom-1/4 right-[5%] w-96 h-96 bg-purple-200/20 rounded-full blur-3xl pointer-events-none" />

        {/* Animated background particles with continuous physics drifting */}
        <div className="absolute inset-0 pointer-events-none opacity-40 overflow-hidden">
          <motion.div
            animate={{
              x: [0, 30, -15, 0],
              y: [0, -20, 15, 0],
              scale: [1, 1.1, 0.95, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`absolute top-10 left-[10%] h-40 w-40 rounded-full bg-${data.themeColor}-300/10 blur-3xl`}
          />
          <motion.div
            animate={{
              x: [0, -40, 20, 0],
              y: [0, 30, -20, 0],
              scale: [1, 0.9, 1.05, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute bottom-10 right-[15%] h-52 w-52 rounded-full bg-purple-300/10 blur-3xl"
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(15,23,42,0.02) 1px, transparent 1px),
                                linear-gradient(to bottom, rgba(15,23,42,0.02) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* Floating Sparks/Fireflies Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: `${10 + Math.random() * 80}%`,
                y: "105%",
                opacity: 0.05,
                scale: 0.4 + Math.random() * 0.6,
              }}
              animate={{
                y: ["105%", "-10%"],
                opacity: [0, 0.4, 0.4, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 9 + Math.random() * 6,
                repeat: Infinity,
                ease: "linear",
                delay: i * 1.6,
              }}
              className={`absolute w-3.5 h-3.5 text-${data.themeColor}-400/60`}
            >
              <Sparkles size={12} className="animate-pulse" />
            </motion.div>
          ))}
        </div>

        {/* Left Floating Industry Icon Orb */}
        <motion.div
          initial={{ opacity: 0, x: -30, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.div
            animate={{ y: [0, -15, 0], rotate: [0, 6, -6, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-[7%] top-[35%] hidden xl:flex w-16 h-16 bg-white/60 backdrop-blur-md rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/80 items-center justify-center z-10 cursor-pointer hover:scale-110 transition-transform duration-300"
          >
            {leftIcon}
          </motion.div>
        </motion.div>

        {/* Right Floating Industry Icon Orb */}
        <motion.div
          initial={{ opacity: 0, x: 30, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <motion.div
            animate={{ y: [0, 15, 0], rotate: [0, -6, 6, 0] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            className="absolute right-[7%] top-[35%] hidden xl:flex w-16 h-16 bg-white/60 backdrop-blur-md rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/80 items-center justify-center z-10 cursor-pointer hover:scale-110 transition-transform duration-300"
          >
            {rightIcon}
          </motion.div>
        </motion.div>

        {/* Full-width dynamic background image integrated very lightly */}
        {bgImage && (
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none opacity-[0.07] mix-blend-multiply">
            <img
              src={bgImage}
              alt={data.title}
              className="w-full h-full object-cover scale-105 select-none pointer-events-none"
            />
          </div>
        )}

        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className={`inline-flex items-center gap-2 bg-${data.themeColor}-50/80 backdrop-blur-md rounded-full px-4 py-2 border border-${data.themeColor}-100/80 mb-6`}
          >
            <Sparkles className={`w-4 h-4 text-${data.themeColor}-500 animate-pulse`} />
            <span className={`text-xs font-bold tracking-widest uppercase text-${data.themeColor}-600`}>Industry Insight</span>
          </motion.div>

          <h1 className={`text-5xl md:text-7xl font-black mb-4 tracking-tighter leading-tight bg-gradient-to-r ${textGradient} bg-clip-text text-transparent`}>
            <StaggeredReveal text={data.title} />
          </h1>

          {/* Styled Underline Accent with Shimmering Laser effect */}
          <div className="relative mb-6">
            <div className={`w-24 h-1.5 bg-gradient-to-r ${textGradient} rounded-full`} />
            <motion.div
              animate={{ x: [-48, 48] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-10 h-full bg-gradient-to-r from-transparent via-white/80 to-transparent blur-[2px] pointer-events-none"
            />
          </div>

          <p className="text-lg md:text-xl text-slate-600/90 font-medium leading-relaxed mb-8 max-w-2xl mx-auto">
            <StaggeredReveal text={data.desc} delay={0.25} />
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-2.5 justify-center mb-10"
          >
            {data.tags.map((tag) => (
              <motion.span
                key={tag}
                whileHover={{ y: -3, scale: 1.05 }}
                className={`px-4 py-1.5 rounded-full text-xs font-bold bg-white border border-slate-200/80 shadow-sm tracking-wide text-slate-600 hover:border-${data.themeColor}-300 hover:text-${data.themeColor}-600 cursor-default transition-all duration-200`}
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Link
              href="/industries"
              className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-slate-700 transition-colors"
            >
              <ArrowLeft size={16} /> Back to Sectors
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════ CORE METRICS ══════════════════ */}
      <section className="py-20 border-b border-slate-100 bg-white relative z-20 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {data.metrics.map((metric, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1, type: "spring", stiffness: 100 }}
              whileHover={{ y: -6 }}
              key={metric.label}
              className="group p-6 rounded-3xl hover:bg-slate-50/50 hover:shadow-xl hover:shadow-sky-100/20 transition-all duration-300 border border-transparent hover:border-slate-100"
            >
              <h3 className={`text-4xl md:text-5xl font-black ${textThemeClass} mb-3 group-hover:scale-110 transition-transform duration-500 flex justify-center items-center gap-1`}>
                <CountUpMetric value={metric.value} />
              </h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest group-hover:text-slate-600 transition-colors">
                {metric.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════ CORE CHALLENGES SOLVED ══════════════════ */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-xs font-semibold tracking-[0.3em] text-sky-500 uppercase mb-4">Core Silos Broken</h2>
            <h3 className="text-4xl font-bold text-slate-900">Challenges We Address</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {data.challenges.map((challenge, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1, type: "spring", stiffness: 100, damping: 15 }}
                whileHover={{ y: -10, scale: 1.015 }}
                key={challenge.title}
                className="bg-white p-8 rounded-3xl border border-slate-100/80 shadow-sm hover:shadow-xl hover:border-rose-200 transition-all duration-300 group"
              >
                <motion.div 
                  whileHover={{ rotate: [0, -5, 5, 0] }}
                  className="w-12 h-12 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-rose-500 group-hover:text-white transition-all duration-500"
                >
                  <AlertCircle size={24} />
                </motion.div>
                <h4 className="text-lg font-bold text-slate-800 mb-3 group-hover:text-rose-600 transition-colors">{challenge.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{challenge.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ CUSTOM REMEDIES / SOLUTIONS ══════════════════ */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-xs font-semibold tracking-[0.3em] text-sky-500 uppercase mb-4">Engineering Excellence</h2>
            <h3 className="text-4xl font-bold text-slate-900">Custom Architectural Solutions</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {data.solutions.map((solution, idx) => (
              <SpotlightCard key={solution.title} className="h-full rounded-3xl" glowColor={data.glowColor}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: idx * 0.1, type: "spring", stiffness: 100, damping: 15 }}
                  whileHover={{ y: -10, scale: 1.015 }}
                  className={`bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-slate-100/80 shadow-sm hover:shadow-xl ${borderThemeClass} h-full transition-all duration-300 group flex flex-col`}
                >
                  <motion.div 
                    whileHover={{ rotate: [0, -5, 5, 0] }}
                    className={`w-12 h-12 bg-sky-50 ${textThemeClass} rounded-2xl flex items-center justify-center mb-6 group-hover:${bgThemeClass} group-hover:text-white transition-all duration-500`}
                  >
                    <CheckCircle2 size={24} />
                  </motion.div>
                  <h4 className={`text-lg font-bold text-slate-800 mb-3 group-hover:${textThemeClass} transition-colors`}>{solution.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{solution.desc}</p>
                </motion.div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ SIMULATED ARCHITECTURE FLOW ══════════════════ */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-xs font-semibold tracking-[0.3em] text-sky-500 uppercase mb-4">System Blueprints</h2>
            <h3 className="text-4xl font-bold text-slate-900">Representative System Flow</h3>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-100 p-8 md:p-12 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-100/30 blur-3xl pointer-events-none" />

            <div className="grid md:grid-cols-3 gap-8 items-center text-center relative z-10">
              {/* Step 1 */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 80 }}
                whileHover={{ y: -6, scale: 1.03 }}
                className={`flex flex-col items-center p-6 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-${data.themeColor}-200 transition-all shadow-sm`}
              >
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className={`w-10 h-10 rounded-full bg-sky-100 ${textThemeClass} flex items-center justify-center mb-4`}
                >
                  <Globe2 size={20} />
                </motion.div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Source Ingress</span>
                <h4 className="text-sm font-bold text-slate-800 leading-tight">{data.architecture.source}</h4>
              </motion.div>

              {/* Step 2 with Laser Flow arrows */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, type: "spring", stiffness: 80 }}
                whileHover={{ y: -6, scale: 1.03 }}
                className={`flex flex-col items-center p-6 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-indigo-200 transition-all shadow-sm relative`}
              >
                {/* Flow Laser lines */}
                <div className="absolute top-1/2 -left-6 -translate-y-1/2 w-4 h-4 hidden md:flex items-center justify-center text-sky-400">
                  <motion.div
                    animate={{ x: [-8, 8, -8] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ArrowRight size={14} />
                  </motion.div>
                </div>
                <div className="absolute top-1/2 -right-6 -translate-y-1/2 w-4 h-4 hidden md:flex items-center justify-center text-indigo-400">
                  <motion.div
                    animate={{ x: [-8, 8, -8] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
                  >
                    <ArrowRight size={14} />
                  </motion.div>
                </div>

                <motion.div 
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4"
                >
                  <Cpu size={20} />
                </motion.div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Cognitive Middleware</span>
                <h4 className="text-sm font-bold text-slate-800 leading-tight">{data.architecture.process}</h4>
              </motion.div>

              {/* Step 3 */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, type: "spring", stiffness: 80 }}
                whileHover={{ y: -6, scale: 1.03 }}
                className="flex flex-col items-center p-6 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-emerald-200 transition-all shadow-sm"
              >
                <motion.div 
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4"
                >
                  <Database size={20} />
                </motion.div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Reliable Target</span>
                <h4 className="text-sm font-bold text-slate-800 leading-tight">{data.architecture.target}</h4>
              </motion.div>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-100 text-center text-slate-500 text-sm leading-relaxed max-w-2xl mx-auto relative z-10">
              <span className="font-bold text-slate-700 block mb-2">Architectural Summary</span>
              {data.architecture.description}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ CTA CARD ══════════════════ */}
      <section className="py-28 relative">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-[3rem] overflow-hidden bg-white border border-slate-100 p-12 md:p-20 text-center shadow-2xl transition-all duration-700 group hover:border-sky-200"
            style={glowShadowStyle}
          >
            {/* Shimmer background */}
            <div className="absolute inset-0 bg-gradient-to-r from-sky-50/10 via-transparent to-sky-50/10 animate-shimmer opacity-20 pointer-events-none" />

            <div className="relative z-10">
              <motion.div
                animate={{ scale: [1, 1.12, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="w-20 h-20 bg-sky-50 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-sky-100"
              >
                <Terminal size={36} className="text-sky-500" />
              </motion.div>

              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
                Ready to engineer your custom <span className="text-sky-600">{data.title}</span> solution?
              </h2>
              <p className="text-slate-500 text-base max-w-xl mx-auto mb-10 leading-relaxed font-medium">
                Our specialists coordinate with your key stakeholders to construct high-performance, compliant systems matching your exact scale targets.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                  <Link
                    href="/contact"
                    className="btn-primary flex items-center justify-center gap-2 text-base px-8 py-4 rounded-xl"
                  >
                    Request Custom Architecture Call{" "}
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                    >
                      <ArrowRight size={18} />
                    </motion.span>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                  <Link
                    href="/industries"
                    className="btn-outline flex items-center justify-center gap-2 text-base px-8 py-4 rounded-xl bg-white/50 backdrop-blur-sm"
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
