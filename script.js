document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('products.json');
        const data = await response.json();
        window.products = data.Plan1; // Acessa a lista de produtos dentro de "Plan1"
    } catch (error) {
        console.error('Erro ao carregar o JSON:', error);
    }
});

async function searchProduct() {
    const searchValue = document.getElementById('search').value;
    const productInfoDiv = document.getElementById('product-info');
    productInfoDiv.innerHTML = '';

    if (!searchValue) {
        const result = await Swal.fire({
            title: 'Você deseja realmente pesquisar toda a listagem?',
            text: 'Isso pode causar lentidão.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não'
        });

        if (!result.isConfirmed) {
            return;
        }
    }

    if (window.products) {
        const filteredProducts = searchValue ? window.products.filter(p => p['Produto-Derivação'] === searchValue) : window.products;
        if (filteredProducts.length > 0) {
            productInfoDiv.innerHTML = '<h2 class="text-2xl font-semibold mb-4">Detalhes do Produto</h2>';
            filteredProducts.forEach(product => {
                productInfoDiv.innerHTML += `
                    <div class="product-details mb-4 p-4 border border-altenburg rounded">
                        <p><strong>Número do Pedido:</strong> ${product['Pedido']}</p>
                        <p><strong>Produto:</strong> ${product['Produto-Derivação']}</p>
                        <p><strong>Complemento:</strong> ${product['Complemento']}</p>
                        <p><strong>Quantidade Pedida:</strong> ${product['Qtde.Pedida']}</p>
                        <p><strong>Estoque:</strong> ${product['Estoque']}</p>
                        <p><strong>Situação:</strong> ${product['Desc.Situação']}</p>
                        <hr class="my-2">
                        <Br>
                        <p><strong>Depósito de Saída:</Strong> ${product['Depósito']}</p>
                        <p><strong>Depósito de Destino:</Strong> F01.09E (E-Commerce)</p>
                    </div>
                `;
            });
        } else {
            productInfoDiv.innerHTML = '<p class="has-text-danger">Produto não encontrado.</p>';
        }
    } else {
        productInfoDiv.innerHTML = '<p class="has-text-danger">Erro ao carregar os produtos. Tente novamente mais tarde.</p>';
    }
}
