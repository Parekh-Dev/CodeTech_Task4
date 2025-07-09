import React, { useState } from 'react';
import { ArrowLeft, Play, Check, Clock, Star, Users, BookOpen } from 'lucide-react';
import { Course } from '../App';

interface CourseDetailProps {
  course: Course;
  onBack: () => void;
}

export const CourseDetail: React.FC<CourseDetailProps> = ({ course, onBack }) => {
  const [activeLesson, setActiveLesson] = useState(course.lessons[0]);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-700 mb-4"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to courses
        </button>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-4">
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${getLevelColor(course.level)}`}>
                  {course.level}
                </span>
                <span className="text-sm text-blue-600 font-medium">{course.category}</span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.title}</h1>
              <p className="text-gray-600 mb-4">{course.description}</p>
              
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {course.duration}
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  {course.students.toLocaleString()} students
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
                  {course.rating}
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mt-2">Instructor: {course.instructor}</p>
              
              {course.enrolled && (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Course Progress</span>
                    <span className="text-sm text-gray-600">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-6 lg:mt-0 lg:ml-8">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full lg:w-80 h-48 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Video Player */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {activeLesson.title}
              </h2>
              
              <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
                <video
                  controls
                  className="w-full h-full"
                  poster={course.thumbnail}
                >
                  <source src={activeLesson.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {activeLesson.duration}
                  </div>
                  {activeLesson.completed && (
                    <div className="flex items-center text-sm text-green-600">
                      <Check className="h-4 w-4 mr-1" />
                      Completed
                    </div>
                  )}
                </div>
                
                <button
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeLesson.completed
                      ? 'bg-green-100 text-green-800 hover:bg-green-200'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {activeLesson.completed ? 'Completed' : 'Mark as Complete'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Course Content */}
        <div className="space-y-6">
          {/* Course Lessons */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Content</h3>
              
              <div className="space-y-3">
                {course.lessons.map((lesson, index) => (
                  <div
                    key={lesson.id}
                    className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                      activeLesson.id === lesson.id
                        ? 'bg-blue-50 border-2 border-blue-200'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveLesson(lesson)}
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-900">
                          {index + 1}. {lesson.title}
                        </span>
                        {lesson.completed && (
                          <Check className="h-4 w-4 text-green-500" />
                        )}
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        {lesson.duration}
                      </div>
                    </div>
                    <Play className="h-4 w-4 text-gray-400 ml-3" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Course Stats */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Stats</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Lessons</span>
                <span className="text-sm font-medium text-gray-900">{course.lessons.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Duration</span>
                <span className="text-sm font-medium text-gray-900">{course.duration}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Completed</span>
                <span className="text-sm font-medium text-gray-900">
                  {course.lessons.filter(l => l.completed).length} / {course.lessons.length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Certificate</span>
                <span className="text-sm font-medium text-gray-900">
                  {course.progress === 100 ? 'Available' : 'In Progress'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};