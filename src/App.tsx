import React, { useState } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { CourseList } from './components/CourseList';
import { CourseDetail } from './components/CourseDetail';
import { Progress } from './components/Progress';
import { Profile } from './components/Profile';

export type Course = {
  id: string;
  title: string;
  instructor: string;
  duration: string;
  level: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  progress: number;
  enrolled: boolean;
  rating: number;
  students: number;
  category: string;
  lessons: {
    id: string;
    title: string;
    duration: string;
    completed: boolean;
    videoUrl: string;
  }[];
};

export type User = {
  name: string;
  email: string;
  avatar: string;
  totalCourses: number;
  completedCourses: number;
  totalHours: number;
  certificates: number;
};

function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'courses' | 'progress' | 'profile'>('dashboard');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const sampleCourses: Course[] = [
    {
      id: '1',
      title: 'Complete React Development',
      instructor: 'Sarah Johnson',
      duration: '12 hours',
      level: 'Intermediate',
      description: 'Master React development with hooks, context, and modern patterns. Build real-world applications.',
      thumbnail: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=500',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      progress: 75,
      enrolled: true,
      rating: 4.8,
      students: 1234,
      category: 'Programming',
      lessons: [
        { id: '1', title: 'React Fundamentals', duration: '45min', completed: true, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
        { id: '2', title: 'Hooks Deep Dive', duration: '60min', completed: true, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
        { id: '3', title: 'State Management', duration: '55min', completed: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
      ]
    },
    {
      id: '2',
      title: 'UI/UX Design Principles',
      instructor: 'Michael Chen',
      duration: '8 hours',
      level: 'Beginner',
      description: 'Learn the fundamentals of user interface and user experience design.',
      thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=500',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      progress: 30,
      enrolled: true,
      rating: 4.6,
      students: 892,
      category: 'Design',
      lessons: [
        { id: '1', title: 'Design Thinking', duration: '40min', completed: true, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
        { id: '2', title: 'Color Theory', duration: '35min', completed: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
      ]
    },
    {
      id: '3',
      title: 'Python for Data Science',
      instructor: 'Dr. Emily Rodriguez',
      duration: '15 hours',
      level: 'Advanced',
      description: 'Master Python programming for data analysis, visualization, and machine learning.',
      thumbnail: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=500',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      progress: 0,
      enrolled: false,
      rating: 4.9,
      students: 2156,
      category: 'Data Science',
      lessons: [
        { id: '1', title: 'Python Basics', duration: '90min', completed: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
        { id: '2', title: 'Data Structures', duration: '75min', completed: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
      ]
    },
    {
      id: '4',
      title: 'Digital Marketing Mastery',
      instructor: 'Alex Thompson',
      duration: '10 hours',
      level: 'Intermediate',
      description: 'Learn effective digital marketing strategies and tactics for modern businesses.',
      thumbnail: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=500',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
      progress: 50,
      enrolled: true,
      rating: 4.7,
      students: 756,
      category: 'Marketing',
      lessons: [
        { id: '1', title: 'SEO Fundamentals', duration: '60min', completed: true, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4' },
        { id: '2', title: 'Social Media Strategy', duration: '45min', completed: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4' },
      ]
    }
  ];

  const user: User = {
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=200',
    totalCourses: 4,
    completedCourses: 1,
    totalHours: 45,
    certificates: 1
  };

  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course);
  };

  const handleBackToCourses = () => {
    setSelectedCourse(null);
  };

  const handleEnrollCourse = (courseId: string) => {
    // In a real app, this would make an API call
    console.log('Enrolling in course:', courseId);
  };

  if (selectedCourse) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header 
          user={user} 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
        />
        <CourseDetail 
          course={selectedCourse} 
          onBack={handleBackToCourses}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        user={user} 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <Dashboard 
            user={user} 
            courses={sampleCourses.filter(c => c.enrolled)} 
            onCourseSelect={handleCourseSelect}
          />
        )}
        
        {activeTab === 'courses' && (
          <CourseList 
            courses={sampleCourses} 
            onCourseSelect={handleCourseSelect}
            onEnroll={handleEnrollCourse}
          />
        )}
        
        {activeTab === 'progress' && (
          <Progress 
            courses={sampleCourses.filter(c => c.enrolled)} 
            user={user}
          />
        )}
        
        {activeTab === 'profile' && (
          <Profile user={user} />
        )}
      </main>
    </div>
  );
}

export default App;