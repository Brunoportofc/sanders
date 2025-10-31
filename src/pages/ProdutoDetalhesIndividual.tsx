import { useRef, useEffect, Suspense, useState } from "react";
import { useParams } from "react-router-dom";
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';
import { motion, useInView } from 'framer-motion';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getProdutoById } from "@/data/produtos";

// PASSO 1: Componente do Modelo 3D com Animações
function Termodesinfectora({ modelPath }: { modelPath: string }) {
  const group = useRef<THREE.Group>(null!);
  const { scene, animations } = useGLTF(modelPath);
  const { actions, names } = useAnimations(animations, group);
  const initializedRef = useRef(false);

  // Centraliza e escala o modelo
  useEffect(() => {
    if (!group.current || initializedRef.current) return;

    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 3.5 / maxDim;
    group.current.scale.setScalar(scale);
    group.current.position.copy(center).multiplyScalar(-scale);
    
    initializedRef.current = true;
  }, [scene]);

  // Log das animações disponíveis
  useEffect(() => {
    if (names && names.length > 0) {
      console.log('🎬 Animações disponíveis:', names);
      names.forEach((name, index) => {
        console.log(`   ${index + 1}. "${name}"`);
      });
    }
  }, [names]);
  
  return (
    <group ref={group}>
      <primitive object={scene} />
    </group>
  );
}

// PASSO 3: Controlador da Cena (Sincroniza Scroll da PÁGINA com Animações)
function SceneController({ modelPath, scrollProgress }: { modelPath: string; scrollProgress: number }) {
  const group = useRef<THREE.Group>(null!);
  const { scene, animations } = useGLTF(modelPath);
  const { actions, names } = useAnimations(animations, group);
  const initializedRef = useRef(false);
  const lastPageRef = useRef(-1);

  // Centraliza e escala o modelo (MENOR para dar espaço aos textos)
  useEffect(() => {
    if (!group.current || initializedRef.current) return;

    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 2.2 / maxDim; // Reduzido de 3.5 para 2.2
    group.current.scale.setScalar(scale);
    
    // Posiciona o modelo mais abaixo (ajusta Y para -1.5)
    const adjustedCenter = center.clone().multiplyScalar(-scale);
    adjustedCenter.y -= 0.5; // Move o modelo para baixo
    group.current.position.copy(adjustedCenter);
    
    initializedRef.current = true;
  }, [scene]);

  // Sincroniza scroll da PÁGINA com animações
  useEffect(() => {
    if (!actions || !names || names.length === 0) return;

    // Divide em 4 páginas: 0-0.25, 0.25-0.5, 0.5-0.75, 0.75-1.0
    let currentPage = -1;
    if (scrollProgress < 0.25) currentPage = 0;
    else if (scrollProgress < 0.5) currentPage = 1;
    else if (scrollProgress < 0.75) currentPage = 2;
    else currentPage = 3;

    // Se mudou de página, dispara a animação correspondente
    if (currentPage !== lastPageRef.current && currentPage > 0 && currentPage <= names.length) {
      // Para todas as animações
      Object.values(actions).forEach(action => {
        if (action) action.reset().stop();
      });

      // Inicia a animação da página atual
      const animationName = names[currentPage - 1];
      if (actions[animationName]) {
        actions[animationName].reset().play();
        console.log(`🎬 Página ${currentPage}: Tocando "${animationName}"`);
      }

      lastPageRef.current = currentPage;
    }
  }, [scrollProgress, actions, names]);

  // Mantém a máquina sempre de lado (rotação fixa)
  useFrame(() => {
    if (group.current) {
      // Rotação fixa para manter a máquina de lado (90 graus)
      group.current.rotation.y = Math.PI * 0.5; // 90 graus = lado para a tela
    }
  });

  return (
    <group ref={group}>
      <primitive object={scene} />
    </group>
  );
}

// PASSO 4: Componente de Texto Animado com Intersection Observer
function FadeInText({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: false, 
    amount: 0.3,
    margin: "-100px"
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      style={{ position: 'relative' }}
    >
      {children}
    </motion.div>
  );
}

// Componente de Texto Simples (sem fade)
function SimpleText({ 
  title, 
  description 
}: { 
  title: string; 
  description: string;
}) {
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <h2 
        style={{ 
          fontSize: '2.5rem', 
          fontWeight: 'bold',
          color: '#1f2937',
          marginBottom: '1.5rem',
          lineHeight: '1.2'
        }}
      >
        {title}
      </h2>
      <p 
        style={{ 
          fontSize: '1.125rem', 
          color: '#6b7280', 
          lineHeight: '1.8',
          fontWeight: 400,
          marginBottom: '1rem'
        }}
      >
        {description}
      </p>
    </div>
  );
}

