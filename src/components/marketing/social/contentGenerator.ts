
export const getSampleContent = (type: string, tone: string, isShort = false, isLinkedIn = false) => {
  const samples: Record<string, Record<string, string>> = {
    'Product Promotion': {
      'Professional': isLinkedIn ? 'We are excited to introduce our latest solution that addresses key market needs.' : 'Introducing our latest product designed for modern professionals.',
      'Casual & Friendly': 'Hey everyone! We just launched something amazing and we can\'t wait for you to try it!',
      'Playful & Fun': 'Guess what just dropped? 🎉 Our newest product is here and it\'s absolutely incredible!',
      'Inspirational': 'Every great journey starts with the right tools. Discover what could transform your path.'
    },
    'Business Tip': {
      'Professional': isLinkedIn ? 'Industry insights: Here are three key strategies that successful businesses implement consistently.' : 'Pro tip: Successful businesses focus on these key areas.',
      'Casual & Friendly': 'Quick business tip from our team: This simple strategy could change everything!',
      'Educational': 'Today\'s lesson: Understanding your customer\'s journey is crucial for business growth.'
    }
  };

  const typeContent = samples[type] || samples['Business Tip'];
  return typeContent[tone] || typeContent['Professional'] || 'Great content coming your way!';
};

export const generateHashtags = (topic: string, type: string) => {
  const baseHashtags = ['#Nigeria', '#SmallBusiness', '#Entrepreneur'];
  const topicHashtags = topic.split(' ').slice(0, 2).map(word => `#${word.replace(/[^a-zA-Z]/g, '')}`);
  const typeHashtags = type.split(' ').map(word => `#${word}`);
  
  return [...baseHashtags, ...topicHashtags, ...typeHashtags].slice(0, 8);
};
