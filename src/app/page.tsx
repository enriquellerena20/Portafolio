"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const projectImages = [
  "/projects/project1.png",
  "/projects/project2.png",
  "/projects/project3.png",
];

const titleImages = [
  "/titles/Imprimir (1)_page-0001.jpg",
  "/titles/Imprimir (3)_page-0001.jpg",
  "/titles/Imprimir_page-0001 (1).jpg",
  "/titles/CERCURDIP-Llerena-26_7_2023-151026 (1)_page-0001.jpg",
  "/titles/CERCURDIP-Llerena-26_7_2023-151026 (1)_page-0002.jpg",
];

const skills = [
  { src: "/skills/laravel.png", name: "Laravel", level: 90 },
  { src: "/skills/next.jpeg", name: "Next.js", level: 85 },
  { src: "/skills/react.png", name: "React", level: 88 },
  { src: "/skills/js.jpeg", name: "JavaScript", level: 92 },
  { src: "/skills/css.png", name: "Tailwind CSS", level: 89 },
  { src: "/skills/mysql.png", name: "MySQL", level: 87 },
];

const experiences = [
  {
    title: "Frontend Developer",
    company: " IBCorp",
    period: "2024 - 2025",
    description: "Desarrollo de paginas web con migracion de frameworks ."
  },
  {
    title: "Técnico de soporte",
    company: "Subli-Insumos Peru",
    period: "2024 - 2024",
    description: "Instalación y configuración de equipos - Resolución de incidencias y problemas técnicos en tiempo y forma."
  },
];

