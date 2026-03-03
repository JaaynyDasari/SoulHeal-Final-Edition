import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Resource from './models/Resource.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

const dbUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/soulheal_final';

const data = [
  // --- MENTAL HEALTH VIDEOS (3) ---
  { category: 'mental-health-videos', title: 'Why is life tough?', description: "Secret to overcoming life's obstacles and achieving unparalleled success.", imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxZ62ybqRR0wkhC6vI3bOMVxMhuXSwvtBEHQ&s', externalLink: 'https://www.youtube.com/watch?v=z97_vajw-Do' },
  { category: 'mental-health-videos', title: 'Mental Health Days', description: 'Hailey Hardcastle explains why schools should offer mental health days.', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2sb4nhNhzke7PTMV5PIG_uQlQqM9mK4lQHg&s', externalLink: 'https://www.youtube.com/watch?v=1qq7lDL-bzY' },
  { category: 'mental-health-videos', title: 'Believe in yourself', description: 'Never give up on your dreams and always have faith in your abilities.', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2Nw1fZAxUjVGmfhIcCkQ3bklmhgAwGCTAmA&s', externalLink: 'https://www.youtube.com/watch?v=q01E63DwN1c' },

  // --- PROFESSIONALS (9) ---
  { category: 'professionals', title: 'Nawal Mustafa', description: 'Clinical Neuropsychologist', imageUrl: 'https://th.bing.com/th/id/OIP.Q_fzjMjtZsAk1pHcqoZKtAHaHa?w=172&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7', externalLink: 'https://www.instagram.com/thebraincoach/' },
  { category: 'professionals', title: 'Dr. Jyoti Kapoor', description: 'Psychiatrist - Integrative Mental Health Practitioner', imageUrl: 'https://th.bing.com/th/id/OIP.wxxd1fLX5mic1owwDE5BjgHaHa?w=166&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7', externalLink: 'https://www.instagram.com/manasthali/' },
  { category: 'professionals', title: 'Dr. Sarthak Dave', description: 'MBBS MD Psychiatry', imageUrl: 'https://th.bing.com/th/id/OIP.-w7KsWR-0NHD9oapewl_GAHaHc?w=178&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7', externalLink: 'https://instagram.com/dremily' },
  { category: 'professionals', title: 'Dr. Emily', description: 'MBBS MD Psychiatry', imageUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=300&h=300', externalLink: 'https://instagram.com/dremily' },
  { category: 'professionals', title: 'Expert Professional 1', description: 'MBBS MD Psychiatry', imageUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=300&h=300', externalLink: 'https://instagram.com/dremily' },
  { category: 'professionals', title: 'Expert Professional 2', description: 'MBBS MD Psychiatry', imageUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=300&h=300', externalLink: 'https://instagram.com/dremily' },
  { category: 'professionals', title: 'Expert Professional 3', description: 'MBBS MD Psychiatry', imageUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=300&h=300', externalLink: 'https://instagram.com/dremily' },
  { category: 'professionals', title: 'Expert Professional 4', description: 'MBBS MD Psychiatry', imageUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=300&h=300', externalLink: 'https://instagram.com/dremily' },
  { category: 'professionals', title: 'Expert Professional 5', description: 'MBBS MD Psychiatry', imageUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=300&h=300', externalLink: 'https://instagram.com/dremily' },

  // --- MOTIVATIONAL QUOTES (10) ---
  { category: 'motivational-quotes', title: '"Be as determined as the root and as strong as the tree"', author: 'Jaayny Dasari' },
  { category: 'motivational-quotes', title: '"Make your progress the measure!"', author: 'Jaayny Dasari' },
  { category: 'motivational-quotes', title: '"You are not just your abilities, you\'re your capabilities!"', author: 'Jaayny Dasari' },
  { category: 'motivational-quotes', title: '"As strong as the wood and as fragile as the glass!"', author: 'Jaayny Dasari' },
  { category: 'motivational-quotes', title: '"What counts is always the effort!"', author: 'C.S. Lewis' },
  { category: 'motivational-quotes', title: '"Even the ice has to break to form water!"', author: 'Jaayny Dasari' },
  { category: 'motivational-quotes', title: '"Too many connections dim the light!"', author: 'Jaayny Dasari' },
  { category: 'motivational-quotes', title: '"Find Strength in the Consistency"', author: 'Jaayny Dasari' },
  { category: 'motivational-quotes', title: '"A satisfied soul is the goal!"', author: 'Jaayny Dasari' },
  { category: 'motivational-quotes', title: '"When you limit change, you limit growth!"', author: 'Jaayny Dasari' },

  // --- BOOKS (10) ---
  { category: 'books', title: 'The Anxiety Toolkit', description: 'Practical strategies for managing anxiety', imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=300&h=400', externalLink: 'https://www.google.co.in/books/edition/Student_Mental_Health/l9pdDwAAQBAJ' },
  { category: 'books', title: 'Mindful Learning', description: 'Techniques for focused studying', imageUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=300&h=400', externalLink: 'https://www.google.co.in/books/edition/Delivering_Effective_College_Mental_Heal/uSaODwAAQBAJ' },
  { category: 'books', title: 'Student Wellness Guide', description: 'Comprehensive guide to mental health', imageUrl: 'https://th.bing.com/th/id/OIP.XksmjQ3Dz_mg1n5g6d-aWgHaLH?w=204&h=306&c=7&r=0&o=5&dpr=1.3&pid=1.7', externalLink: 'https://books.google.com' },
  { category: 'books', title: 'College Student Mental Health', description: 'Comprehensive guide to college students', imageUrl: 'https://th.bing.com/th/id/OIP.oWrrhYScf8n8K8Dz9WeGMwHaLX?w=201&h=309&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2', externalLink: 'https://books.google.com' },
  { category: 'books', title: 'Stress Relief', description: 'Comprehensive guide to mental health', imageUrl: 'https://th.bing.com/th/id/OIP.QWVE4xsD_V_UZTLSQjC63AHaJ2?w=216&h=288&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2', externalLink: 'https://books.google.com' },
  { category: 'books', title: 'Wellness Guide 2', description: 'Comprehensive guide to mental health', imageUrl: 'https://th.bing.com/th/id/OIP.PC8h4d1jyPSULJrvvs3KQAHaJk?w=219&h=284&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2', externalLink: 'https://books.google.com' },
  { category: 'books', title: 'Wellness Guide 3', description: 'Comprehensive guide to mental health', imageUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=300&h=400', externalLink: 'https://books.google.com' },
  { category: 'books', title: 'Wellness Guide 4', description: 'Comprehensive guide to mental health', imageUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=300&h=400', externalLink: 'https://books.google.com' },
  { category: 'books', title: 'Wellness Guide 5', description: 'Comprehensive guide to mental health', imageUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=300&h=400', externalLink: 'https://books.google.com' },
  { category: 'books', title: 'College Counseling', description: 'Mental Health Counseling for students', imageUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=300&h=400', externalLink: 'https://books.google.com' },

  // --- SUCCESS STORIES (6) ---
  { category: 'success-stories', title: 'From Anxiety to Achievement', description: '"I struggled with severe anxiety during my first year... graduated with honors."', author: 'Sarah Chen, Psychology Graduate' },
  { category: 'success-stories', title: 'Overcoming Depression', description: '"Found my passion again... today I am a software engineer."', author: 'James Rodriguez, Software Engineer' },
  { category: 'success-stories', title: 'Finding Balance', description: '"Balancing academics and mental health seemed impossible... thriving in medical school."', author: 'Emma Thompson, Medical Student' },
  { category: 'success-stories', title: 'Managing Academic Anxiety', description: '"The pressure to perform used to keep me up at night... graduated top of my class."', author: 'Ananya Sharma' },
  { category: 'success-stories', title: 'Healing After Social Rejection', description: '"I was bullied and felt invisible... today I work as a counselor."', author: 'Michael Lee' },
  { category: 'success-stories', title: 'From Self-Doubt to Self-Love', description: '" counseling helped me rebuild my self-esteem... I share content to uplift others."', author: 'Aarushi Patel' },

  // --- STUDY TECHNIQUES (3) ---
  { category: 'study-techniques', title: 'Pomodoro Technique', metadata: { steps: ['Study for 25 minutes', 'Take a 5-minute break', 'Repeat 4 times', 'Take a longer 15-30 minute break'] } },
  { category: 'study-techniques', title: 'Active Recall', metadata: { steps: ['Read the material', 'Close your books', 'Write what you remember', 'Check and fill gaps'] } },
  { category: 'study-techniques', title: 'Mind Mapping', metadata: { steps: ['Write main topic in center', 'Branch out related concepts', 'Add details to branches', 'Use colors and images'] } },

  // --- MOOD BOOSTING GAMES (7) ---
  { category: 'mood-games', title: 'Stardew Valley', description: 'A peaceful farming simulation game that helps reduce stress', imageUrl: 'https://th.bing.com/th/id/OIP.GGDpqqpX2qm8AGq_2wQOxAHaLH?w=117&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7', externalLink: 'https://www.stardewvalley.net' },
  { category: 'mood-games', title: 'Journey', description: 'A beautiful adventure game focused on emotional connection', imageUrl: 'https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?auto=format&fit=crop&w=300&h=200', externalLink: 'https://thatgamecompany.com/journey' },
  { category: 'mood-games', title: 'Flower', description: 'A relaxing game about the journey of a flower petal', imageUrl: 'https://th.bing.com/th/id/OIP.QOlEKmoXdUASkitubkkf-QHaEK?w=321&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7', externalLink: 'https://thatgamecompany.com/flower' },
  { category: 'mood-games', title: 'Mental Health Delta Division', description: 'Interactive game for mental health', imageUrl: 'https://images.unsplash.com/photo-1580327332925-a10e6cb11baa?auto=format&fit=crop&w=300&h=200', externalLink: 'https://mentalhealthdeltadivision.com/interactive-games/' },
  { category: 'mood-games', title: 'BrainGymmer', description: 'The online gym for your brain', imageUrl: 'https://th.bing.com/th/id/OIP.fDDDyiz-0YwlpTT907PztAHaEN?w=303&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7', externalLink: 'https://www.braingymmer.com/en/' },
  { category: 'mood-games', title: 'Happify', description: 'Overcome negative thoughts and life’s challenges!', imageUrl: 'https://th.bing.com/th/id/OIP.r80UvdSkHmVXp9YFhFalYAHaDn?w=324&h=170&c=7&r=0&o=5&dpr=1.3&pid=1.7', externalLink: 'https://happify.com/' },
  { category: 'mood-games', title: 'Funny Online games', description: 'A pool of funny games that can swift your mood!', imageUrl: 'https://th.bing.com/th/id/OIP.auDacY7a8uN2iS9AaSMAogHaEK?w=273&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7', externalLink: 'https://www.onlinegames.io/t/funny/' },

  // --- EXPERT DIRECTORY (6) ---
  { category: 'expert-directory', title: 'Dr. Roma Kumar', description: 'Senior Clinical Psychologist', metadata: { email: 'roma.kumar@themindtemple.com', phone: '+91 9810137466', location: 'New Delhi, India' } },
  { category: 'expert-directory', title: 'Dr. Prerna Kohli', description: 'Clinical Psychologist & Founder of MindTribe.in', metadata: { email: 'drprernakohli@gmail.com', phone: '+91 9818321222', location: 'Gurgaon, India' } },
  { category: 'expert-directory', title: 'Dr. Bhavana Gautam', description: 'Consulting Psychotherapist', metadata: { email: 'drbhavana.gautam@gmail.com', phone: '+91 9820245550', location: 'Mumbai, India' } },
  { category: 'expert-directory', title: 'Dr. Soumitra Pathare', description: 'Psychiatrist & Director, CMHLP', metadata: { email: 'soumitra.pathare@gmail.com', phone: '+91 2025658200', location: 'Pune, India' } },
  { category: 'expert-directory', title: 'Dr. Shefali Batra', description: 'Psychiatrist & Cognitive Therapist', metadata: { email: 'drshefalibatra@gmail.com', phone: '+91 9820460779', location: 'Mumbai, India' } },
  { category: 'expert-directory', title: 'Dr. Nisha Khanna', description: 'Counseling Psychologist', metadata: { email: 'info@nishakhanna.in', phone: '+91 9818605228', location: 'New Delhi, India' } }
];

const seedDB = async () => {
  try {
    await mongoose.connect(dbUri);
    console.log("Connected to MongoDB...");
    await Resource.deleteMany({}); 
    await Resource.insertMany(data);
    console.log(`✅ SUCCESS: All ${data.length} resources uploaded!`);
    process.exit();
  } catch (err) {
    console.error("❌ ERROR:", err.message);
    process.exit(1);
  }
};
seedDB();