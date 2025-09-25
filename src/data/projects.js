export const projects = [
  {
    title: "Audio Transcription Platform",
    description: "Built microservices platform with Spring Boot API, Python FastAPI service, and React frontend, implementing async audio processing with OpenAI Whisper and real-time status polling. Designed PostgreSQL database with 4 related tables, Flyway migrations, and optimized indexing, supporting multiple audio formats with comprehensive error handling. Deployed containerized application using Docker Compose with inter-service communication, CORS configuration, and health monitoring endpoints.",
    technologies: ["Java Spring Boot", "Python FastAPI", "React", "PostgreSQL", "Docker", "OpenAI Whisper"],
    github: "https://github.com/shangmin-chen/audio-transcription-platform",
    demo: null
  },
  {
    title: "Fitness Tracking Mobile App",
    description: "Built cross-platform app with drag-and-drop workout creation using React Native Reanimated v3 and PanGestureHandler for exercise reordering. Implemented persistent data storage with AsyncStorage and custom React hooks for state management across workout sessions. Developed modular component architecture with search/filter functionality and modal-based exercise selection interface.",
    technologies: ["React Native", "TypeScript", "Expo", "AsyncStorage", "Reanimated v3"],
    github: "https://github.com/shangmin-chen/fitness-tracking-app",
    demo: null
  },
  {
    title: "Crime Analytics & Forecasting Platform",
    description: "Built crime analytics platform processing 500K+ Boston crime records with Prophet time-series forecasting and DBSCAN clustering for hotspot identification across 12+ police districts. Implemented advanced data pipeline with seasonal decomposition and confidence intervals, generating 2-month crime predictions with train/test validation. Developed interactive dashboard using Streamlit and Plotly, creating 121 crime-type heat maps with Folium and real-time geospatial visualizations.",
    technologies: ["Python", "Streamlit", "Prophet", "Scikit-learn", "GeoPandas", "Plotly", "Folium"],
    github: "https://github.com/shangmin-chen/crime-analytics-platform",
    demo: null
  },
  {
    title: "Decentralized ML Model Marketplace",
    description: "Built decentralized marketplace using Solidity smart contracts with ERC-20 tokens, implementing 6-state transaction management, automated candidate selection, and economic incentive mechanisms with stake slashing. Integrated IPFS distributed storage with Ethereum blockchain using Thirdweb SDK, enabling secure model uploads with SHA256 hash verification and automated ML training workflows. Implemented zero-knowledge proof system using Circom and Groth16 protocol for privacy-preserving accuracy verification, with MetaMask integration and real-time blockchain event monitoring.",
    technologies: ["Solidity", "Circom", "IPFS", "Express.js", "TensorFlow", "Ethereum", "MetaMask"],
    github: "https://github.com/shangmin-chen/ml-marketplace",
    demo: null
  }
];
