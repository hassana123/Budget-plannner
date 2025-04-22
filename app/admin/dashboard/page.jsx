'use client';

import { useState, useEffect } from 'react';
import { auth, db, storage } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Project form state
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    technologies: '',
    imageUrl: '',
    liveUrl: '',
    githubUrl: ''
  });

  // Skill form state
  const [newSkill, setNewSkill] = useState({
    name: '',
    category: '',
    proficiency: ''
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchProjects();
        fetchSkills();
      } else {
        router.push('/admin/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
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
      toast.error('Error fetching projects');
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
      toast.error('Error fetching skills');
    }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'projects'), newProject);
      toast.success('Project added successfully!');
      fetchProjects();
      setNewProject({
        title: '',
        description: '',
        technologies: '',
        imageUrl: '',
        liveUrl: '',
        githubUrl: ''
      });
    } catch (error) {
      toast.error('Error adding project');
    }
  };

  const handleSkillSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'skills'), newSkill);
      toast.success('Skill added successfully!');
      fetchSkills();
      setNewSkill({
        name: '',
        category: '',
        proficiency: ''
      });
    } catch (error) {
      toast.error('Error adding skill');
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      router.push('/admin/login');
    } catch (error) {
      toast.error('Error logging out');
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <Button onClick={handleLogout} variant="outline">Logout</Button>
        </div>

        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
          </TabsList>

          <TabsContent value="projects">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Add New Project</h2>
              <form onSubmit={handleProjectSubmit} className="space-y-4">
                <Input
                  placeholder="Project Title"
                  value={newProject.title}
                  onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                  required
                />
                <Textarea
                  placeholder="Project Description"
                  value={newProject.description}
                  onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                  required
                />
                <Input
                  placeholder="Technologies (comma separated)"
                  value={newProject.technologies}
                  onChange={(e) => setNewProject({...newProject, technologies: e.target.value})}
                  required
                />
                <Input
                  placeholder="Image URL"
                  value={newProject.imageUrl}
                  onChange={(e) => setNewProject({...newProject, imageUrl: e.target.value})}
                  required
                />
                <Input
                  placeholder="Live URL"
                  value={newProject.liveUrl}
                  onChange={(e) => setNewProject({...newProject, liveUrl: e.target.value})}
                />
                <Input
                  placeholder="GitHub URL"
                  value={newProject.githubUrl}
                  onChange={(e) => setNewProject({...newProject, githubUrl: e.target.value})}
                />
                <Button type="submit">Add Project</Button>
              </form>

              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Existing Projects</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {projects.map((project) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-4 border rounded-lg"
                    >
                      <h4 className="font-semibold">{project.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{project.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="skills">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Add New Skill</h2>
              <form onSubmit={handleSkillSubmit} className="space-y-4">
                <Input
                  placeholder="Skill Name"
                  value={newSkill.name}
                  onChange={(e) => setNewSkill({...newSkill, name: e.target.value})}
                  required
                />
                <Input
                  placeholder="Category"
                  value={newSkill.category}
                  onChange={(e) => setNewSkill({...newSkill, category: e.target.value})}
                  required
                />
                <Input
                  placeholder="Proficiency (1-100)"
                  type="number"
                  min="1"
                  max="100"
                  value={newSkill.proficiency}
                  onChange={(e) => setNewSkill({...newSkill, proficiency: e.target.value})}
                  required
                />
                <Button type="submit">Add Skill</Button>
              </form>

              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Existing Skills</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {skills.map((skill) => (
                    <motion.div
                      key={skill.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-4 border rounded-lg"
                    >
                      <h4 className="font-semibold">{skill.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{skill.category}</p>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                        <div
                          className="bg-pink-600 h-2.5 rounded-full"
                          style={{ width: `${skill.proficiency}%` }}
                        ></div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}