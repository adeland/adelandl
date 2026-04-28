export const projects = [
  {
    title: 'Audio Transcription Platform',
    titleParts: { before: '', em: 'Whisperrr', after: ' — multi-language audio transcription platform' },
    description:
      'A full-stack microservices platform for multi-language audio transcription, featuring real-time processing and 4x faster performance than OpenAI Whisper.',
    tags: ['Spring-Boot', 'FastAPI', 'React', 'Docker'],
    meta: { year: '2025', role: 'Solo', status: 'Live' },
    github: 'https://github.com/Shangmin-Chen/Whisperrr',
    demo: 'https://whisperrr.shangmin.me',
    blog: 'whisperrr',
  },
  {
    title: 'Crime Analytics & Forecasting Platform',
    titleParts: {
      before: 'Crime ',
      em: 'Mapper',
      after: ' — analytics & forecasting',
    },
    description:
      "A machine learning system that forecasts crime patterns and identifies hotspots across Boston's police districts using time-series analysis and geospatial clustering.",
    tags: ['Python', 'Prophet', 'GeoPandas', 'FastAPI'],
    meta: { year: '2026', role: 'ML engineer', status: 'Open source' },
    github: 'https://github.com/shangmin-chen/CrimeMapper-Boston',
    demo: 'https://crime-mapper.shangmin.me',
    blog: 'crime-mapper-boston',
  },
  {
    title: 'Spark Bytes: Food Waste Reduction Platform',
    titleParts: {
      before: 'Spark ',
      em: 'Bytes',
      after: ' — food waste reduction',
    },
    description:
      'A web platform connecting students with leftover food from campus events, reducing waste while supporting food-insecure students through community connection.',
    tags: ['Django', 'Auth0', 'Google Maps', 'Python'],
    meta: { year: '2026', role: 'Full-stack', status: 'Live' },
    github: 'https://github.com/Shangmin-Chen/Spark-Bytes',
    demo: 'https://spark-bytes.shangmin.me',
    blog: 'spark-bytes',
  },
];
