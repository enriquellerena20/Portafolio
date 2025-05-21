"use client";
import Image from "next/image";
import { useState } from "react";

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
  { src: "/skills/laravel.png", name: "Laravel" },
  { src: "/skills/next.jpeg", name: "Next.js" },
  { src: "/skills/react.png", name: "React" },
  { src: "/skills/js.jpeg", name: "JavaScript" },
  { src: "/skills/css.png", name: "Tailwind CSS" },
  { src: "/skills/mysql.png", name: "MySQL" },
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [skillIndex, setSkillIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((currentIndex + 1) % projectImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((currentIndex - 1 + projectImages.length) % projectImages.length);
  };

  const nextSkill = () => {
    setSkillIndex((skillIndex + 1) % skills.length);
  };

  const prevSkill = () => {
    setSkillIndex((skillIndex - 1 + skills.length) % skills.length);
  };

  return (
    <main className="relative min-h-screen bg-transparent text-white z-10 font-sans flex flex-col items-center justify-start p-6 space-y-16 overflow-hidden">
      {/* Fondo con imagen */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/fondo.png"
          alt="Fondo"
          fill
          priority
          style={{ objectFit: "cover", opacity: 0.3 }}
        />
      </div>

      {/* Banner principal */}
      <section className="text-center space-y-4 mt-10">
        <h1 className="text-4xl md:text-6xl font-bold text-cyan-400">
          Enrique Sebastian Llerena Rodriguez
        </h1>
        <h2 className="text-xl md:text-2xl">Ingeniero de Sistemas - Backend Especializado</h2>
        <p className="max-w-2xl mx-auto text-gray-300">
          Estudiante del 9.º ciclo en la Universidad Tecnológica del Perú. Especializado en
          desarrollo backend, con experiencia en frontend y despliegue de proyectos. Trabajo con
          Laravel y Next.js.
        </p>
      </section>

      {/* Carrusel de proyectos */}
      <section className="text-center">
        <h2 className="text-3xl font-semibold mb-4 text-cyan-300">Proyectos</h2>
        <div className="relative w-full max-w-xl mx-auto">
          <Image
            src={projectImages[currentIndex]}
            alt={`Proyecto ${currentIndex + 1}`}
            width={800}
            height={500}
            className="rounded-lg shadow-lg"
          />
          <div className="flex justify-between mt-4">
            <button onClick={prevSlide}>←</button>
            <button onClick={nextSlide}>→</button>
          </div>
        </div>
      </section>

      {/* Títulos */}
      <section className="text-center">
        <h2 className="text-3xl font-semibold mb-4 text-cyan-300">Títulos y Certificados</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {titleImages.map((src, idx) => (
            <Image
              key={idx}
              src={src}
              alt={`Título ${idx + 1}`}
              width={300}
              height={200}
              className="rounded-md border border-cyan-500"
            />
          ))}
        </div>
      </section>

      {/* Carrusel de habilidades */}
      <section className="text-center">
        <h2 className="text-3xl font-semibold mb-4 text-cyan-300">Habilidades</h2>
        <div className="flex flex-col items-center space-y-4">
          <Image
            src={skills[skillIndex].src}
            alt={skills[skillIndex].name}
            width={80}
            height={80}
          />
          <p className="text-xl">{skills[skillIndex].name}</p>
          <div className="flex space-x-4">
            <button onClick={prevSkill}>←</button>
            <button onClick={nextSkill}>→</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 border-t border-cyan-800 mt-12 text-center text-gray-400">
        <p>Contacto: enriquesebastianllerena@gmail.com</p>
        <p>LinkedIn: Enrique Llerena</p>
        <p>GitHub: enriquellerena20</p>
        <p>San Martín de Porres</p>
      </footer>
    </main>
  );
}