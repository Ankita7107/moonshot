"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
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
} from "lucide-react";
import { DoodleArrow, DoodleUnderline } from "../../../components/Doodle";

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
      { value: "99.999%", label: "System Uptime" },
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
      { value: "99.999%", label: "Core Transaction Security" },
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
      { value: "99.999%", label: "Network Uptime Rate" },
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

const mockTerminalLogs: Record<string, string[]> = {
  fintech: [
    "GET /ingress-gateway - 200 OK (2.1ms)",
    "AuthMiddleware: Session verified (JWT)",
    "AI-Anomaly: Checking fraud factors...",
    "AI-Anomaly: Risk score 0.003 [SECURE]",
    "KafkaBroker: Pushing txn payload to broker streams",
    "ConsensusNode: Resolving transactional log #83910",
    "AtomicWrite: Ledger state updated in 12ms",
    "POST /transfer/commit - 200 OK [COMMITTED]"
  ],
  healthcare: [
    "GET /telehealth/stream/init - 200 OK (5.4ms)",
    "WebRTC: Connection established [SECURE]",
    "FHIRValidator: Fetching patient profile token...",
    "FHIRValidator: Record decrypt validation SUCCESS",
    "DataVault: Querying patient EHR vault",
    "AuditLogger: Session recorded to secure cloud catalog",
    "MetricsMonitor: Stream bandwidth stabilized",
    "GET /ehr/records/search - 200 OK [DECRYPTED]"
  ],
  "e-commerce": [
    "GET /storefront/cart - 200 OK (0.9ms)",
    "RedisCache: Cart state parsed successfully",
    "ElasticSearch: Querying category 'trending'...",
    "RecommendationModel: Matching similar items...",
    "RecommendationModel: Score 99.4% Match FOUND",
    "PaymentGateway: Validating Stripe token...",
    "InventoryService: Reserving SKUs [SUCCESS]",
    "POST /cart/checkout - 200 OK [ORDER_COMPLETED]"
  ],
  logistics: [
    "GET /fleet/tracker/stream - 200 OK (1.1ms)",
    "KinesisConsumer: Ingested telemetry ID #849102",
    "GISRouter: Recalculating route metrics (traffic)",
    "GISRouter: Route updated [ETA decreased by 12m]",
    "WarehouseService: Inventory bin sync active",
    "SmartBin: Re-assigning order queue priority",
    "TelemetryRegistry: Speed and payload levels NORMAL",
    "POST /fleet/dispatch - 200 OK [ROUTED]"
  ],
  "real-estate": [
    "GET /listings/properties - 200 OK (4.2ms)",
    "MLS-Feed: Fetching RESO updates...",
    "MLS-Feed: Listing #39281 synchronized",
    "CRMLeadScorer: Scoring user interaction data...",
    "CRMLeadScorer: Qualified buyer score 92%",
    "WebGL-Loader: Loading spatial 3D viewport",
    "AgentScheduler: Booking consultation slot...",
    "POST /listing/qualification - 200 OK [QUALIFIED]"
  ],
  education: [
    "GET /lms/classroom - 200 OK (3.5ms)",
    "WebSocketHub: Classroom connection ACTIVE",
    "SCORMEngine: Restoring lesson state object #9281",
    "AdaptiveScorer: Analyzing assessment responses...",
    "AdaptiveScorer: Skill index updated [+8% progress]",
    "AnalyticsCore: Compiling engagement indicators",
    "InteractiveWhiteboard: Broadcast sync COMPLETE",
    "POST /classroom/progress - 200 OK [SYNCED]"
  ],
  manufacturing: [
    "GET /factory/scada/ingress - 200 OK (1.5ms)",
    "SCADATranslator: Parsing Modbus payload...",
    "IoTAnomalyDetector: Checking vibration levels",
    "IoTAnomalyDetector: Standard deviation optimal",
    "AWSKinesis: Telemetry stream compiled [95% precision]",
    "AssemblyScorer: Operating yield computed at 98.4%",
    "PredictiveMaintenance: Triggering status optimal",
    "POST /scada/telemetry - 200 OK [COMMITTED]"
  ],
  "travel-hospitality": [
    "GET /bookings/rates - 200 OK (2.8ms)",
    "GDSConnector: Synchronizing Sabre API matrix...",
    "AmadeusDirect: Rates match verified",
    "PricingEngine: Adjusting pricing to dynamic demand",
    "PricingEngine: Optimized occupancy rate updated",
    "GuestProfileHub: Fetching preference records",
    "PaymentProcessor: Secure reservation lock active",
    "POST /booking/commit - 200 OK [RESERVED]"
  ],
  "banking-insurance": [
    "GET /core/accounts - 200 OK (1.4ms)",
    "AtomicLedger: Session validated (token crypt)",
    "RiskEvaluator: Scoring portfolio exposure...",
    "ClaimsProcessor: Analyzing insurance claim proof",
    "ClaimsProcessor: Verification success rate 94%",
    "CoreLedger: Committing balances [SUCCESS]",
    "AuditBroker: State snapshot archived securely",
    "POST /ledger/commit - 200 OK [COMPLETED]"
  ],
  cybersecurity: [
    "GET /soc/endpoints - 200 OK (0.8ms)",
    "SIEMCore: Ingesting endpoint log buffer...",
    "SIEMCore: Scanning for malicious signatures",
    "IncidentResponse: Evaluating system integrity",
    "IncidentResponse: Active threats = 0 [SAFE]",
    "AccessController: Biometric token matched context",
    "ZeroTrustGateway: Authorization granted",
    "POST /auth/verify - 200 OK [AUTHORIZED]"
  ],
  telecom: [
    "GET /network/traffic - 200 OK (1.2ms)",
    "TrafficRouter: Recalculating signal prioritizations",
    "EdgeIngress: Telemetry processed in 5ms",
    "BillingStream: Calculating edge data consumption",
    "BillingStream: Data bundle sync SUCCESS",
    "OSS-Config: Validating network update payload",
    "NetworkController: Rolling updates deployed [0 downtime]",
    "POST /billing/sync - 200 OK [COMPLETED]"
  ],
  automotive: [
    "GET /vehicle/telematics - 200 OK (0.9ms)",
    "CANBusParser: Parsing speed/vitals stream...",
    "BatteryScorer: Cell voltage balance checked",
    "BatteryScorer: Battery health forecast = 98%",
    "EdgeIngestion: Raw telematic payload normalized",
    "SafetyMonitor: Brake and traction states optimal",
    "GPSGateway: Dynamic location push SUCCESS",
    "POST /vehicle/diagnostics - 200 OK [REGISTERED]"
  ],
  "media-entertainment": [
    "GET /ott/stream - 200 OK (3.2ms)",
    "CDNEdge: Match request routed to local node",
    "TranscoderQueue: Checking codec stream compatibility",
    "TranscoderQueue: Adaptive rate standard initialized",
    "InterestParser: Viewer activity scoring...",
    "RecommendationEngine: Found 3 top matching titles",
    "PlaybackMonitor: Frame drops = 0 [OPTIMAL]",
    "POST /playback/session - 200 OK [ACTIVE]"
  ],
  "food-restaurant-tech": [
    "GET /kitchen/orders - 200 OK (1.9ms)",
    "POSGateway: Consolidating active order channels",
    "KitchenScreen: New ticket order parsed",
    "DispatchEngine: Finding nearby courier agents...",
    "DispatchEngine: Driver found (ETA 8m prep sync)",
    "OfflineCache: Syncing POS ledger entries",
    "POSSync: Server connections RESTORED",
    "POST /kitchen/dispatch - 200 OK [PREPARED]"
  ],
  "government-public-sector": [
    "GET /citizen/services - 200 OK (6.4ms)",
    "WCAGAuditor: Layout accessibility validated [AA]",
    "DigitalIDHub: Verifying identity hash credentials",
    "DigitalIDHub: Identity validation SUCCESS",
    "TaxService: Fetching citizen ledger snapshot",
    "QueueMonitor: Real-time service queue computed",
    "RecordsVault: Secure citizen database locked",
    "POST /citizen/records - 200 OK [SECURED]"
  ]
};

