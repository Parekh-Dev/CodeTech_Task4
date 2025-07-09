import React from 'react';
import { Trophy, Clock, BookOpen, Award, TrendingUp } from 'lucide-react';
import { Course, User } from '../App';

interface ProgressProps {
  courses: Course[];
  user: User;
}

export const Progress: React.FC<ProgressProps> = ({ courses, user }) => {
  const totalLessons = courses.reduce((acc, course) => acc + course.lessons.length, 0);
  const completedLessons = courses.reduce((acc, course) => 
    acc + course.lessons.filter(lesson => lesson.completed).length, 0
  );
  const averageProgress = courses.length > 0 
    ? Math.round(courses.reduce((acc, course) => acc + course.progress, 0) / courses.length) 
    : 0;

  const achievements = [
    { title: 'First Course', description: 'Completed your first course', earned: true },
    { title: 'Quick Learner', description: 'Completed 5 lessons in a day', earned: true },
    { title: 'Dedicated Student', description: 'Learned for 7 days straight', earned: false },
    { title: 'Expert Level', description: 'Completed an advanced course', earned: false },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Your Progress</h1>
        <p className="text-gray-600 mt-2">Track your learning journey and achievements</p>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-500 text-white">
              <BookOpen className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Enrolled Courses</p>
              <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-500 text-white">
              <Trophy className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Completed</p>
              <p className="text-2xl font-bold text-gray-900">{user.completedCourses}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-500 text-white">
              <Clock className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Hours</p>
              <p className="text-2xl font-bold text-gray-900">{user.totalHours}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-orange-500 text-white">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Avg. Progress</p>
              <p className="text-2xl font-bold text-gray-900">{averageProgress}%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Course Progress */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Course Progress</h2>
              
              <div className="space-y-6">
                {courses.map((course) => (
                  <div key={course.id} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <h3 className="font-medium text-gray-900">{course.title}</h3>
                          <p className="text-sm text-gray-500">{course.instructor}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{course.progress}%</p>
                        <p className="text-xs text-gray-500">
                          {course.lessons.filter(l => l.completed).length} / {course.lessons.length} lessons
                        </p>
                      </div>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                    
                    {course.progress === 100 && (
                      <div className="flex items-center text-green-600 text-sm">
                        <Trophy className="h-4 w-4 mr-1" />
                        Course completed! Certificate available
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Achievements</h2>
              
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 p-3 rounded-lg ${
                      achievement.earned ? 'bg-yellow-50 border border-yellow-200' : 'bg-gray-50'
                    }`}
                  >
                    <div className={`p-2 rounded-full ${
                      achievement.earned ? 'bg-yellow-500 text-white' : 'bg-gray-300 text-gray-500'
                    }`}>
                      <Award className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-medium ${
                        achievement.earned ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {achievement.title}
                      </h3>
                      <p className="text-xs text-gray-500">{achievement.description}</p>
                    </div>
                    {achievement.earned && (
                      <Trophy className="h-4 w-4 text-yellow-500" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Learning Streak */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Learning Streak</h2>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">5</div>
                <p className="text-sm text-gray-600">Days in a row</p>
              </div>
              
              <div className="mt-4 flex justify-center space-x-1">
                {[...Array(7)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-6 h-6 rounded-full ${
                      i < 5 ? 'bg-blue-500' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};