"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Points,
  PointMaterial,
  Sphere,
  Environment,
  Float,
  Sparkles,
  MeshDistortMaterial,
} from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import {
  Code2,
  FileText,
  Globe,
  Palette,
  Server,
  Database,
  GitBranch,
  Github,
  TestTube,
  Zap,
  Layers,
  Monitor,
  Mail,
  Phone,
  Linkedin,
  MessageCircle,
  Send,
  Heart,
  Star,
  Coffee,
  Code,
} from "lucide-react";
import assets from "../../public/assets.js";
// Enhanced 3D Particle System for Hero
function HeroParticleSystem() {
  const particlesRef = useRef<THREE.Points>(null);

  const [particles] = useState(() => {
    const positions = new Float32Array(5000 * 3);
    const colors = new Float32Array(5000 * 3);

    for (let i = 0; i < 5000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

      colors[i * 3] = Math.random() * 0.5 + 0.5;
      colors[i * 3 + 1] = Math.random() * 0.3 + 0.7;
      colors[i * 3 + 2] = 1;
    }

    return { positions, colors };
  });

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.05;
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.03;

      const positions = particlesRef.current.geometry.attributes.position
        .array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] +=
          Math.sin(state.clock.elapsedTime + positions[i]) * 0.001;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
          args={[particles.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particles.colors.length / 3}
          array={particles.colors}
          itemSize={3}
          args={[particles.colors, 3]}
        />
      </bufferGeometry>
      <PointMaterial
        transparent
        vertexColors
        size={0.8}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// Morphing Geometric Shapes for Projects
function MorphingGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [geometry, setGeometry] = useState(0);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime;
      meshRef.current.rotation.x = t * 0.1;
      meshRef.current.rotation.y = t * 0.15;
      meshRef.current.position.y = Math.sin(t * 0.3) * 0.5;
    }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setGeometry((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        {geometry === 0 && <dodecahedronGeometry args={[1, 0]} />}
        {geometry === 1 && <icosahedronGeometry args={[1, 0]} />}
        {geometry === 2 && <octahedronGeometry args={[1, 0]} />}
        <MeshDistortMaterial
          color="#00ffff"
          transparent
          opacity={0.6}
          distort={0.4}
          speed={2}
          roughness={0}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

// Neural Network Visualization
function NeuralNetwork() {
  const groupRef = useRef<THREE.Group>(null);
  const nodes = useRef([]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  const nodePositions: [number, number, number][] = [];
  for (let layer = 0; layer < 4; layer++) {
    for (let node = 0; node < 5; node++) {
      nodePositions.push([(layer - 1.5) * 2, (node - 2) * 0.8, 0]);
    }
  }

  return (
    <group ref={groupRef}>
      {nodePositions.map((pos, i) => (
        <Float key={i} speed={0.5 + i * 0.1} rotationIntensity={0.1}>
          <Sphere args={[0.05]} position={pos}>
            <meshStandardMaterial
              color="#ff00ff"
              emissive="#ff00ff"
              emissiveIntensity={0.3}
            />
          </Sphere>
        </Float>
      ))}
    </group>
  );
}

// Holographic Display
function HolographicDisplay() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime;
      meshRef.current.rotation.y = t * 0.2;
      (meshRef.current.material as THREE.Material).opacity =
        0.3 + Math.sin(t * 2) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef}>
      <cylinderGeometry args={[1.5, 1.5, 0.1, 32, 1, true]} />
      <meshStandardMaterial
        color="#00ffff"
        transparent
        opacity={0.3}
        side={THREE.DoubleSide}
        wireframe
      />
    </mesh>
  );
}

// Custom Cursor Component
function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    interface MousePosition {
      x: number;
      y: number;
    }

    const updateMousePosition = (e: MouseEvent): void => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    document.addEventListener("mousemove", updateMousePosition);

    const interactiveElements = document.querySelectorAll(
      "a, button, .interactive"
    );
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      document.removeEventListener("mousemove", updateMousePosition);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <div
      className="fixed pointer-events-none z-50 mix-blend-difference"
      style={{
        left: mousePosition.x - 10,
        top: mousePosition.y - 10,
        transform: `scale(${isHovering ? 1.5 : 1})`,
        transition: "transform 0.2s ease-out",
      }}
    >
      <div className="w-5 h-5 bg-cyan-400 rounded-full blur-sm opacity-80"></div>
      <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
    </div>
  );
}

