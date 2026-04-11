const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

const campaigns = {
  landing: {
    note: 'Oferta ideal para captar mais clientes com uma pagina focada em anuncios e WhatsApp.',
    text: 'Ola, quero uma landing page da Koda por R$ 1.000,00. Podemos conversar?',
    cta: 'Quero minha Landing Page'
  },
  site: {
    note: 'Pacote recomendado para empresas que querem um site completo ou ecommerce com mais autoridade digital.',
    text: 'Ola, quero um site completo da Koda por R$ 2.000,00. Podemos alinhar os detalhes?',
    cta: 'Quero meu Site Completo'
  },
  menu: {
    note: 'Melhor opcao para restaurantes e lanchonetes venderem mais com cardapio digital no celular.',
    text: 'Ola, quero um cardapio digital da Koda por R$ 1.000,00. Podemos iniciar?',
    cta: 'Quero meu Cardapio Digital'
  }
};

const campaignButtons = document.querySelectorAll('.campaign-option');
const campaignNote = document.getElementById('campaign-note');
const heroCta = document.getElementById('hero-cta');

function setCampaign(key) {
  const selected = campaigns[key];
  if (!selected || !campaignNote || !heroCta) {
    return;
  }

  campaignNote.textContent = selected.note;
  heroCta.textContent = selected.cta;
  heroCta.href = `https://wa.me/5561999493148?text=${encodeURIComponent(selected.text)}`;
}

campaignButtons.forEach((button) => {
  button.addEventListener('click', () => {
    campaignButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    setCampaign(button.dataset.campaign);
  });
});

const leadForm = document.getElementById('lead-form');

if (leadForm) {
  leadForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const nome = document.getElementById('nome')?.value.trim() || '';
    const telefone = document.getElementById('telefone')?.value.trim() || '';
    const servico = document.getElementById('servico')?.value.trim() || '';
    const mensagem = document.getElementById('mensagem')?.value.trim() || '';

    const texto = [
      'Ola, vim pela landing page da Koda e quero uma proposta.',
      `Nome: ${nome}`,
      `WhatsApp: ${telefone}`,
      `Servico: ${servico || 'Nao informado'}`,
      `Mensagem: ${mensagem || 'Nao informada'}`
    ].join('\n');

    const whatsappUrl = `https://wa.me/5561999493148?text=${encodeURIComponent(texto)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    leadForm.reset();
  });
}
