import { useCallback } from 'react';
import { useChatContext } from '@/contexts/ChatContext';
import { 
  ChatStep, 
  BOT_MESSAGES, 
  PRODUCT_OPTIONS, 
  SOURCE_OPTIONS, 
  CUSTOMER_TYPE_OPTIONS,
  VALIDATION_PATTERNS,
  UserData
} from '@/types/chat';
import { gtmService } from '@/services/gtm';

export const useChatFlow = () => {
  const { chatState, addMessage, updateUserData, nextStep, setChatState } = useChatContext();

  const addBotMessage = useCallback((content: string, options?: any[]) => {
    // Simular digitação
    setChatState(prev => ({ ...prev, isTyping: true }));
    
    setTimeout(() => {
      addMessage({
        type: 'bot',
        content,
        options
      });
      setChatState(prev => ({ ...prev, isTyping: false }));
    }, 1500); // Simula tempo de digitação
  }, [addMessage, setChatState]);

  const addUserMessage = useCallback((content: string) => {
    addMessage({
      type: 'user',
      content
    });
  }, [addMessage]);

  const validateInput = useCallback((input: string, field: keyof UserData): boolean => {
    switch (field) {
      case 'email':
        return VALIDATION_PATTERNS.email.test(input);
      case 'phone':
        return VALIDATION_PATTERNS.phone.test(input.replace(/\D/g, '').replace(/^(\d{2})(\d{4,5})(\d{4})$/, '($1) $2-$3'));
      case 'document':
        return VALIDATION_PATTERNS.cpf.test(input) || VALIDATION_PATTERNS.cnpj.test(input);
      case 'name':
        return input.trim().length >= 2;
      default:
        return true;
    }
  }, []);

  const formatPhone = useCallback((phone: string): string => {
    const numbers = phone.replace(/\D/g, '');
    if (numbers.length === 11) {
      return numbers.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    } else if (numbers.length === 10) {
      return numbers.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
    }
    return phone;
  }, []);

  const formatDocument = useCallback((doc: string): string => {
    const numbers = doc.replace(/\D/g, '');
    if (numbers.length === 11) {
      // CPF
      return numbers.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
    } else if (numbers.length === 14) {
      // CNPJ
      return numbers.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
    }
    return doc;
  }, []);

  const processUserInput = useCallback((input: string) => {
    const currentStep = chatState.currentStep;
    
    // Incrementar contador de mensagens no GTM
    gtmService.incrementMessageCount();
    
    switch (currentStep) {
      case 'welcome':
        if (input.toLowerCase().includes('sim') || input.toLowerCase().includes('quero')) {
          addUserMessage(input);
          setTimeout(() => {
            addBotMessage(BOT_MESSAGES.interest_confirmation);
            setTimeout(() => {
              addBotMessage(BOT_MESSAGES.name_request);
              nextStep('name_collection');
            }, 2000);
          }, 500);
        }
        break;

      case 'name_collection':
        if (validateInput(input, 'name')) {
          addUserMessage(input);
          updateUserData({ name: input.trim() });
          // Rastrear etapa completada no GTM
          gtmService.trackStepCompleted(
            1,
            'name',
            input.trim(),
            7, // total de etapas
            'floating_chat'
          );
          setTimeout(() => {
            addBotMessage(BOT_MESSAGES.name_greeting(input.trim()));
            nextStep('email_collection');
          }, 1000);
        } else {
          addBotMessage('Por favor, digite um nome válido.');
        }
        break;

      case 'email_collection':
        if (validateInput(input, 'email')) {
          addUserMessage(input);
          updateUserData({ email: input.trim() });
          // Rastrear etapa completada no GTM
          gtmService.trackStepCompleted(
            2,
            'email',
            input.trim(),
            7, // total de etapas
            'floating_chat'
          );
          setTimeout(() => {
            addBotMessage(BOT_MESSAGES.phone_request);
            nextStep('phone_collection');
          }, 1000);
        } else {
          addBotMessage('Por favor, digite um e-mail válido.');
        }
        break;

      case 'phone_collection':
        const formattedPhone = formatPhone(input);
        if (validateInput(formattedPhone, 'phone')) {
          addUserMessage(formattedPhone);
          updateUserData({ phone: formattedPhone });
          // Rastrear etapa completada no GTM
          gtmService.trackStepCompleted(
            3,
            'phone',
            formattedPhone,
            7, // total de etapas
            'floating_chat'
          );
          setTimeout(() => {
            addBotMessage(BOT_MESSAGES.document_request);
            nextStep('document_collection');
          }, 1000);
        } else {
          addBotMessage('Por favor, digite um telefone válido. Ex: (11) 99999-9999');
        }
        break;

      case 'document_collection':
        const formattedDoc = formatDocument(input);
        if (validateInput(formattedDoc, 'document')) {
          addUserMessage(formattedDoc);
          updateUserData({ document: formattedDoc });
          // Rastrear etapa completada no GTM
          gtmService.trackStepCompleted(
            4,
            'document',
            formattedDoc,
            7, // total de etapas
            'floating_chat'
          );
          setTimeout(() => {
            addBotMessage(BOT_MESSAGES.product_selection, PRODUCT_OPTIONS);
            nextStep('product_selection');
          }, 1000);
        } else {
          addBotMessage('Por favor, digite um CPF ou CNPJ válido.');
        }
        break;

      case 'product_selection':
        // Processar seleção múltipla de produtos
        const selectedProducts = input.split(',').map(p => p.trim());
        addUserMessage(selectedProducts.join(', '));
        updateUserData({ products: selectedProducts });
        // Rastrear seleção de produtos no GTM
        selectedProducts.forEach(product => {
          gtmService.trackProductSelected(
            product,
            'equipamento_medico',
            product.toLowerCase().replace(/\s+/g, '_'),
            'floating_chat'
          );
        });
        // Rastrear etapa completada no GTM
        gtmService.trackStepCompleted(
          5,
          'products',
          selectedProducts.join(', '),
          7, // total de etapas
          'floating_chat'
        );
        setTimeout(() => {
          addBotMessage(BOT_MESSAGES.source_selection, SOURCE_OPTIONS);
          nextStep('source_selection');
        }, 1000);
        break;

      case 'source_selection':
        addUserMessage(input);
        updateUserData({ source: input });
        // Rastrear etapa completada no GTM
        gtmService.trackStepCompleted(
          6,
          'source',
          input,
          7, // total de etapas
          'floating_chat'
        );
        setTimeout(() => {
          addBotMessage(BOT_MESSAGES.customer_type_selection, CUSTOMER_TYPE_OPTIONS);
          nextStep('customer_type_selection');
        }, 1000);
        break;

      case 'customer_type_selection':
        const customerType = input.toLowerCase().includes('revendedor') ? 'revendedor' : 'consumidor_final';
        addUserMessage(input);
        updateUserData({ customerType });
        // Rastrear etapa completada no GTM
        gtmService.trackStepCompleted(
          7,
          'customerType',
          customerType,
          7, // total de etapas
          'floating_chat'
        );
        // Rastrear lead gerado no GTM
        const userData = chatState.userData;
        gtmService.trackLeadGenerated({
          name: userData.name || '',
          email: userData.email || '',
          phone: userData.phone || '',
          company: userData.document || '',
          message: userData.products?.join(', ') || '',
          product: userData.products?.join(', ') || 'Não especificado',
          source: 'floating_chat'
        });
        setTimeout(() => {
          addBotMessage(BOT_MESSAGES.completion);
          setTimeout(() => {
            addBotMessage(BOT_MESSAGES.whatsapp_offer, [
              { id: 'whatsapp', label: 'Falar por WhatsApp', value: 'whatsapp' }
            ]);
            nextStep('completion');
            setChatState(prev => ({ ...prev, isCompleted: true }));
          }, 2000);
        }, 1000);
        break;

      case 'completion':
        if (input.toLowerCase().includes('whatsapp') || input.toLowerCase().includes('sim')) {
          addUserMessage('WhatsApp');
          setTimeout(() => {
            addBotMessage(BOT_MESSAGES.whatsapp_redirect);
            nextStep('whatsapp_redirect');
            // Redirecionar para WhatsApp após 3 segundos
            setTimeout(() => {
              redirectToWhatsApp();
            }, 3000);
          }, 1000);
        }
        break;
    }
  }, [chatState.currentStep, addUserMessage, addBotMessage, updateUserData, nextStep, validateInput, formatPhone, formatDocument, setChatState]);

  const redirectToWhatsApp = useCallback(() => {
    const { name, email, document, products, source } = chatState.userData;
    const productsText = products?.join(', ') || 'Não especificado';
    
    const message = `Olá, meu nome é ${name}, meu e-mail é ${email}, sou da empresa: ${document} e minha principal necessidade é ${productsText}, conheci pelo ${source}.`;
    
    const whatsappNumber = '553534737551'; // Número da Sanders Brasil
    const encodedMessage = encodeURIComponent(message);
    
    // Detectar se é mobile ou desktop
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      // No mobile, tentar abrir o app primeiro, com fallback para web
      const whatsappAppUrl = `whatsapp://send?phone=${whatsappNumber}&text=${encodedMessage}`;
      const whatsappWebUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
      
      // Criar um link temporário para tentar abrir o app
      const tempLink = document.createElement('a');
      tempLink.href = whatsappAppUrl;
      tempLink.style.display = 'none';
      document.body.appendChild(tempLink);
      
      // Tentar abrir o app
      tempLink.click();
      document.body.removeChild(tempLink);
      
      // Se o app não abrir em 1.5 segundos, abrir WhatsApp Web
      const startTime = Date.now();
      const checkAppOpened = () => {
        if (Date.now() - startTime > 1500) {
          if (!document.hidden) {
            // Se ainda estamos na página, o app não abriu
            window.open(whatsappWebUrl, '_blank');
          }
        }
      };
      
      setTimeout(checkAppOpened, 1500);
    } else {
      // No desktop, abrir WhatsApp Web diretamente
      const whatsappWebUrl = `https://web.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;
      window.open(whatsappWebUrl, '_blank');
    }
  }, [chatState.userData]);

  const startChat = useCallback(() => {
    if (chatState.messages.length === 0 && chatState.currentStep === 'welcome') {
      // Rastrear abertura do chat no GTM
      gtmService.trackChatOpened('floating_chat');
      
      setTimeout(() => {
        addBotMessage(BOT_MESSAGES.welcome, [
          { id: 'yes', label: 'Sim, quero saber mais...', value: 'Sim, quero saber mais...' }
        ]);
      }, 500);
    }
  }, [chatState.messages.length, chatState.currentStep, addBotMessage]);

  return {
    processUserInput,
    startChat,
    redirectToWhatsApp,
    isTyping: chatState.isTyping,
    currentStep: chatState.currentStep,
    messages: chatState.messages,
    userData: chatState.userData,
    isCompleted: chatState.isCompleted
  };
};