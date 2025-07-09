import React from 'react';
import { Play, Clock, Trophy, BookOpen, TrendingUp } from 'lucide-react';
import { Course, User } from '../App';

interface DashboardProps {
  user: User;
  courses: Course[];
  onCourseSelect: (course: Course) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, courses, onCourseSelect }) => {
  const stats = [
    {
      label: 'Total Courses',
      value: user.totalCourses,
      icon: BookOpen,
      color: 'bg-blue-500',
    },
    {
      label: 'Completed',
      value: user.completedCourses,
      icon: Trophy,
      color: 'bg-green-500',
    },
    {
      label: 'Hours Learned',
      value: user.totalHours,
      icon: Clock,
      color: 'bg-purple-500',
    },
    {
      label: 'Certificates',
      value: user.certificates,
      icon: TrendingUp,
      color: 'bg-orange-500',
    },
  ];

  const inProgressCourses = courses.filter(course => course.progress > 0 && course.progress < 100);
  const recentCourses = courses.slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
        <p className="text-blue-100 mb-4">Continue your learning journey and achieve your goals.</p>
        <button className="bg-white text-blue-600 px-6 py-2 rounded-md font-medium hover:bg-blue-50 transition-colors">
          Continue Learning
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className={`p-3 rounded-full ${stat.color} text-white`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Continue Learning */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Continue Learning</h2>
            <div className="space-y-4">
              {inProgressCourses.length > 0 ? (
                inProgressCourses.map((course) => (
                  <div
                    key={course.id}
                    className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    onClick={() => onCourseSelect(course)}
                  >
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{course.title}</h3>
                      <p className="text-sm text-gray-500">{course.instructor}</p>
                      <div className="mt-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-500">Progress</span>
                          <span className="text-xs text-gray-500">{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-full">
                      <Play className="h-5 w-5" />
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">No courses in progress</p>
              )}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentCourses.map((course) => (
                <div key={course.id} className="flex items-center space-x-4">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{course.title}</h3>
                    <p className="text-sm text-gray-500">
                      {course.progress > 0 ? `${course.progress}% completed` : 'Not started'}
                    </p>
                  </div>
                  <div className="text-xs text-gray-500">
                    {course.duration}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};