const getColorClasses = (color: string) => {
  switch (color) {
    case "sky":
      return {
        text: "text-sky-500",
        bg: "bg-sky-500",
        bgLight: "bg-sky-50",
        border: "border-sky-100",
        borderHover: "hover:border-sky-300",
        shadow: "shadow-sky-100/50",
        glow: "rgba(14,165,233,0.12)",
        hex: "#38bdf8",
      };
    case "cyan":
      return {
        text: "text-cyan-500",
        bg: "bg-cyan-500",
        bgLight: "bg-cyan-50",
        border: "border-cyan-100",
        borderHover: "hover:border-cyan-300",
        shadow: "shadow-cyan-100/50",
        glow: "rgba(6,182,212,0.12)",
        hex: "#06b6d4",
      };
    case "indigo":
      return {
        text: "text-indigo-500",
        bg: "bg-indigo-500",
        bgLight: "bg-indigo-50",
        border: "border-indigo-100",
        borderHover: "hover:border-indigo-300",
        shadow: "shadow-indigo-100/50",
        glow: "rgba(99,102,241,0.12)",
        hex: "#6366f1",
      };
    case "orange":
      return {
        text: "text-orange-500",
        bg: "bg-orange-500",
        bgLight: "bg-orange-50",
        border: "border-orange-100",
        borderHover: "hover:border-orange-300",
        shadow: "shadow-orange-100/50",
        glow: "rgba(249,115,22,0.12)",
        hex: "#f97316",
      };
    case "emerald":
      return {
        text: "text-emerald-500",
        bg: "bg-emerald-500",
        bgLight: "bg-emerald-50",
        border: "border-emerald-100",
        borderHover: "hover:border-emerald-300",
        shadow: "shadow-emerald-100/50",
        glow: "rgba(16,185,129,0.12)",
        hex: "#10b981",
      };
    case "zinc":
      return {
        text: "text-zinc-500",
        bg: "bg-zinc-500",
        bgLight: "bg-zinc-50",
        border: "border-zinc-100",
        borderHover: "hover:border-zinc-300",
        shadow: "shadow-zinc-100/50",
        glow: "rgba(113,113,122,0.12)",
        hex: "#71717a",
      };
    case "red":
      return {
        text: "text-red-500",
        bg: "bg-red-500",
        bgLight: "bg-red-50",
        border: "border-red-100",
        borderHover: "hover:border-red-300",
        shadow: "shadow-red-100/50",
        glow: "rgba(239,68,68,0.12)",
        hex: "#ef4444",
      };
    case "purple":
      return {
        text: "text-purple-500",
        bg: "bg-purple-500",
        bgLight: "bg-purple-50",
        border: "border-purple-100",
        borderHover: "hover:border-purple-300",
        shadow: "shadow-purple-100/50",
        glow: "rgba(168,85,247,0.12)",
        hex: "#a855f7",
      };
    case "slate":
      return {
        text: "text-slate-500",
        bg: "bg-slate-500",
        bgLight: "bg-slate-50",
        border: "border-slate-100",
        borderHover: "hover:border-slate-300",
        shadow: "shadow-slate-100/50",
        glow: "rgba(100,116,139,0.12)",
        hex: "#64748b",
      };
    case "pink":
      return {
        text: "text-pink-500",
        bg: "bg-pink-500",
        bgLight: "bg-pink-50",
        border: "border-pink-100",
        borderHover: "hover:border-pink-300",
        shadow: "shadow-pink-100/50",
        glow: "rgba(236,72,153,0.12)",
        hex: "#ec4899",
      };
    case "green":
      return {
        text: "text-green-500",
        bg: "bg-green-500",
        bgLight: "bg-green-50",
        border: "border-green-100",
        borderHover: "hover:border-green-300",
        shadow: "shadow-green-100/50",
        glow: "rgba(34,197,94,0.12)",
        hex: "#22c55e",
      };
    default:
      return {
        text: "text-sky-500",
        bg: "bg-sky-500",
        bgLight: "bg-sky-50",
        border: "border-sky-100",
        borderHover: "hover:border-sky-300",
        shadow: "shadow-sky-100/50",
        glow: "rgba(14,165,233,0.12)",
        hex: "#38bdf8",
      };
  }
};