// Floating icons for Contact section (moved to top-level scope)
const floatingIcons = [
  { Icon: Mail, color: "#00ffff", delay: 0 },
  { Icon: Phone, color: "#ff00ff", delay: 0.5 },
  { Icon: Github, color: "#ffff00", delay: 1 },
  { Icon: Linkedin, color: "#00ff00", delay: 1.5 },
  { Icon: MessageCircle, color: "#ff6b6b", delay: 2 },
  { Icon: Send, color: "#4ecdc4", delay: 2.5 },
  { Icon: Globe, color: "#45b7d1", delay: 3 },
  { Icon: Heart, color: "#f093fb", delay: 3.5 },
  { Icon: Star, color: "#feca57", delay: 4 },
  { Icon: Zap, color: "#ff9ff3", delay: 4.5 },
  { Icon: Coffee, color: "#54a0ff", delay: 5 },
  { Icon: Code, color: "#5f27cd", delay: 5.5 },
];

// Enhanced Skill Card with Magnetic Effect
type SkillCardProps = {
  skill: string;
  category: string;
  index: number;
};

function SkillCard({ skill, category, index }: SkillCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  interface MouseMoveEvent
    extends React.MouseEvent<HTMLDivElement, MouseEvent> {}

  const handleMouseMove = (e: MouseMoveEvent): void => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
    }
    setIsHovered(false);
  };
  const ContactSection = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
      interface MousePosition {
        x: number;
        y: number;
      }

      const handleMouseMove = (e: MouseEvent) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);
  };

  return (
    <div
      ref={cardRef}
      className="group relative transform transition-all duration-300 interactive"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      style={{
        animationDelay: `${index * 0.1}s`,
        animation: "fadeInUp 0.6s ease-out forwards",
      }}
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-lg blur opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
      <div className="relative bg-gray-900/90 backdrop-blur-sm p-6 rounded-lg border border-cyan-500/20 hover:border-cyan-500/60 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/25">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-cyan-300 text-sm font-medium transition-colors duration-300 group-hover:text-cyan-200">
            {category}
          </h4>
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
        </div>
        <p className="text-white font-bold text-lg transition-colors duration-300 group-hover:text-cyan-100">
          {skill}
        </p>
        <div className="mt-3 h-1 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
            style={{ width: isHovered ? "100%" : "0%" }}
          ></div>
        </div>
      </div>
    </div>
  );
}

// Enhanced Project Card with 3D Tilt
type ProjectCardProps = {
  title: string;
  description: string;
  stack: string;
  liveUrl: string;
  codeUrl: string;
  index: number;
  imageUrl: string;
};