const ProdutoDetalhesIndividual = () => {
  const { id } = useParams<{ id: string }>();
  const produto = id ? getProdutoById(id) : null;
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);

  // Listener de scroll da página
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(Math.max(scrollTop / docHeight, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Inicializa

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer para detectar qual seção está visível
  useEffect(() => {
    const sections = document.querySelectorAll('[data-section]');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionIndex = parseInt(entry.target.getAttribute('data-section') || '0');
            setCurrentSection(sectionIndex);
          }
        });
      },
      {
        threshold: 0.3, // Dispara quando 30% da seção está visível
        rootMargin: '-20% 0px -20% 0px' // Margem para disparar mais cedo
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  if (!produto) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Produto não encontrado</h1>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white relative">
        <Header />
      
      {/* Canvas 3D fixo de fundo */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0 }}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          gl={{ alpha: true, antialias: true }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.8} />
          <directionalLight position={[10, 10, 5]} intensity={2} />
          <directionalLight position={[-10, 5, -5]} intensity={1} />
          <directionalLight position={[0, -5, 0]} intensity={0.5} />
          <spotLight position={[15, 15, 15]} angle={0.3} penumbra={1} intensity={1.5} castShadow />
          
          <Suspense fallback={null}>
            <SceneController 
              modelPath="/Termodesinfectora WDS-380SD.glb" 
              scrollProgress={scrollProgress}
            />
          </Suspense>
        </Canvas>
        </div>

      {/* Card fixo à DIREITA INFERIOR - muda conforme o scroll */}
      <motion.div 
        style={{
          position: 'fixed',
          right: '4rem',
          bottom: '4rem',
          zIndex: 10,
          width: '400px'
        }}
      >
        <motion.div
          key={currentSection}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
            borderRadius: '24px',
            padding: '2rem',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05)',
            border: '2px solid rgba(59, 130, 246, 0.1)'
          }}
        >
          {currentSection === 0 && (
            <>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>
                Bem-vindo
              </h3>
              <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                Explore as funcionalidades avançadas da Termodesinfectora WDS-380SD através de uma experiência interativa.
              </p>
            </>
          )}
          {currentSection === 1 && (
            <>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>
                🚪 Abertura Automática
              </h3>
              <ul style={{ color: '#6b7280', lineHeight: '1.8', paddingLeft: '1.5rem' }}>
                <li>Sistema pneumático de alta precisão</li>
                <li>Sensores de segurança integrados</li>
                <li>Abertura suave em 2 segundos</li>
                <li>Fechamento hermético garantido</li>
              </ul>
            </>
          )}
          {currentSection === 2 && (
            <>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>
                📱 Painel Digital
              </h3>
              <ul style={{ color: '#6b7280', lineHeight: '1.8', paddingLeft: '1.5rem' }}>
                <li>Tela touchscreen 7 polegadas</li>
                <li>Interface intuitiva em português</li>
                <li>Programação de até 10 ciclos</li>
                <li>Histórico de processos</li>
              </ul>
            </>
          )}
          {currentSection === 3 && (
            <>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>
                ♻️ Ciclo Completo
              </h3>
              <ul style={{ color: '#6b7280', lineHeight: '1.8', paddingLeft: '1.5rem' }}>
                <li>Temperatura: 90-95°C</li>
                <li>Tempo: 15-30 minutos</li>
                <li>Eficácia: 99,9% eliminação</li>
                <li>Certificação: ANVISA e ISO</li>
              </ul>
            </>
          )}
          {currentSection === 4 && (
            <>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>
                ⚡ Eficiência Energética
              </h3>
              <ul style={{ color: '#6b7280', lineHeight: '1.8', paddingLeft: '1.5rem' }}>
                <li>Economia de até 30% de energia</li>
                <li>Isolamento térmico premium</li>
                <li>Modo eco inteligente</li>
                <li>Aquecimento otimizado</li>
              </ul>
            </>
          )}
          {currentSection === 5 && (
            <>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>
                📦 Capacidade
              </h3>
              <ul style={{ color: '#6b7280', lineHeight: '1.8', paddingLeft: '1.5rem' }}>
                <li>Câmara de 60 litros</li>
                <li>Prateleiras ajustáveis</li>
                <li>Design inteligente</li>
                <li>Drenagem automática</li>
              </ul>
            </>
          )}
        </motion.div>
            </motion.div>

      {/* Conteúdo HTML que rola - textos à ESQUERDA */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Página 1: Título no topo, máquina abaixo */}
        <div 
          data-section="0"
          style={{ 
            height: '100vh', 
            display: 'flex', 
            flexDirection: 'column',
            padding: '0 2rem',
            textAlign: 'center'
          }}>
          {/* Texto no topo */}
          <div style={{ 
            paddingTop: '8rem',
            marginBottom: '2rem'
          }}>
            <FadeInText delay={0}>
              <motion.h1 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                style={{ 
                  fontSize: '4rem', 
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #1f2937 0%, #3b82f6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '1rem',
                  letterSpacing: '-0.02em'
                }}
              >
                Termodesinfectora WDS-380SD
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                style={{ 
                  fontSize: '1.5rem', 
                  color: '#6b7280',
                  fontWeight: 300
                }}
              >
                Role para explorar suas funcionalidades
              </motion.p>
            </FadeInText>
            </div>
          
          {/* Espaço para a máquina (abaixo do texto) */}
          <div style={{ flex: 1 }} />
        
          {/* Ícone de scroll no final - desaparece ao rolar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: scrollProgress > 0.05 ? 0 : 1 
            }}
            transition={{ duration: 0.3 }}
            style={{ paddingBottom: '3rem' }}
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="#3b82f6"
              strokeWidth="2"
              style={{ animation: 'bounce 2s infinite', margin: '0 auto' }}
            >
              <path d="M12 5v14M19 12l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        </div>

        {/* Página 2: Texto à ESQUERDA */}
        <div 
          data-section="1"
          style={{ 
            height: '100vh', 
            display: 'flex', 
            alignItems: 'center',
            padding: '0 2rem',
            paddingLeft: '4rem'
          }}>
          <div style={{ maxWidth: '500px', textAlign: 'left' }}>
            <SimpleText
              title="Sistema de Abertura Automática"
              description="Portas com abertura e fechamento automatizados, garantindo segurança e praticidade no manuseio de instrumentos hospitalares. O sistema pneumático de alta precisão garante movimentos suaves e seguros."
            />
            <p style={{ fontSize: '1rem', color: '#9ca3af', marginTop: '1rem', lineHeight: '1.6' }}>
              Equipado com sensores de segurança que impedem o fechamento caso haja obstrução, protegendo tanto os instrumentos quanto os operadores.
            </p>
          </div>
        </div>

        {/* Página 3: Texto à ESQUERDA */}
        <div 
          data-section="2"
          style={{ 
            height: '100vh', 
            display: 'flex', 
            alignItems: 'center',
            padding: '0 2rem',
            paddingLeft: '4rem'
          }}>
          <div style={{ maxWidth: '500px', textAlign: 'left' }}>
            <SimpleText
              title="Painel Digital Intuitivo"
              description="Interface touchscreen de última geração para controle preciso de temperatura, tempo e ciclos de desinfecção. Tela de 7 polegadas com interface em português facilita a operação."
            />
            <p style={{ fontSize: '1rem', color: '#9ca3af', marginTop: '1rem', lineHeight: '1.6' }}>
              Programação de até 10 ciclos personalizados com histórico completo de todos os processos realizados, garantindo rastreabilidade total.
            </p>
          </div>
        </div>

        {/* Página 4: Texto à ESQUERDA */}
        <div 
          data-section="3"
          style={{ 
            height: '100vh', 
            display: 'flex', 
            alignItems: 'center',
            padding: '0 2rem',
            paddingLeft: '4rem'
          }}>
          <div style={{ maxWidth: '500px', textAlign: 'left' }}>
            <SimpleText
              title="Ciclo Completo de Desinfecção"
              description="Processo automatizado que garante a eliminação de 99,9% dos microrganismos, seguindo os mais rigorosos padrões hospitalares. Temperatura controlada entre 90-95°C."
            />
            <p style={{ fontSize: '1rem', color: '#9ca3af', marginTop: '1rem', lineHeight: '1.6' }}>
              Certificado pela ANVISA e em conformidade com normas ISO internacionais. Ciclos de 15 a 30 minutos com eficiência comprovada em testes laboratoriais.
            </p>
          </div>
        </div>

        {/* Página 5: Texto adicional */}
        <div 
          data-section="4"
          style={{ 
            height: '100vh', 
            display: 'flex', 
            alignItems: 'center',
            padding: '0 2rem',
            paddingLeft: '4rem'
          }}>
          <div style={{ maxWidth: '500px', textAlign: 'left' }}>
            <SimpleText
              title="Eficiência Energética"
              description="Sistema de aquecimento otimizado que reduz o consumo de energia em até 30% comparado a modelos convencionais. Isolamento térmico de alta performance."
            />
            <p style={{ fontSize: '1rem', color: '#9ca3af', marginTop: '1rem', lineHeight: '1.6' }}>
              Modo eco que ajusta automaticamente a potência conforme a carga, resultando em economia significativa na conta de energia.
            </p>
          </div>
        </div>

        {/* Página 6: Texto adicional */}
        <div 
          data-section="5"
          style={{ 
            height: '100vh', 
            display: 'flex', 
            alignItems: 'center',
            padding: '0 2rem',
            paddingLeft: '4rem'
          }}>
          <div style={{ maxWidth: '500px', textAlign: 'left' }}>
            <SimpleText
              title="Capacidade e Versatilidade"
              description="Câmara interna de 60 litros com prateleiras ajustáveis que acomodam diversos tipos de instrumentos. Design inteligente maximiza o espaço útil."
            />
            <p style={{ fontSize: '1rem', color: '#9ca3af', marginTop: '1rem', lineHeight: '1.6' }}>
              Compatível com instrumentos cirúrgicos, odontológicos e laboratoriais. Sistema de drenagem automática facilita a manutenção.
            </p>
          </div>
        </div>
      </div>

      {/* Footer no final */}
      <div style={{ position: 'relative', zIndex: 1 }}>
      <Footer />
      </div>
    </div>
  );
};

export default ProdutoDetalhesIndividual;