export default function Home() {
  const [currentProject, setCurrentProject] = useState(0);
  const [visibleSkills, setVisibleSkills] = useState([0, 1, 2]);
  const [isInView, setIsInView] = useState({});
  const [currentTitle, setCurrentTitle] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  
  const sectionRefs = {
    projects: useRef(null),
    skills: useRef(null),
    titles: useRef(null),
    experience: useRef(null),
  };

  // Cursor effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observers = [];
    
    Object.entries(sectionRefs).forEach(([key, ref]) => {
      if (ref.current) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            setIsInView(prev => ({ ...prev, [key]: entry.isIntersecting }));
          },
          { threshold: 0.2 }
        );
        
        observer.observe(ref.current);
        observers.push(observer);
      }
    });
    
    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  // Auto-rotate projects
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentProject((prev) => (prev + 1) % projectImages.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, []);

  // Auto-rotate titles
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % titleImages.length);
    }, 3000);
    
    return () => clearInterval(timer);
  }, []);

  // Rotate through skill groups
  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleSkills(prev => {
        const newSkills = [];
        for (let i = 0; i < 3; i++) {
          newSkills.push((prev[0] + i + 1) % skills.length);
        }
        return newSkills;
      });
    }, 4000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="relative min-h-screen bg-gray-900 text-white font-sans flex flex-col items-center justify-start overflow-x-hidden">
      {/* Custom cursor */}
      <div 
        className="fixed w-8 h-8 rounded-full border-2 border-cyan-400 pointer-events-none z-50 hidden md:block"
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
          transform: 'translate(-50%, -50%)',
          transition: 'transform 0.05s ease-out, left 0.05s ease-out, top 0.05s ease-out'
        }}
      />
      
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <Image
          src="/fondo.png"
          alt="Fondo"
          fill
          priority
          style={{ objectFit: "cover", opacity: 0.15 }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 to-gray-900/50"></div>
        
        {/* Animated particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-cyan-400/30"
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              opacity: Math.random() * 0.5 + 0.1
            }}
            animate={{ 
              x: [
                Math.random() * 100 + "%", 
                Math.random() * 100 + "%",
                Math.random() * 100 + "%"
              ],
              y: [
                Math.random() * 100 + "%",
                Math.random() * 100 + "%",
                Math.random() * 100 + "%"
              ],
            }}
            transition={{
              duration: 20 + Math.random() * 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Header with navigation */}
      <header className="w-full bg-gray-900/80 backdrop-blur-md py-6 px-8 sticky top-0 z-40 flex justify-between items-center">
        <div className="text-2xl font-bold text-cyan-400">ESL</div>
        <nav className="hidden md:flex space-x-6">
          {Object.keys(sectionRefs).map(section => (
            <button
              key={section}
              className={`py-1 px-3 transition-all capitalize ${
                isInView[section] ? "text-cyan-400 border-b-2 border-cyan-400" : "text-gray-400 hover:text-white"
              }`}
              onClick={() => sectionRefs[section].current.scrollIntoView({ behavior: 'smooth' })}
            >
              {section}
            </button>
          ))}
        </nav>
      </header>

      {/* Hero section */}
      <section className="relative w-full h-screen flex items-center justify-center px-6 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6 max-w-4xl"
        >
          <h1 className="text-5xl md:text-7xl font-bold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              Enrique Sebastian Llerena Rodriguez
            </span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-light">Ingeniero de Sistemas - Backend Especializado</h2>
          <p className="max-w-2xl mx-auto text-gray-300 text-lg">
            Estudiante del 9.º ciclo en la Universidad Tecnológica del Perú. Especializado en
            desarrollo backend, con experiencia en frontend y despliegue de proyectos.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full font-semibold text-lg"
              onClick={() => sectionRefs.projects.current.scrollIntoView({ behavior: 'smooth' })}
            >
              Ver Proyectos
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-transparent border-2 border-cyan-400 rounded-full font-semibold text-lg"
            >
              Descargar CV
            </motion.button>
          </div>
        </motion.div>
        
        {/* Animated shapes */}
        <div className="absolute -z-10 w-full h-full">
          <motion.div 
            className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, -20, 0],
              y: [0, 20, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-purple-500/10 to-cyan-500/10 blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              x: [0, 30, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </section>

      {/* Projects section */}
      <section 
        ref={sectionRefs.projects} 
        className="w-full py-24 px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView.projects ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto"
        >
          <h2 className="text-4xl font-bold mb-12 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              Mis Proyectos
            </span>
          </h2>
          
          <div className="relative w-full aspect-video max-w-5xl mx-auto rounded-xl overflow-hidden shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProject}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Image
                  src={projectImages[currentProject]}
                  alt={`Proyecto ${currentProject + 1}`}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-xl"
                />
              </motion.div>
            </AnimatePresence>
            
            {/* Project navigation */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/80 to-transparent flex justify-between items-center px-8">
              <button 
                className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md hover:bg-cyan-400/30 transition-all"
                onClick={() => setCurrentProject((prev) => (prev - 1 + projectImages.length) % projectImages.length)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <div className="flex space-x-2">
                {projectImages.map((_, idx) => (
                  <button
                    key={idx}
                    className={`w-3 h-3 rounded-full transition-all ${
                      idx === currentProject ? "bg-cyan-400 w-8" : "bg-white/30"
                    }`}
                    onClick={() => setCurrentProject(idx)}
                  />
                ))}
              </div>
              
              <button 
                className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md hover:bg-cyan-400/30 transition-all"
                onClick={() => setCurrentProject((prev) => (prev + 1) % projectImages.length)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {["Sistema de Reservas", "E-Commerce", "Dashboard Analytics"].map((title, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className={`relative p-6 rounded-xl backdrop-blur-md ${
                  idx === currentProject 
                    ? "bg-gradient-to-br from-cyan-500/20 to-blue-500/20 ring-1 ring-cyan-400/30" 
                    : "bg-white/5 hover:bg-white/10"
                } cursor-pointer transition-all`}
                onClick={() => setCurrentProject(idx)}
              >
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-400"></p>
                {idx === currentProject && (
                  <motion.div 
                    layoutId="activeProject"
                    className="absolute bottom-0 left-0 w-full h-1 bg-cyan-400"
                  />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
      
      {/* Skills section */}
      <section 
        ref={sectionRefs.skills} 
        className="w-full py-24 px-6 bg-gradient-to-b from-gray-900 to-gray-900/40"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView.skills ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto"
        >
          <h2 className="text-4xl font-bold mb-16 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              Habilidades Técnicas
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <AnimatePresence>
              {visibleSkills.map((idx) => (
                <motion.div
                  key={skills[idx].name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center"
                >
                  <div className="relative w-32 h-32 mb-6 overflow-hidden rounded-3xl bg-gray-800 p-4 flex items-center justify-center">
                    <motion.div
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      className="relative w-20 h-20"
                    >
                      <Image
                        src={skills[idx].src}
                        alt={skills[idx].name}
                        fill
                        style={{ objectFit: "contain" }}
                      />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent -z-10"></div>
                  </div>
                  <h3 className="text-2xl font-medium mb-3">{skills[idx].name}</h3>
                  <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skills[idx].level}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
                    />
                  </div>
                  <p className="mt-2 text-cyan-400 font-medium">{skills[idx].level}%</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          <div className="mt-16 flex justify-center space-x-2">
            {skills.map((_, idx) => (
              <button
                key={idx}
                className={`w-3 h-3 rounded-full transition-all ${
                  visibleSkills.includes(idx) ? "bg-cyan-400" : "bg-white/30"
                }`}
                onClick={() => {
                  const newVisible = [];
                  for (let i = 0; i < 3; i++) {
                    newVisible.push((idx + i) % skills.length);
                  }
                  setVisibleSkills(newVisible);
                }}
              />
            ))}
          </div>
        </motion.div>
      </section>
      
      {/* Experience section */}
      <section 
        ref={sectionRefs.experience} 
        className="w-full py-24 px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView.experience ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto"
        >
          <h2 className="text-4xl font-bold mb-16 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              Experiencia Profesional
            </span>
          </h2>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full"></div>
            
            {/* Experience items */}
            {experiences.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                animate={isInView.experience ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                className={`flex ${idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} mb-16 relative`}
              >
                <div className={`w-1/2 ${idx % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                  <h3 className="text-2xl font-semibold text-cyan-400">{exp.title}</h3>
                  <p className="text-xl text-gray-200 mb-2">{exp.company}</p>
                  <p className="text-gray-400 mb-4">{exp.period}</p>
                  <p className="text-gray-300">{exp.description}</p>
                </div>
                
                <div className="absolute left-1/2 top-0 transform -translate-x-1/2 w-6 h-6 rounded-full bg-cyan-400 border-4 border-gray-900 z-10"></div>
                
                <div className="w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
      
      {/* Certificates section with 3D effect */}
      <section 
        ref={sectionRefs.titles} 
        className="w-full py-24 px-6 bg-gray-900/60 backdrop-blur-md"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView.titles ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto"
        >
          <h2 className="text-4xl font-bold mb-16 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              Títulos y Certificados
            </span>
          </h2>
          
          <div className="flex justify-center">
            <div className="relative h-96 w-full max-w-2xl perspective">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTitle}
                  initial={{ rotateY: 90, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  exit={{ rotateY: -90, opacity: 0 }}
                  transition={{ duration: 0.7 }}
                  className="absolute inset-0 shadow-2xl rounded-xl overflow-hidden border border-cyan-400/30"
                >
                  <Image
                    src={titleImages[currentTitle]}
                    alt={`Título ${currentTitle + 1}`}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-semibold mb-2">Certificado {currentTitle + 1}</h3>
                    <p className="text-gray-300">Universidad Tecnológica del Perú</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          
          <div className="mt-8 flex justify-center space-x-2">
            {titleImages.map((_, idx) => (
              <button
                key={idx}
                className={`w-3 h-3 rounded-full transition-all ${
                  idx === currentTitle ? "bg-cyan-400 w-8" : "bg-white/30"
                }`}
                onClick={() => setCurrentTitle(idx)}
              />
            ))}
          </div>
        </motion.div>
      </section>
      
      {/* Contact section */}
      <section className="w-full py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              Contáctame
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gray-800/50 backdrop-blur-md p-8 rounded-xl border border-gray-700"
            >
              <h3 className="text-2xl font-semibold mb-6 text-cyan-400">Envíame un Mensaje</h3>
              <form className="space-y-6">
                <div>
                  <label className="block text-gray-300 mb-2">Nombre</label>
                  <input 
                    type="text" 
                    className="w-full p-3 rounded-lg bg-gray-700/70 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Email</label>
                  <input 
                    type="email" 
                    className="w-full p-3 rounded-lg bg-gray-700/70 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Mensaje</label>
                  <textarea 
                    className="w-full p-3 rounded-lg bg-gray-700/70 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 min-h-32"
                  ></textarea>
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-medium text-lg"
                >
                  Enviar Mensaje
                </motion.button>
              </form>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col justify-center space-y-8"
            >
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-cyan-400">Información de Contacto</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-cyan-400/20 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-400">Email</p>
                      <p className="text-lg">enriquesebastianllerena@gmail.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-cyan-400/20 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-400">Ubicación</p>
                      <p className="text-lg">San Martín de Porres, Lima, Perú</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-cyan-400">Redes Sociales</h3>
                <div className="flex space-x-4">
                  <motion.a
                    whileHover={{ y: -5, scale: 1.1 }}
                    className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center"
                    href="https://linkedin.com/in/enrique-llerena"
                    target="_blank"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </motion.a>

                  <motion.a
                    whileHover={{ y: -5, scale: 1.1 }}
                    className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center"
                    href="https://github.com/enriquellerena20"
                    target="_blank"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </motion.a>

                  <motion.a
                    whileHover={{ y: -5, scale: 1.1 }}
                    className="w-12 h-12 rounded-full bg-blue-400 flex items-center justify-center"
                    href="#"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 px-6 bg-gray-900 border-t border-cyan-900/50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-cyan-400">ESL</h3>
            <p className="text-gray-400">Ingeniero de Sistemas especializado en desarrollo backend, con amplia experiencia en Laravel y Next.js.</p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">Inicio</a></li>
              <li><a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">Proyectos</a></li>
              <li><a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">Habilidades</a></li>
              <li><a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">Contacto</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Servicios</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">Desarrollo Backend</li>
              <li className="text-gray-300">APIs RESTful</li>
              <li className="text-gray-300">Desarrollo Web</li>
              <li className="text-gray-300">Optimización de Bases de Datos</li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Contacto</h3>
            <p className="text-gray-300">enriquesebastianllerena@gmail.com</p>
            <p className="text-gray-300">San Martín de Porres, Lima, Perú</p>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-gray-800 text-center text-gray-500">
          <p>© {new Date().getFullYear()} Enrique Sebastian Llerena Rodriguez. Todos los derechos reservados.</p>
        </div>
      </footer>

      {/* Scroll to top button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg hover:shadow-cyan-500/20 z-50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </motion.button>
    </main>
  );
}