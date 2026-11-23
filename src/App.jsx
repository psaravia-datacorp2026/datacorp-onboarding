import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Layout from './components/Layout';
import LoginView from './components/LoginView';
import PathView from './components/PathView';
import Stage1View from './components/Stage1View';
import Stage2View from './components/Stage2View';
import Stage3View from './components/Stage3View';
import Stage4View from './components/Stage4View';
import { useOnboardingStore } from './store/useOnboardingStore';

export default function App() {
  const activeParticipantId = useOnboardingStore(
    (state) => state.activeParticipantId
  );
  const [activeStageId, setActiveStageId] = useState(null);

  useEffect(() => {
    setActiveStageId(null);
  }, [activeParticipantId]);

  return (
    <Layout>
      <AnimatePresence mode="wait">
        {!activeParticipantId ? (
          <motion.div
            key="login-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="flex flex-1 flex-col"
          >
            <LoginView />
          </motion.div>
        ) : activeStageId === 1 ? (
          <motion.div
            key="stage1-view"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="flex flex-1 flex-col"
          >
            <Stage1View onBackToPath={() => setActiveStageId(null)} />
          </motion.div>
        ) : activeStageId === 2 ? (
          <motion.div
            key="stage2-view"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="flex flex-1 flex-col"
          >
            <Stage2View onBackToPath={() => setActiveStageId(null)} />
          </motion.div>
        ) : activeStageId === 3 ? (
          <motion.div
            key="stage3-view"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="flex flex-1 flex-col"
          >
            <Stage3View onBackToPath={() => setActiveStageId(null)} />
          </motion.div>
        ) : activeStageId === 4 ? (
          <motion.div
            key="stage4-view"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="flex flex-1 flex-col"
          >
            <Stage4View onBackToPath={() => setActiveStageId(null)} />
          </motion.div>
        ) : (
          <motion.div
            key="path-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-1 flex-col"
          >
            <PathView onOpenStage={(id) => setActiveStageId(id)} />
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