function ProjectCard({
  title,
  description,
  stack,
  liveUrl,
  codeUrl,
  index,
  imageUrl,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  interface MouseMoveEvent
    extends React.MouseEvent<HTMLDivElement, MouseEvent> {}

  const handleMouseMove = (e: MouseMoveEvent): void => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
    }
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      className="group relative transform transition-all duration-500 interactive"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      style={{
        animationDelay: `${index * 0.2}s`,
        animation: "slideInUp 0.8s ease-out forwards",
      }}
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-xl blur opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
      <div className="relative bg-gray-900/95 backdrop-blur-sm rounded-xl border border-cyan-500/20 hover:border-cyan-500/60 transition-all duration-700 overflow-hidden hover:shadow-2xl hover:shadow-cyan-500/25">
        {/* Project Image Header */}
        <div className="relative h-48 overflow-hidden">
          <img src={imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/40 via-purple-900/30 to-pink-900/30 mix-blend-overlay"></div>
        </div>

        <div className="p-6">
          <h3 className="text-2xl font-bold text-white mb-3 transition-colors duration-300 group-hover:text-cyan-200">
            {title}
          </h3>
          <p className="text-gray-300 mb-4 leading-relaxed transition-colors duration-300 group-hover:text-gray-200">
            {description}
          </p>

          {/* Tech Stack with Pills */}
          <div className="mb-6">
            <p className="text-cyan-300 text-sm font-medium mb-3">
              Tech Stack:
            </p>
            <div className="flex flex-wrap gap-2">
              {stack.split(", ").map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-full text-xs text-cyan-200 transition-all duration-300 hover:from-cyan-500/30 hover:to-purple-500/30"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Enhanced Buttons */}
          <div className="flex gap-4">
            <a
              href={`https://${liveUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn relative px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-2xl transition-all duration-300 text-sm font-medium transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30 overflow-hidden"
            >
              <span className="relative z-10">Live Demo</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
            </a>
            <a
              href={codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn relative px-6 py-3 border border-cyan-500 text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-400 rounded-2xl transition-all duration-300 text-sm font-medium transform hover:scale-105 overflow-hidden"
            >
              <span className="relative z-10">GitHub</span>
              <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// Scroll Progress Indicator
function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
      <div
        className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
      ></div>
    </div>
  );
}

// Enhanced Navbar
function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? "bg-gray-900/95 backdrop-blur-sm border-b border-cyan-500/20 shadow-lg shadow-cyan-500/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            MVS
          </div>

          <div className="hidden md:flex space-x-8">
            {["About", "Skills", "Projects", "Experience", "Contact"].map(
              (item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="relative text-gray-300 hover:text-cyan-400 transition-colors duration-300 group interactive"
                >
                  {item}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:w-full transition-all duration-300"></div>
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default function Portfolio() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const skills = [
    // Languages
    {
      name: "JavaScript",
      icon: Code2,
      proficiency: 100,
      color: "#F7DF1E",
      category: "Languages",
    },
    {
      name: "TypeScript",
      icon: FileText,
      proficiency: 100,
      color: "#3178C6",
      category: "Languages",
    },
    {
      name: "Python",
      icon: Code2,
      proficiency: 100,
      color: "#3776AB",
      category: "Languages",
    },

    // Frontend
    {
      name: "React.js",
      icon: Code2,
      proficiency: 100,
      color: "#61DAFB",
      category: "Frontend",
    },
    {
      name: "Next.js",
      icon: Globe,
      proficiency: 100,
      color: "#000000",
      category: "Frontend",
    },
    {
      name: "Tailwind CSS",
      icon: Palette,
      proficiency: 100,
      color: "#06B6D4",
      category: "Frontend",
    },

    // Backend
    {
      name: "Node.js",
      icon: Server,
      proficiency: 100,
      color: "#339933",
      category: "Backend",
    },
    {
      name: "Express.js",
      icon: Server,
      proficiency: 100,
      color: "#000000",
      category: "Backend",
    },

    // Databases
    {
      name: "MongoDB",
      icon: Database,
      proficiency: 100,
      color: "#47A248",
      category: "Databases",
    },
    {
      name: "PostgreSQL",
      icon: Database,
      proficiency: 100,
      color: "#336791",
      category: "Databases",
    },
    {
      name: "MySQL",
      icon: Database,
      proficiency: 100,
      color: "#4479A1",
      category: "Databases",
    },

    // Tools
    {
      name: "Git",
      icon: GitBranch,
      proficiency: 100,
      color: "#CF0F47",
      category: "Tools",
    },
    {
      name: "GitHub",
      icon: Github,
      proficiency: 100,
      color: "#BB3E00",
      category: "Tools",
    },
    {
      name: "Jest",
      icon: TestTube,
      proficiency: 100,
      color: "#C21325",
      category: "Tools",
    },
    {
      name: "Postman",
      icon: Zap,
      proficiency: 100,
      color: "#FF6C37",
      category: "Tools",
    },
    {
      name: "Webflow",
      icon: Layers,
      proficiency: 100,
      color: "#4353FF",
      category: "Tools",
    },
  ];

  const projects = [
    {
      title: "HealthAxis",
      description:
        "Full-stack health tracking and doctor appointment app with comprehensive patient management system.",
      stack: "MERN, JWT, Recharts",
      liveUrl: "health-axis-frontend.vercel.app",
      codeUrl: "https://github.com",
      imageUrl: assets.project1,
    },
    {
      title: "Expense Tracker",
      description:
        "Track & manage personal expenses with intuitive dashboard and detailed analytics.",
      stack: "Next.js, ShadCN UI, Drizzle ORM",
      liveUrl: "expense-tracker-saketh.vercel.app",
      codeUrl: "https://github.com",
      imageUrl: assets.project2,
    },
    {
      title: "AI-Powered Story Generator",
      description:
        "Create unique kids' stories using AI with interactive storytelling features.",
      stack: "Next.js, Gemini AI, Drizzle ORM",
      liveUrl: "story-generator-black.vercel.app",
      codeUrl: "https://github.com",
      imageUrl: assets.project3,
    },
  ];

  return (
    <div className="bg-black text-white overflow-x-hidden">
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes glitch {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-2px, 2px);
          }
          40% {
            transform: translate(-2px, -2px);
          }
          60% {
            transform: translate(2px, 2px);
          }
          80% {
            transform: translate(2px, -2px);
          }
          100% {
            transform: translate(0);
          }
        }

        .animate-glitch:hover {
          animation: glitch 0.3s ease-in-out;
        }
      `}</style>

      <CustomCursor />
      <ScrollProgress />
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }} dpr={[1, 2]}>
            <ambientLight intensity={0.2} />
            <pointLight
              position={[10, 10, 10]}
              intensity={0.5}
              color="#00ffff"
            />
            <pointLight
              position={[-10, -10, -10]}
              intensity={0.3}
              color="#ff00ff"
            />
            <HeroParticleSystem />
            <Sparkles
              count={100}
              scale={10}
              size={2}
              speed={0.5}
              color="#00ffff"
            />
            <Environment preset="night" />
          </Canvas>
        </div>

        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
              linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)
            `,
              backgroundSize: "50px 50px",
              animation: "pulse 4s ease-in-out infinite",
            }}
          ></div>
        </div>

        <div className="relative z-10 text-center px-4">
          <div
            className="transform transition-transform duration-1000 ease-out"
            style={{ transform: `translateY(${scrollY * 0.2}px)` }}
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-glitch">
              <span className="block">Muddu Venkata</span>
              <span className="block">Saketh</span>
            </h1>
            <div className="relative mb-8">
              <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                <span className="text-cyan-400 font-semibold">
                  MERN Stack Developer
                </span>{" "}
                crafting
                <span className="text-purple-400 font-semibold pr-2">
                  {" "}
                  immersive digital experiences
                </span>
                with cutting-edge technology
              </p>
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-xl opacity-50 animate-pulse"></div>
            </div>

            <div className="flex justify-center gap-6 mb-12">
              <a
                href="#projects"
                className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full hover:from-cyan-600 hover:to-purple-600 transition-all duration-500 transform hover:scale-110 font-medium shadow-lg hover:shadow-cyan-500/30 interactive overflow-hidden"
              >
                <span className="relative z-10">View Projects</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              <a
                href="#contact"
                className="group relative px-8 py-4 border-2 border-cyan-500 rounded-full hover:bg-cyan-500/10 hover:border-cyan-400 transition-all duration-500 transform hover:scale-110 font-medium interactive overflow-hidden"
              >
                <span className="relative z-10">Get In Touch</span>
                <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
            </div>
          </div>
        </div>
        <div>
          {/* Animated Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 pt-20">
            <div className="flex flex-col items-center space-y-2 animate-bounce">
              <div className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-cyan-400 rounded-full mt-2 animate-pulse"></div>
              </div>
              <p className="text-cyan-300 text-sm font-medium">Scroll</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-20 px-4 max-w-6xl mx-auto">
        <div className="absolute inset-0 z-0 opacity-10">
          <Canvas camera={{ position: [0, 0, 4] }} dpr={[1, 2]}>
            <ambientLight intensity={0.3} />
            <pointLight position={[5, 5, 5]} intensity={0.4} color="#00ffff" />
            <NeuralNetwork />
            <Environment preset="dawn" />
          </Canvas>
        </div>

        <div className="relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto mb-8"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center md:justify-start">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative w-80 h-80 rounded-full overflow-hidden border-4 border-cyan-500/30 group-hover:border-cyan-500/60 transition-all duration-500">
                  <div className="w-full h-full bg-gradient-to-br from-cyan-900/30 to-purple-900/30 flex items-center justify-center">
                    <div className="text-8xl text-cyan-300/50">
                      <img src={assets.profile} alt="profile" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                <span className="text-cyan-400 font-semibold">
                  MERN Stack Developer
                </span>{" "}
                passionate about building
                <span className="text-purple-400 font-semibold">
                  {" "}
                  full-stack web applications
                </span>{" "}
                with React, Node.js, and cloud integrations. Proficient in
                creating modern UIs and RESTful APIs.
              </p>
              <p className="text-lg text-gray-400 leading-relaxed">
                Currently expanding expertise in{" "}
                <span className="text-cyan-400">cloud technologies</span> and
                <span className="text-purple-400"> DevOps practices</span>.
                Always eager to learn new technologies and tackle challenging
                problems with innovative solutions.
              </p>

              {/* Animated Stats */}
              <motion.div
                className="grid grid-cols-3 gap-6 mt-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, staggerChildren: 0.2 }}
                viewport={{ once: true }}
              >
                {[
                  { number: "5+", label: "Projects Completed" },
                  { number: "1+", label: "Years Experience" },
                  { number: "99%", label: "Client Satisfaction" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center p-4 rounded-3xl bg-gradient-to-br from-cyan-900/20 to-purple-900/20 border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-500"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    >
                      {stat.number}
                    </motion.div>
                    <div className="text-gray-400 text-sm mt-1">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Skills Section */}
      <section id="skills" className="relative py-20 px-4 max-w-6xl mx-auto">
        {/* Floating 3D Background Elements */}
        <div className="absolute inset-0 z-0 opacity-20">
          <Canvas camera={{ position: [0, 0, 8] }} dpr={[1, 2]}>
            <ambientLight intensity={0.4} />
            <pointLight
              position={[10, 10, 10]}
              intensity={0.6}
              color="#00ffff"
            />
            <pointLight
              position={[-10, -10, -10]}
              intensity={0.4}
              color="#ff00ff"
            />

            {/* Animated Geometric Shapes */}
            {[...Array(6)].map((_, i) => (
              <Float
                key={i}
                speed={0.5 + i * 0.2}
                rotationIntensity={0.3}
                floatIntensity={0.5}
              >
                <mesh position={[(i - 2.5) * 3, Math.sin(i) * 2, -5]}>
                  <dodecahedronGeometry args={[0.5]} />
                  <meshStandardMaterial
                    color={i % 2 === 0 ? "#00ffff" : "#ff00ff"}
                    transparent
                    opacity={0.3}
                    wireframe
                  />
                </mesh>
              </Float>
            ))}
            <Environment preset="night" />
          </Canvas>
        </div>

        <motion.div
          className="relative z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Technical Arsenal
            </motion.h2>
            <motion.div
              className="w-32 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto mb-8"
              initial={{ width: 0 }}
              whileInView={{ width: 128 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            />
            <motion.p
              className="text-xl text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Mastering cutting-edge technologies to build next-generation
              digital experiences
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, staggerChildren: 0.1 }}
            viewport={{ once: true }}
          >
            {skills.map((skillData, index) => (
              <motion.div
                key={index}
                className="relative flex flex-col items-center group cursor-pointer"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.1, y: -10 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 200,
                }}
                viewport={{ once: true }}
              >
                {/* Circular Progress Container */}
                <div className="relative w-24 h-24 mb-4">
                  {/* Background Circle */}
                  <svg
                    className="w-24 h-24 transform -rotate-90"
                    viewBox="0 0 100 100"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="3"
                      fill="transparent"
                    />

                    {/* Progress Circle */}
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke={skillData.color}
                      strokeWidth="3"
                      fill="transparent"
                      strokeLinecap="round"
                      strokeDasharray={283}
                      initial={{ strokeDashoffset: 283 }}
                      whileInView={{
                        strokeDashoffset:
                          283 - (skillData.proficiency / 100) * 283,
                      }}
                      whileHover={{
                        strokeDashoffset: 0,
                        transition: { duration: 2, ease: "easeInOut" },
                      }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      style={{
                        filter: `drop-shadow(0 0 8px ${skillData.color}40)`,
                      }}
                    />
                  </svg>

                  {/* Icon in Center */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="p-3 rounded-full backdrop-blur-sm"
                      style={{
                        backgroundColor: `${skillData.color}20`,
                        border: `1px solid ${skillData.color}40`,
                      }}
                      whileHover={{
                        rotate: 360,
                        scale: 1.2,
                        transition: { duration: 2, ease: "easeInOut" },
                      }}
                    >
                      <skillData.icon
                        size={24}
                        color={skillData.color}
                        className="drop-shadow-lg"
                      />
                    </motion.div>
                  </div>

                  {/* Proficiency Percentage */}
                  {/* <motion.div
                    className="absolute -top-2 -right-2 text-xs font-bold px-2 py-1 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100"
                    style={{
                      backgroundColor: `${skillData.color}20`,
                      color: skillData.color,
                      border: `1px solid ${skillData.color}40`,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {skillData.proficiency}%
                  </motion.div> */}
                </div>

                {/* Skill Name - Shows on Hover */}
                <motion.div
                  className="text-center opacity-70 group-hover:opacity-100"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3
                    className="text-sm font-semibold tracking-wide group-hover:text-white transition-colors duration-300"
                    style={{ color: skillData.color }}
                  >
                    {skillData.name}
                  </h3>
                </motion.div>

                {/* Glow Effect */}
                <div
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-40 pointer-events-none transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle, ${skillData.color}30 0%, transparent 70%)`,
                    filter: `blur(15px)`,
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Enhanced Projects Section with 3D Background */}
      <section id="projects" className="relative py-20 px-4 max-w-6xl mx-auto">
        {/* Advanced 3D Background */}
        <div className="absolute inset-0 z-0 opacity-30">
          <Canvas camera={{ position: [0, 0, 10] }} dpr={[1, 2]}>
            <ambientLight intensity={0.3} />
            <pointLight
              position={[15, 15, 15]}
              intensity={0.8}
              color="#00ffff"
            />
            <pointLight
              position={[-15, -15, -15]}
              intensity={0.6}
              color="#ff00ff"
            />

            {/* Morphing Central Structure */}
            <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
              <MorphingGeometry />
            </Float>

            {/* Orbiting Elements */}
            {[...Array(8)].map((_, i) => (
              <Float key={i} speed={0.3 + i * 0.1} rotationIntensity={0.4}>
                <mesh
                  position={[
                    Math.cos((i / 8) * Math.PI * 2) * 6,
                    Math.sin((i / 8) * Math.PI * 2) * 3,
                    Math.sin(i) * 2,
                  ]}
                >
                  <sphereGeometry args={[0.2]} />
                  <meshStandardMaterial
                    color={`hsl(${(i * 45) % 360}, 70%, 60%)`}
                    emissive={`hsl(${(i * 45) % 360}, 70%, 30%)`}
                    emissiveIntensity={0.3}
                  />
                </mesh>
              </Float>
            ))}

            <HolographicDisplay />
            <Environment preset="sunset" />
            <Sparkles
              count={200}
              scale={15}
              size={1}
              speed={0.3}
              color="#00ffff"
            />
          </Canvas>
        </div>

        <motion.div
          className="relative z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
              whileHover={{
                scale: 1.05,
                textShadow: "0 0 20px rgba(0, 255, 255, 0.5)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Featured Projects
            </motion.h2>
            <motion.div
              className="w-32 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto mb-8"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            />
            <motion.p
              className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Innovative solutions crafted with precision, creativity, and
              cutting-edge technology
            </motion.p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, staggerChildren: 0.2 }}
            viewport={{ once: true }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 100, rotateX: -20 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  rotateY: 5,
                  transition: { type: "spring", stiffness: 300, damping: 20 },
                }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 80,
                }}
                viewport={{ once: true }}
                style={{ perspective: 1000 }}
              >
                <ProjectCard {...project} index={index} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Enhanced Experience Section */}
      <section
        id="experience"
        className="relative py-20 px-4 max-w-6xl mx-auto"
      >
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              Experience
            </motion.h2>
            <motion.div
              className="w-32 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto"
              initial={{ width: 0 }}
              whileInView={{ width: 128 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            />
          </motion.div>

          <motion.div
            className="space-y-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, staggerChildren: 0.2 }}
            viewport={{ once: true }}
          >
            {[
              {
                title: "Software Developer Intern",
                company: "Tachyonsec Systems Pvt.Ltd",
                period: "2024 - Present",
                description:
                  "Developed full-stack applications using MERN stack, implemented RESTful APIs, and created responsive user interfaces with modern design principles.",
              },
            ].map((exp, index) => (
              <motion.div
                key={index}
                className="group relative p-8 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-cyan-500/20 hover:border-cyan-500/60 transition-all duration-500"
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-cyan-500/20 group-hover:via-purple-500/20 group-hover:to-pink-500/20 rounded-xl blur transition-all duration-500"></div>
                <div className="relative">
                  <motion.h3
                    className="text-2xl font-bold text-white mb-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    {exp.title}
                  </motion.h3>
                  <motion.div
                    className="flex justify-between items-center mb-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <span className="text-cyan-400 font-semibold">
                      {exp.company}
                    </span>
                    <span className="text-purple-400 text-sm">
                      {exp.period}
                    </span>
                  </motion.div>
                  <motion.p
                    className="text-gray-300 leading-relaxed"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    {exp.description}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Enhanced Contact Section */}
      <section
        id="contact"
        className="relative py-20 px-4 max-w-6xl mx-auto overflow-hidden bg-gray-900"
      >
        {/* Interactive Floating Icons Background */}
        <div className="absolute inset-0 z-0">
          {floatingIcons.map((item, index) => (
            <motion.div
              key={index}
              className="absolute cursor-pointer"
              style={{
                left: `${10 + (index % 4) * 20}%`,
                top: `${15 + Math.floor(index / 4) * 25}%`,
              }}
              initial={{
                opacity: 0,
                scale: 0,
                rotate: 0,
              }}
              animate={{
                opacity: [0.3, 0.7, 0.3],
                scale: [0.8, 1.2, 0.8],
                rotate: [0, 360],
                y: [-10, 10, -10],
                x: [-5, 5, -5],
              }}
              transition={{
                duration: 6 + index * 0.5,
                repeat: Infinity,
                delay: item.delay,
                ease: "easeInOut",
              }}
              whileHover={{
                scale: 1.8,
                opacity: 1,
                rotate: 180,
                transition: { duration: 0.3 },
              }}
              onMouseEnter={(e) => {
                (
                  e.target as HTMLElement
                ).style.filter = `drop-shadow(0 0 20px ${item.color})`;
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.filter = "none";
              }}
            >
              <item.Icon
                size={24}
                color={item.color}
                style={{
                  filter: "drop-shadow(0 0 10px currentColor)",
                }}
              />
            </motion.div>
          ))}

          {/* Floating Particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Mouse-following glow effect */}
          <motion.div
            className="absolute w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"
            animate={{
              x: mousePosition.x - 128,
              y: mousePosition.y - 128,
            }}
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 15,
            }}
          />
        </div>

        {/* Animated Background Gradient Orbs */}
        <div className="absolute inset-0 z-0">
          <motion.div
            className="absolute top-20 left-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"
            animate={{
              x: [0, -40, 0],
              y: [0, 40, 0],
              scale: [1, 0.8, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 w-48 h-48 bg-yellow-500/5 rounded-full blur-2xl"
            animate={{
              x: [-100, 100, -100],
              y: [-50, 50, -50],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Additional floating gradient elements */}
          <motion.div
            className="absolute top-32 right-32 w-32 h-32 bg-emerald-500/8 rounded-full blur-2xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute bottom-32 left-32 w-40 h-40 bg-pink-500/6 rounded-full blur-3xl"
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
              scale: [0.8, 1.1, 0.8],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <motion.div
          className="relative z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05, rotateY: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Let's Connect
            </motion.h2>
            <motion.div
              className="w-32 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto mb-8"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            />
            <motion.p
              className="text-xl text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Ready to bring your ideas to life? Let's create something
              extraordinary together.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, staggerChildren: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {[
                {
                  Icon: Mail,
                  title: "Email",
                  value: "mvsaketh2020@gmail.com",
                  link: "mailto:mvsaketh2020@gmail.com",
                  color: "#00ffff",
                },
                {
                  Icon: Phone,
                  title: "Phone",
                  value: "+91 7013230003",
                  link: "tel:+917013230003",
                  color: "#ff00ff",
                },
                {
                  Icon: Github,
                  title: "GitHub",
                  value: "github.com/mudduvenkata",
                  link: "https://github.com/mudduvenkata",
                  color: "#ffff00",
                },
                {
                  Icon: Linkedin,
                  title: "LinkedIn",
                  value: "linkedin.com/in/mudduvenkata",
                  link: "https://linkedin.com/in/mudduvenkata",
                  color: "#00ff00",
                },
              ].map((contact, index) => (
                <motion.a
                  key={index}
                  href={contact.link}
                  className="group relative flex items-center space-x-4 p-6 bg-gray-900/40 rounded-2xl border border-cyan-500/20 hover:border-cyan-500/60 transition-all duration-500 overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{
                    scale: 1.05,
                    x: 10,
                    backgroundColor: "rgba(0, 255, 255, 0.08)",
                    boxShadow: `0 10px 40px ${contact.color}20`,
                  }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {/* Animated Background Glow */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-20"
                    style={{
                      background: `radial-gradient(circle at center, ${contact.color}40 0%, transparent 70%)`,
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Sliding Border Effect */}
                  <motion.div
                    className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b opacity-0 group-hover:opacity-100"
                    style={{
                      background: `linear-gradient(180deg, ${contact.color}, transparent)`,
                    }}
                    initial={{ height: 0 }}
                    whileHover={{ height: "100%" }}
                    transition={{ duration: 0.5 }}
                  />

                  <motion.div
                    className="relative z-10"
                    whileHover={{
                      scale: 1.3,
                      rotate: 15,
                      filter: `drop-shadow(0 0 10px ${contact.color})`,
                    }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <contact.Icon size={28} color={contact.color} />
                  </motion.div>

                  <div className="relative z-10 flex-1">
                    <motion.div
                      className="font-semibold mb-1"
                      style={{ color: contact.color }}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {contact.title}
                    </motion.div>
                    <motion.div
                      className="text-gray-300 group-hover:text-white transition-colors duration-300"
                      whileHover={{ x: 8 }}
                      transition={{ duration: 0.2, delay: 0.1 }}
                    >
                      {contact.value}
                    </motion.div>
                  </div>

                  {/* Hover Particles Effect */}
                  <motion.div
                    className="absolute top-1/2 right-4 w-2 h-2 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100"
                    animate={{
                      scale: [0, 1, 0],
                      x: [0, 20, 40],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                  />
                </motion.a>
              ))}
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {/* Enhanced Glowing Border */}
              {/* <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-xl blur opacity-40"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              /> */}

              <div className="relative bg-gray-900/80 backdrop-blur-md p-8 rounded-xl border border-cyan-500/30 overflow-hidden">
                {/* Form Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `radial-gradient(circle at 25% 25%, #00ffff 2px, transparent 2px),
                             radial-gradient(circle at 75% 75%, #ff00ff 1px, transparent 1px)`,
                      backgroundSize: "50px 50px",
                    }}
                  />
                </div>

                <motion.h3
                  className="relative text-2xl font-bold text-white mb-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Send a Message
                </motion.h3>

                <motion.form
                  className="relative space-y-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, staggerChildren: 0.1 }}
                  viewport={{ once: true }}
                >
                  {["Name", "Email", "Message"].map((field, index) => (
                    <motion.div
                      key={field}
                      className="relative"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {field === "Message" ? (
                        <motion.textarea
                          placeholder={field}
                          className="w-full p-4 bg-gray-800/60 border border-cyan-500/30 rounded-xl text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all duration-300 resize-none"
                          whileFocus={{
                            scale: 1.02,
                            boxShadow: "0 0 20px rgba(0, 255, 255, 0.3)",
                          }}
                          transition={{ type: "spring", stiffness: 300 }}
                          rows={5}
                        />
                      ) : (
                        <motion.input
                          type={field === "Email" ? "email" : "text"}
                          placeholder={field}
                          className="w-full p-4 bg-gray-800/60 border border-cyan-500/30 rounded-xl text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all duration-300"
                          whileFocus={{
                            scale: 1.02,
                            boxShadow: "0 0 20px rgba(0, 255, 255, 0.3)",
                          }}
                          transition={{ type: "spring", stiffness: 300 }}
                        />
                      )}

                      {/* Input Focus Glow Effect */}
                      <motion.div
                        className="absolute inset-0 rounded-xl pointer-events-none"
                        style={{
                          background:
                            "linear-gradient(45deg, transparent, rgba(0, 255, 255, 0.1), transparent)",
                          opacity: 0,
                        }}
                        whileFocus={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                  ))}

                  <motion.button
                    type="submit"
                    className="relative w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-2xl font-semibold transition-all duration-300 hover:from-cyan-600 hover:to-purple-600 overflow-hidden group"
                    whileHover={{
                      scale: 1.05,
                      y: -2,
                      boxShadow: "0 10px 30px rgba(0, 255, 255, 0.4)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                  >
                    {/* Button Shimmer Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:animate-shimmer"
                      style={{ transform: "translateX(-100%)" }}
                      animate={{
                        x: ["-100%", "100%"],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        repeatDelay: 1,
                      }}
                    />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <Send size={20} />
                      Send Message
                    </span>
                  </motion.button>
                </motion.form>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Enhanced Footer */}
      <motion.footer
        className="relative bg-gray-900/50 backdrop-blur-sm border-t border-cyan-500/20 py-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
              MVS
            </div>
            <p className="text-gray-400 max-w-md mx-auto">
              Crafting digital experiences that push the boundaries of what's
              possible
            </p>
          </motion.div>

          <motion.div
            className="flex justify-center space-x-6 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, staggerChildren: 0.1 }}
            viewport={{ once: true }}
          >
            {[
              { name: "GitHub", url: "https://github.com/mudduvenkata" },
              { name: "LinkedIn", url: "https://linkedin.com/in/mudduvenkata" },
              { name: "Twitter", url: "https://twitter.com/mudduvenkata" },
              { name: "Instagram", url: "https://instagram.com/mudduvenkata" },
            ].map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 interactive"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.2, y: -5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {social.name}
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            className="border-t border-cyan-500/20 pt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-500 text-sm">
              © 2024 Muddu Venkata Saketh. All rights reserved.
            </p>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
}