export default function IndustryDetailsPage() {
  const { slug } = useParams() as { slug: string };
  const data = industryContent[slug];

  // Active terminal logs emulator
  const [activeLogs, setActiveLogs] = useState<string[]>([]);

  useEffect(() => {
    if (!data) return;
    const allLogs = mockTerminalLogs[slug] || mockTerminalLogs["fintech"];
    // Initialize with first 3 logs
    setActiveLogs(allLogs.slice(0, 3));

    let currentIdx = 3;
    const interval = setInterval(() => {
      setActiveLogs((prev) => {
        const nextLog = allLogs[currentIdx % allLogs.length];
        currentIdx++;
        // Maintain a max list of 5 scrolling logs
        const updated = [...prev, nextLog];
        if (updated.length > 5) {
          updated.shift();
        }
        return updated;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [slug, data]);

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

  return (
    <div className="bg-white min-h-screen overflow-hidden">
      {/* ══════════════════ HERO SECTION (UNTOUCHED PER USER REQUEST) ══════════════════ */}
      <section className={`relative bg-gradient-to-br ${data.bg} py-32 text-center overflow-hidden`}>
        {/* Animated background particles */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute top-10 left-[10%] h-32 w-32 rounded-full bg-white/5 blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-10 right-[15%] h-40 w-40 rounded-full bg-white/5 blur-3xl animate-float-slow" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
                                linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="max-w-4xl mx-auto px-4 relative z-10 text-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20 mb-8"
          >
            <Sparkles className="w-4 h-4 text-sky-400" />
            <span className="text-xs font-bold tracking-widest uppercase text-sky-300">Industry Insight</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-black mb-6 tracking-tighter"
          >
            {data.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8"
          >
            {data.desc}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-3 justify-center mb-10"
          >
            {data.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-1.5 rounded-full text-xs font-bold bg-white/10 border border-white/20 backdrop-blur-sm tracking-wide text-sky-200"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Link
              href="/industries"
              className="inline-flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-white transition-colors"
            >
              <ArrowLeft size={16} /> Back to Sectors
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════ CORE METRICS (FLOATING WITH NEGATIVE MARGIN) ══════════════════ */}
      <section className="relative z-30 max-w-6xl mx-auto px-4 -mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.metrics.map((metric, idx) => {
            const colors = getColorClasses(data.themeColor);
            return (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                whileHover={{ y: -6 }}
                key={metric.label}
                className="bg-white/90 backdrop-blur-md p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 hover:shadow-2xl hover:border-slate-200 transition-all duration-300 flex flex-col items-center text-center group overflow-hidden"
              >
                <div className={`absolute top-0 left-0 w-full h-1.5 ${colors.bg}`} />
                <h3 className={`text-4xl md:text-5xl font-black ${colors.text} mb-2 group-hover:scale-105 transition-transform duration-300`}>
                  <DoodleUnderline color={colors.hex}>{metric.value}</DoodleUnderline>
                </h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">
                  {metric.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ══════════════════ PROBLEM VS. SOLUTION COMPARATIVE GRID ══════════════════ */}
      <section className="py-24 bg-slate-50/50 relative overflow-hidden">
        {/* Subtle background grids */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-20 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className={`text-xs font-bold tracking-[0.2em] uppercase ${getColorClasses(data.themeColor).text} bg-white px-4 py-1.5 rounded-full border border-slate-100 shadow-sm inline-block mb-4`}>
              Engineering Diagnosis
            </span>
            <h3 className="text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Bridging Industry Bottlenecks with Custom Architecture
            </h3>
          </div>

          <div className="space-y-12">
            {data.challenges.map((challenge, idx) => {
              const colors = getColorClasses(data.themeColor);
              const solution = data.solutions[idx] || { title: "Custom Integration Layer", desc: "Tailored middleware executing direct-channel data optimizations." };
              return (
                <div key={idx} className="flex flex-col lg:flex-row items-stretch gap-6 relative">
                  
                  {/* Left Column: Challenge */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex-1 bg-white p-8 rounded-3xl border border-rose-100 shadow-sm flex flex-col justify-between group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-16 h-16 bg-rose-50/50 rounded-bl-[40px] -z-10 group-hover:scale-110 transition-transform duration-500" />
                    <div>
                      <div className="w-10 h-10 bg-rose-50 text-rose-500 rounded-xl flex items-center justify-center mb-6 font-bold text-xs shadow-sm">
                        SILO
                      </div>
                      <h4 className="text-lg font-bold text-slate-800 mb-3 group-hover:text-rose-600 transition-colors">
                        {challenge.title}
                      </h4>
                      <p className="text-slate-500 text-sm leading-relaxed mb-6">
                        {challenge.desc}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-rose-500 mt-auto">
                      <AlertCircle size={14} className="animate-pulse" /> Operational Risk Factor
                    </div>
                  </motion.div>

                  {/* Center Column: Visual Connector Arrow (Desktop only) */}
                  <div className="w-[8%] hidden lg:flex items-center justify-center relative pointer-events-none">
                    <DoodleArrow rotate={idx % 2 === 0 ? 15 : -15} color={colors.hex} className="w-14 h-14" />
                  </div>

                  {/* Right Column: Moonshot Solution */}
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -4 }}
                    className="flex-1 bg-white p-8 rounded-3xl border border-slate-100 hover:border-slate-200 transition-all shadow-sm hover:shadow-xl flex flex-col justify-between group relative overflow-hidden"
                    style={{
                      boxShadow: `0 10px 30px -10px ${colors.glow}`,
                    }}
                  >
                    <div className={`absolute top-0 right-0 w-16 h-16 ${colors.bgLight} rounded-bl-[40px] -z-10 group-hover:scale-110 transition-transform duration-500`} />
                    <div>
                      <div className={`w-10 h-10 ${colors.bgLight} ${colors.text} rounded-xl flex items-center justify-center mb-6 font-bold text-xs shadow-sm`}>
                        SOLVE
                      </div>
                      <h4 className="text-lg font-bold text-slate-800 mb-3 group-hover:text-slate-900 transition-colors">
                        {solution.title}
                      </h4>
                      <p className="text-slate-500 text-sm leading-relaxed mb-6">
                        {solution.desc}
                      </p>
                    </div>
                    <div className={`flex items-center gap-2 text-xs font-bold ${colors.text} mt-auto`}>
                      <CheckCircle2 size={14} /> Moonshot Solution Integrated
                    </div>
                  </motion.div>

                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════ SIMULATED ARCHITECTURE FLOW (PULSING) ══════════════════ */}
      <section className="py-24 bg-white relative overflow-hidden border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className={`text-xs font-bold tracking-[0.2em] uppercase ${getColorClasses(data.themeColor).text} bg-slate-50 px-4 py-1.5 rounded-full border border-slate-100 inline-block mb-4`}>
              System Blueprints
            </span>
            <h3 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              Representative Live System Flow
            </h3>
          </div>

          <div className="max-w-4xl mx-auto bg-slate-950 rounded-3xl border border-slate-900 p-8 md:p-12 shadow-2xl relative overflow-hidden">
            {/* Inner background highlights */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/5 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/5 blur-3xl pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-20 pointer-events-none" />

            <div className="grid md:grid-cols-3 gap-8 items-center text-center relative z-10">
              
              {/* Step 1: Ingress */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center p-6 bg-slate-900/60 backdrop-blur-sm rounded-2xl border border-slate-800 hover:border-sky-500/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-sky-500/10 text-sky-400 flex items-center justify-center mb-4 border border-sky-500/20 group-hover:bg-sky-500 group-hover:text-white transition-all duration-300">
                  <Globe2 size={22} className="group-hover:rotate-12 transition-transform" />
                </div>
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mb-1">Ingress Ingestion</span>
                <h4 className="text-sm font-bold text-slate-200">{data.architecture.source}</h4>
                <div className="flex items-center gap-1.5 mt-3">
                  <span className="h-2 w-2 rounded-full bg-sky-500 animate-pulse" />
                  <span className="text-[10px] font-mono text-slate-400">active pipeline</span>
                </div>
              </motion.div>

              {/* Step 2: Processing Middleware */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="flex flex-col items-center p-6 bg-slate-900/60 backdrop-blur-sm rounded-2xl border border-slate-800 hover:border-indigo-500/30 transition-all group relative"
              >
                {/* Visual live particle streaming connector paths */}
                <div className="absolute -left-[30%] top-1/2 w-[30%] h-0.5 bg-gradient-to-r from-sky-500/40 to-indigo-500/40 hidden md:block">
                  <motion.div
                    animate={{ x: ["0%", "300%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-2 h-2 rounded-full bg-sky-400 blur-sm shadow-md"
                  />
                </div>
                <div className="absolute -right-[30%] top-1/2 w-[30%] h-0.5 bg-gradient-to-r from-indigo-500/40 to-emerald-500/40 hidden md:block">
                  <motion.div
                    animate={{ x: ["0%", "300%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-2 h-2 rounded-full bg-indigo-400 blur-sm shadow-md"
                  />
                </div>

                <div className="w-12 h-12 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4 border border-indigo-500/20 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300">
                  <Cpu size={22} className="group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mb-1">Cognitive Middleware</span>
                <h4 className="text-sm font-bold text-slate-200">{data.architecture.process}</h4>
                <div className="flex items-center gap-1.5 mt-3">
                  <span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
                  <span className="text-[10px] font-mono text-slate-400">AI validation</span>
                </div>
              </motion.div>

              {/* Step 3: Reliable Database Target */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex flex-col items-center p-6 bg-slate-900/60 backdrop-blur-sm rounded-2xl border border-slate-800 hover:border-emerald-500/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                  <Database size={22} className="group-hover:rotate-12 transition-transform" />
                </div>
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mb-1">Database Registry</span>
                <h4 className="text-sm font-bold text-slate-200">{data.architecture.target}</h4>
                <div className="flex items-center gap-1.5 mt-3">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-mono text-slate-400">audit-safe states</span>
                </div>
              </motion.div>

            </div>

            {/* Simulated Live Console Log Window */}
            <div className="mt-12 bg-slate-950 border border-slate-900 rounded-2xl p-6 relative">
              <div className="flex items-center justify-between border-b border-slate-900 pb-3 mb-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                  <span className="font-mono text-slate-400 ml-2">telemetry-stream.sh</span>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-emerald-500">
                  <Activity size={12} className="animate-pulse" />
                  <span>STREAMING</span>
                </div>
              </div>
              <div className="font-mono text-[11px] text-slate-350 min-h-[120px] max-h-[120px] overflow-hidden flex flex-col justify-end space-y-2 select-none">
                <AnimatePresence initial={false}>
                  {activeLogs.map((log, i) => (
                    <motion.div
                      key={log + i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-2 leading-relaxed"
                    >
                      <span className="text-sky-500 font-bold shrink-0">&gt;</span>
                      <span className="text-slate-300 font-light truncate">{log}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-900 text-center text-slate-400 text-sm leading-relaxed max-w-2xl mx-auto relative z-10">
              <span className="font-bold text-slate-200 block mb-2">Architectural Summary</span>
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
            className="relative rounded-[3rem] overflow-hidden bg-white border border-slate-100 p-12 md:p-20 text-center shadow-2xl transition-all duration-700 group hover:border-slate-200"
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
                    Request Custom Architecture Call <ArrowRight size={18} />
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
