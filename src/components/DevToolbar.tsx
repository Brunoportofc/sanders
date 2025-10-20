import { useEffect, useState } from 'react';

export const DevToolbar = () => {
  const [ToolbarComponent, setToolbarComponent] = useState<any>(null);

  useEffect(() => {
    // Só carrega em modo desenvolvimento
    if (!import.meta.env.DEV) {
      return;
    }

    // Carrega a toolbar dinamicamente
    const loadToolbar = async () => {
      try {
        const [toolbarModule, reactModule] = await Promise.all([
          import('@21st-extension/toolbar-react'),
          import('@21st-extension/react')
        ]);

        const { TwentyFirstToolbar } = toolbarModule;
        const { ReactPlugin } = reactModule;

        // Cria um componente wrapper
        setToolbarComponent(() => () => (
          <TwentyFirstToolbar config={{ plugins: [ReactPlugin] }} />
        ));
      } catch (error) {
        console.warn('21st.dev Toolbar não disponível:', error);
      }
    };

    loadToolbar();
  }, []);

  if (!ToolbarComponent) {
    return null;
  }

  return <ToolbarComponent />;
};
