export const analyzeIngredient = async (imageData: string) => {
    try {
      // Remover o prefixo da string de dados da imagem
      const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '');
      
      const response = await fetch('https://seu-dominio.com/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: base64Data }),
      });
      
      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erro ao analisar o ingrediente:', error);
      throw error;
    }
  };