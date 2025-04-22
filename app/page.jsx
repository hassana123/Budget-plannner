'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GithubIcon, LinkedinIcon, BookText, Code2, Sparkles, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetchProjects();
    fetchSkills();
  }, []);

  const fetchProjects = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'projects'));
      const projectsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProjects(projectsData);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchSkills = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'skills'));
      const skillsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setSkills(skillsData);
    } catch (error) {
      console.error('Error fetching skills:', error);
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold text-pink-600 dark:text-pink-400"
          >
            Hassana Abdullahi
          </motion.h1>
          <div className="flex items-center gap-6">
            <Link href="/admin/login" className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition">
              Admin Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Frontend Developer & UI Enthusiast
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Building beautiful, responsive, and user-friendly web applications with modern technologies
          </p>
          <div className="flex justify-center gap-4">
            <Link 
              href="https://github.com/hassana123" 
              target="_blank"
              className="p-2 text-gray-600 hover:text-pink-600 transition"
            >
              <GithubIcon size={24} />
            </Link>
            <Link 
              href="https://www.linkedin.com/in/hassana-abdullahi-858040240/" 
              target="_blank"
              className="p-2 text-gray-600 hover:text-pink-600 transition"
            >
              <LinkedinIcon size={24} />
            </Link>
            <Link 
              href="https://hashnode.com/@TechSultana" 
              target="_blank"
              className="p-2 text-gray-600 hover:text-pink-600 transition"
            >
              <BookText size={24} />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section className="py-16 bg-white/50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4">
          <motion.h2 
            {...fadeInUp}
            className="text-3xl font-bold text-center mb-12"
          >
            Skills & Expertise
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
              >
                <h3 className="text-xl font-semibold mb-4">{skill.name}</h3>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.proficiency}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="bg-pink-600 h-2.5 rounded-full"
                  ></motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2 
            {...fadeInUp}
            className="text-3xl font-bold text-center mb-12"
          >
            Featured Projects
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg"
              >
                <div className="relative aspect-video">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.split(',').map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-300 rounded-full text-sm"
                      >
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    {project.liveUrl && (
                      <Link
                        href={project.liveUrl}
                        target="_blank"
                        className="flex items-center gap-2 text-pink-600 hover:text-pink-700"
                      >
                        <ExternalLink size={16} />
                        Live Demo
                      </Link>
                    )}
                    {project.githubUrl && (
                      <Link
                        href={project.githubUrl}
                        target="_blank"
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-700"
                      >
                        <GithubIcon size={16} />
                        Code
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white/50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4">
          <motion.div
            {...fadeInUp}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-6">Let's Connect</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              I'm always open to new opportunities and collaborations. Feel free to reach out!
            </p>
            <Link
              href="mailto:abdullahihassana38@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
            >
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}