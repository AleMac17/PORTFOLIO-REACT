"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaHtml5, FaCss3Alt, FaBootstrap, FaAws, FaJava, FaNodeJs, FaReact, 
  FaGitAlt, FaGithub, FaLinux, FaWindows
} from "react-icons/fa";
import {
  SiTailwindcss, SiJavascript, SiSpringboot, SiMongodb, SiBitbucket, SiScrumalliance
} from "react-icons/si";
import { TbBrandMysql, TbApi } from "react-icons/tb";
import { MdViewKanban } from "react-icons/md";

const skills = [
  { name: "HTML", icon: <FaHtml5 /> },
  { name: "CSS", icon: <FaCss3Alt /> },
  { name: "Bootstrap", icon: <FaBootstrap /> },
  { name: "Tailwind", icon: <SiTailwindcss /> },
  { name: "JavaScript", icon: <SiJavascript /> },
  { name: "React.js", icon: <FaReact /> },
  { name: "Node.js", icon: <FaNodeJs /> },
  { name: "Spring Boot", icon: <SiSpringboot /> },
  { name: "Java", icon: <FaJava /> },
  { name: "SQL", icon: <TbBrandMysql /> },
  { name: "MongoDB", icon: <SiMongodb /> },
  { name: "AWS", icon: <FaAws /> },
  { name: "Git", icon: <FaGitAlt /> },
  { name: "GitHub", icon: <FaGithub /> },
  { name: "Bitbucket", icon: <SiBitbucket /> },
  { name: "Windows", icon: <FaWindows /> },
  { name: "Linux", icon: <FaLinux /> },
  { name: "Scrum", icon: <SiScrumalliance /> },
  { name: "Kanban", icon: <MdViewKanban /> },
  { name: "API RESTful", icon: <TbApi /> },
];

export default function Skills() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3, 
  });

  return (
    <motion.section
      id="skills"
      ref={ref}
      className="min-h-screen w-full flex flex-col items-center justify-center px-6 sm:px-16 relative"
      initial={{ backgroundColor: "#111827" }}
      animate={inView ? { backgroundColor: "#1E293B" } : { backgroundColor: "#111827" }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="max-w-4xl text-center"
      >
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-4xl sm:text-5xl font-bold tracking-tight text-primary-500 mb-8"
          style={{ textShadow: "0px 0px 10px rgba(255, 255, 255, 0.2)" }}
        >
          Skills & Technologies
        </motion.h2>

        <motion.div 
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
          className="grid grid-cols-3 sm:grid-cols-5 gap-6"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              variants={{
                hidden: { opacity: 0, scale: 0.8, y: 20 },
                visible: { opacity: 1, scale: 1, y: 0 },
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              whileHover={{
                scale: 1.2,
                transition: { duration: 0.3 },
                filter: "drop-shadow(0px 0px 6px rgba(255, 255, 255, 0.4))",
              }}
              className="flex flex-col items-center"
            >
              <div className="text-3xl text-gray-500 transition-colors duration-300 hover:text-white">
                {skill.icon}
              </div>
              <p className="mt-2 text-sm font-medium text-gray-400">{skill.name}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
