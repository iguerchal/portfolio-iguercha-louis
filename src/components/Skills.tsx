import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { Badge } from './ui/badge';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Frontend',
      skills: [
        { name: 'React', level: 95 },
        { name: 'TypeScript', level: 90 },
        { name: 'Next.js', level: 88 },
        { name: 'Vue.js', level: 75 },
        { name: 'Tailwind CSS', level: 92 },
        { name: 'Framer Motion', level: 85 },
        { name: 'Vite', level: 88 }
      ]
    },
    {
      title: 'Backend',
      skills: [
        { name: 'Node.js', level: 87 },
        { name: 'Express', level: 85 },
        { name: 'GraphQL', level: 80 },
        { name: 'Python', level: 75 },
        { name: 'Java', level: 72 },
        { name: 'PostgreSQL', level: 82 },
        { name: 'MongoDB', level: 88 }
      ]
    },
    {
      title: 'Outils & autres',
      skills: [
        { name: 'Git', level: 90 },
        { name: 'GitHub Pages', level: 85 },
        { name: 'Docker', level: 78 },
        { name: 'AWS', level: 75 },
        { name: 'Figma', level: 85 },
        { name: 'Adobe Creative Suite', level: 80 },
        { name: 'Three.js', level: 70 }
      ]
    }
  ];

  const allSkills = skillCategories.flatMap(category => category.skills);

  const getSkillId = (name: string) => `skill-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

  // Build constellation from all skills with deterministic polar layout (rings + angles)
  const constellation = useMemo(() => {
    const nodes = allSkills.map((s, index) => {
      // Spread on 3 rings for density
      const ring = index % 3; // 0,1,2
      const radius = 28 + ring * 12; // percentages from center
      const angle = (index / allSkills.length) * Math.PI * 2;
      const cx = 50 + radius * Math.cos(angle) * 0.9; // clamp a bit
      const cy = 50 + radius * Math.sin(angle) * 0.7;
      const size = Math.max(8, Math.round((s.level / 100) * 14));
      return {
        name: s.name,
        level: s.level,
        x: Math.max(6, Math.min(94, cx)),
        y: Math.max(6, Math.min(94, cy)),
        size,
      };
    });

    const edges: Array<[number, number]> = [];
    // Connect sequential nodes and every 5th to create constellation graph
    for (let i = 0; i < nodes.length; i++) {
      edges.push([i, (i + 1) % nodes.length]);
      edges.push([i, (i + 5) % nodes.length]);
    }
    return { nodes, edges };
  }, [allSkills]);

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
            Compétences & Expertise
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Une boîte à outils complète de technologies modernes et de compétences créatives
          </p>
        </motion.div>

        {/* Skills Cloud */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
            {allSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ scale: 1.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Badge
                  className="glass-morphism px-6 py-3 text-lg cursor-pointer relative overflow-hidden transition-all duration-300 hover:neon-glow-sm"
                  variant="secondary"
                  id={getSkillId(skill.name)}
                >
                  <span className="relative z-10">{skill.name}</span>
                  
                  {/* Animated background on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '0%' }}
                    transition={{ duration: 0.3 }}
                  />
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>
        {/* Constellation supprimée (unifiée désormais dans About) */}
      </div>
    </section>
  );
};

export default Skills;