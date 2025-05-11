const apiKey = 'c2687375fb53d6c30f209031';

document.addEventListener('DOMContentLoaded', () => {
  const moedaDe = document.getElementById('moedaOri');
  const moedaPara = document.getElementById('moedaDest');
  const valorDe = document.getElementById('valorDe');
  const valorPara = document.getElementById('valorPara');

  let origem = null; // 'de' ou 'para'

  async function converter(de, para, valor, callback) {
    if (!valor || valor <= 0) {
      callback('');
      return;
    }
    
    try {
      const res = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${de}`);
      const data = await res.json();
      const taxa = data.conversion_rates[para];
      const resultado = (valor * taxa).toFixed(2);
      callback(resultado);
    } catch (error) {
      callback('Erro');
    }
  }

  valorDe.addEventListener('input', () => {
    if (origem === 'para') return;
    origem = 'de';
    converter(moedaDe.value, moedaPara.value, parseFloat(valorDe.value), resultado => {
      valorPara.value = resultado;
      origem = null;
    });
  });

  valorPara.addEventListener('input', () => {
    if (origem === 'de') return;
    origem = 'para';
    converter(moedaPara.value, moedaDe.value, parseFloat(valorPara.value), resultado => {
      valorDe.value = resultado;
      origem = null;
    });
  });

  moedaDe.addEventListener('change', () => valorDe.dispatchEvent(new Event('input')));
  moedaPara.addEventListener('change', () => valorDe.dispatchEvent(new Event('input')));
});
